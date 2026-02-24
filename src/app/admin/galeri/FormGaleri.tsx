"use client";

import { useState } from "react";
import { createGaleri } from "@/src/actions/galeri";
import { createClient } from "@supabase/supabase-js";
import {
  FaCloudUploadAlt,
  FaSpinner,
  FaImage,
  FaCheckCircle,
  FaTimesCircle,
  FaTimes,
} from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Init Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default function FormGaleri() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // STATE UNTUK NOTIFIKASI (TOAST)
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    message: "",
    type: "success",
  });

  // Helper untuk menampilkan notifikasi
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ show: true, message, type });
    // Hilang otomatis setelah 3 detik
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  // Handle Preview Gambar
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validasi Ukuran (Max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        showToast("Ukuran file terlalu besar (Max 2MB)", "error");
        return;
      }

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      let finalThumbnailUrl = "";

      // 1. Upload Gambar ke Supabase
      if (selectedFile) {
        // GANTI NAMA BUCKET SESUAI SUPABASE ANDA
        const BUCKET_NAME = "public_sukajadi";

        const fileName = `galeri/${Date.now()}-${selectedFile.name.replace(/\s/g, "-")}`;

        const { error: uploadError } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(fileName, selectedFile);

        if (uploadError) throw new Error(uploadError.message);

        const { data: urlData } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(fileName);

        finalThumbnailUrl = urlData.publicUrl;
      }

      // 2. Simpan Data ke Database
      const res = await createGaleri(formData, finalThumbnailUrl);

      if (res?.success) {
        showToast("Galeri berhasil ditambahkan!", "success");

        // Tunggu sebentar sebelum redirect agar notifikasi terbaca
        setTimeout(() => {
          router.push("/admin/galeri");
          router.refresh();
        }, 1500);
      }
    } catch (error: any) {
      console.error("Error:", error);
      showToast(error.message || "Gagal menyimpan galeri", "error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* --- NOTIFIKASI TOAST --- */}
      {toast.show && (
        <div
          className={`fixed top-5 right-5 z-[100] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl animate-in slide-in-from-top-5 duration-300 ${
            toast.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          <div
            className={`p-2 rounded-full shrink-0 ${toast.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
          >
            {toast.type === "success" ? (
              <FaCheckCircle size={16} />
            ) : (
              <FaTimesCircle size={16} />
            )}
          </div>
          <div>
            <h4 className="font-bold text-sm">
              {toast.type === "success" ? "Berhasil" : "Gagal"}
            </h4>
            <p className="text-sm opacity-90">{toast.message}</p>
          </div>
          <button
            onClick={() => setToast((prev) => ({ ...prev, show: false }))}
            className="ml-4 opacity-50 hover:opacity-100 transition"
          >
            <FaTimes />
          </button>
        </div>
      )}

      {/* --- FORM UTAMA --- */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-sm border space-y-6 relative"
      >
        {/* Loading Overlay pada Form */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center rounded-xl backdrop-blur-[1px]">
            <div className="flex flex-col items-center gap-2">
              <FaSpinner className="animate-spin text-blue-600 text-3xl" />
              <span className="text-sm font-semibold text-blue-600">
                Menyimpan data...
              </span>
            </div>
          </div>
        )}

        {/* Upload Thumbnail */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Thumbnail Kegiatan
          </label>
          <div className="flex items-center gap-6">
            <div
              className={`relative w-40 h-28 border-2 border-dashed rounded-lg overflow-hidden flex items-center justify-center group transition-colors ${previewUrl ? "border-blue-500" : "border-gray-300 hover:border-blue-400 bg-gray-50"}`}
            >
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <FaImage className="text-gray-300 text-3xl group-hover:text-blue-400 transition" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                required={!previewUrl} // Wajib jika belum ada preview
              />
            </div>
            <div className="text-sm text-gray-500">
              <p className="font-medium text-gray-700">Upload Foto Utama</p>
              <p className="text-xs mt-1">Format: JPG, PNG (Max 2MB)</p>
              <p className="text-xs text-blue-600 mt-2 cursor-pointer hover:underline">
                Pilih foto dari perangkat
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Judul Kegiatan
            </label>
            <input
              type="text"
              name="judul"
              required
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Contoh: Rapat Koordinasi Mingguan"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tanggal Pelaksanaan
            </label>
            <input
              type="date"
              name="tanggal"
              required
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Lokasi (Opsional)
          </label>
          <input
            type="text"
            name="lokasi"
            className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="Contoh: Aula Kantor Lurah"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Deskripsi Singkat
          </label>
          <textarea
            name="deskripsi"
            rows={3}
            className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="Deskripsi kegiatan..."
          ></textarea>
        </div>

        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
          <input
            type="checkbox"
            name="isPublished"
            id="publish"
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            defaultChecked
          />
          <label
            htmlFor="publish"
            className="text-sm font-medium text-gray-700 cursor-pointer"
          >
            Terbitkan langsung ke publik
          </label>
        </div>

        <div className="pt-4 border-t flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-200 transition-all transform active:scale-95"
          >
            {isLoading ? "Menyimpan..." : "Simpan Galeri"}
          </button>
        </div>
      </form>
    </>
  );
}
