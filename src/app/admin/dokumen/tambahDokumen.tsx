"use client";

import { useState } from "react";
import { createDokumen } from "@/src/app/actions/dokumen";
import { FaPlus, FaSpinner, FaCloudUploadAlt, FaCheckCircle, FaTimes } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function FormTambahDokumen() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // STATE BARU: Untuk mengontrol notifikasi sukses
  const [showToast, setShowToast] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 KB";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(0)) + " " + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (!selectedFile) {
      alert("Pilih file terlebih dahulu");
      setIsLoading(false);
      return;
    }

    try {
      // 1. Upload ke Supabase Storage (Pastikan bucket 'public' benar)
      const BUCKET_NAME = "public_sukajadi"; 
      const fileName = `${Date.now()}-${selectedFile.name.replace(/\s/g, '-')}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(BUCKET_NAME) 
        .upload(fileName, selectedFile);

      if (uploadError) throw new Error("Gagal upload: " + uploadError.message);

      // 2. Dapatkan URL Publik
      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(fileName);

      const dokumenUrl = urlData.publicUrl;
      const dokumenSize = formatFileSize(selectedFile.size);

      // 3. Panggil Server Action
      const res = await createDokumen(formData, dokumenUrl, dokumenSize);

      if (res?.error) {
        alert(res.error);
      } else {
        // SUKSES!
        setIsOpen(false); // Tutup Modal
        setSelectedFile(null); // Reset File
        form.reset(); // Reset Form

        // TAMPILKAN NOTIFIKASI
        setShowToast(true);
        // Sembunyikan notifikasi otomatis setelah 3 detik
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  }

  const handleClose = () => {
    setIsOpen(false);
    setSelectedFile(null);
  };

  return (
    <>
      {/* Tombol Trigger Modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition shadow-md"
      >
        <FaPlus size={14} /> Tambah Dokumen
      </button>

      {/* --- NOTIFIKASI SUKSES (TOAST) --- */}
      {showToast && (
        <div className="fixed top-5 right-5 z-[100] animate-in slide-in-from-top-5 fade-in duration-300">
          <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl shadow-lg flex items-center gap-4 min-w-[300px]">
            <div className="bg-green-500 rounded-full p-1 text-white shrink-0">
              <FaCheckCircle size={16} />
            </div>
            <div>
              <h4 className="font-bold text-sm">Berhasil!</h4>
              <p className="text-sm text-green-700">Dokumen berhasil ditambahkan.</p>
            </div>
            <button 
              onClick={() => setShowToast(false)} 
              className="ml-auto text-green-400 hover:text-green-600"
            >
              <FaTimes size={12} />
            </button>
          </div>
        </div>
      )}

      {/* --- MODAL FORM --- */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800">Upload Formulir Baru</h3>
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Dokumen</label>
                <input 
                  type="text" 
                  name="judul"
                  required
                  placeholder="Contoh: Formulir F-1.01 (Biodata)"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">File Dokumen</label>
                <div className={`relative border-2 border-dashed rounded-lg p-6 transition text-center cursor-pointer group ${selectedFile ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50 hover:border-blue-400'}`}>
                  <input 
                    type="file" 
                    name="file"
                    required
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  {selectedFile ? (
                    <div className="flex flex-col items-center justify-center text-blue-600">
                      <FaCheckCircle size={32} className="mb-2" />
                      <p className="font-semibold text-sm truncate max-w-[200px]">{selectedFile.name}</p>
                      <p className="text-xs text-blue-400 mt-1">{formatFileSize(selectedFile.size)}</p>
                      <p className="text-xs text-gray-400 mt-2">(Klik untuk ganti file)</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400 group-hover:text-blue-500">
                      <FaCloudUploadAlt size={32} className="mb-2 transition" />
                      <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600">Klik untuk pilih file</p>
                      <p className="text-xs text-gray-400 mt-1">PDF, Word, Excel (Max 5MB)</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium transition"
                  disabled={isLoading}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !selectedFile}
                  className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 transition shadow-sm"
                >
                  {isLoading ? <><FaSpinner className="animate-spin" /> Mengupload...</> : "Simpan Dokumen"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}