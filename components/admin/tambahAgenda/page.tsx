"use client";

import { useState } from "react";
import Link from "next/link";
import { createAgenda } from "@/src/actions/agenda";
import { FaSave, FaArrowLeft, FaSpinner } from "react-icons/fa";
import { useAuth } from "@clerk/nextjs";
import { ImageUpload } from "@/components/admin/berita/ImageUpload"; // <-- Import komponen Supabase Upload Anda
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function TambahAgendaPage() {
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    if (!userId) {
      alert("Silakan login terlebih dahulu!");
      return;
    }

    setIsSubmitting(true);
    try {
      // Panggil Server Action
      await createAgenda(formData, thumbnailUrl);

      // 3. Jika berhasil sampai sini (tidak error), lakukan redirect manual
      toast.success("Agenda berhasil disimpan!");
      router.push("/admin/agenda"); // Pindah halaman
      router.refresh(); // Refresh data terbaru
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan agenda. Cek koneksi internet Anda.");
      setIsSubmitting(false); // Matikan loading agar user bisa coba lagi
    }
  };

  if (!isLoaded)
    return (
      <div className="p-10 text-center text-gray-500">
        Memuat data pengguna...
      </div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header & Tombol Kembali */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/agenda"
          className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
        >
          <FaArrowLeft />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Buat Agenda Baru</h1>
          <p className="text-sm text-gray-500">
            Isi formulir di bawah untuk mempublikasikan kegiatan.
          </p>
        </div>
      </div>

      <form
        action={handleSubmit}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-6"
      >
        {/* --- 1. UPLOAD THUMBNAIL (SUPABASE) --- */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Poster / Thumbnail Kegiatan
          </label>

          {/* Menggunakan Komponen Upload Supabase Anda */}
          <ImageUpload
            value={thumbnailUrl}
            onChange={(url) => setThumbnailUrl(url)}
            disabled={isSubmitting}
          />

          {!thumbnailUrl && (
            <p className="text-xs text-amber-600 mt-2">
              * Gambar opsional, tapi disarankan agar tampilan menarik.
            </p>
          )}
        </div>

        {/* --- 2. INFORMASI UTAMA --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Judul Agenda <span className="text-red-500">*</span>
            </label>
            <input
              name="judul"
              required
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Contoh: Rapat Koordinasi RT/RW se-Kelurahan"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Kegiatan
            </label>
            <div className="relative">
              <select
                name="jenis"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white outline-none"
              >
                <option value="KEGIATAN">Kegiatan Umum</option>
                <option value="RAPAT">Rapat Internal/Eksternal</option>
                <option value="SOSIALISASI">Sosialisasi / Penyuluhan</option>
                <option value="PELAYANAN">Pelayanan Warga</option>
                <option value="LAINNYA">Lainnya</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Penyelenggara
            </label>
            <input
              name="penyelenggara"
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none"
              placeholder="Misal: Karang Taruna, PKK, atau Kelurahan"
            />
          </div>
        </div>

        {/* --- 3. WAKTU & LOKASI --- */}
        <div className="border-t border-gray-100 pt-4">
          <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">
            Waktu & Tempat
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Mulai <span className="text-red-500">*</span>
              </label>
              <input
                name="tanggalMulai"
                required
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Selesai{" "}
                <span className="text-xs text-gray-400">(Opsional)</span>
              </label>
              <input
                name="tanggalSelesai"
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jam Mulai
                </label>
                <input
                  name="waktuMulai"
                  type="time"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jam Selesai
                </label>
                <input
                  name="waktuSelesai"
                  type="time"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lokasi Kegiatan <span className="text-red-500">*</span>
              </label>
              <input
                name="lokasi"
                required
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none"
                placeholder="Misal: Aula Kantor Kelurahan Sukajadi"
              />
            </div>
          </div>
        </div>

        {/* --- 4. DESKRIPSI --- */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deskripsi Lengkap
          </label>
          <textarea
            name="deskripsi"
            rows={5}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none"
            placeholder="Jelaskan detail kegiatan..."
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
                <FaSave /> Simpan Agenda
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
