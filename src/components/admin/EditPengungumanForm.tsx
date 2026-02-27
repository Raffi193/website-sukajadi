"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updatePengumuman } from "@/src/actions/pengumuman";
import { DocumentUpload } from "@/src/components/admin/dokumen/dokumenUpload";
import { FaSave, FaSpinner, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { Pengumuman } from "@prisma/client"; // Import tipe data Prisma

interface EditPengumumanFormProps {
  initialData: Pengumuman; // Data lama dari database
}

export default function EditPengumumanForm({
  initialData,
}: EditPengumumanFormProps) {
  const [dokumenUrl, setDokumenUrl] = useState(initialData.dokumenUrl || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      // Panggil server action update dengan ID
      await updatePengumuman(initialData.id, formData, dokumenUrl);

      toast.success("Pengumuman berhasil diperbarui!");
      router.push("/admin/pengumuman");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Gagal memperbarui pengumuman.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/pengumuman"
          className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
        >
          <FaArrowLeft />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Edit Pengumuman</h1>
          <p className="text-sm text-gray-500">
            Perbarui informasi pengumuman yang sudah ada.
          </p>
        </div>
      </div>

      <form
        action={handleSubmit}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-6"
      >
        {/* --- 1. INFORMASI UTAMA --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Judul Pengumuman
            </label>
            <input
              name="judul"
              required
              type="text"
              defaultValue={initialData.judul}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategori
            </label>
            <select
              name="kategori"
              defaultValue={initialData.kategori}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white outline-none"
            >
              <option value="PELAYANAN">Pelayanan Publik</option>
              <option value="HIMBAUAN">Himbauan / Penting</option>
              <option value="BERITA">Berita Warga</option>
              <option value="LALU_LINTAS">Info Lalu Lintas</option>
              <option value="LAINNYA">Lainnya</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Berlaku
            </label>
            <input
              name="tanggal"
              required
              type="date"
              // Format tanggal ke YYYY-MM-DD agar muncul di input date
              defaultValue={
                new Date(initialData.tanggal).toISOString().split("T")[0]
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none"
            />
          </div>
        </div>

        {/* --- 2. UPLOAD DOKUMEN --- */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Lampiran Dokumen
          </label>

          <DocumentUpload
            value={dokumenUrl}
            onChange={(url) => setDokumenUrl(url)}
            folder="pengumuman"
            disabled={isSubmitting}
          />
        </div>

        {/* --- 3. ISI PENGUMUMAN --- */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Isi Lengkap
          </label>
          <textarea
            name="isi"
            rows={6}
            required
            defaultValue={initialData.isi}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* --- SUBMIT BUTTON --- */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:bg-blue-300"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin" /> Menyimpan...
              </>
            ) : (
              <>
                <FaSave /> Simpan Perubahan
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
