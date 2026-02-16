"use client";

import { useState, useTransition } from "react";
import { deleteDokumen } from "@/src/app/actions/dokumen";
import { FaTrash, FaExclamationTriangle, FaSpinner } from "react-icons/fa";

export default function TombolHapusDokumen({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteDokumen(id);
      if (res?.error) {
        alert(res.error);
      } else {
        setIsOpen(false);
      }
    });
  };

  return (
    <>
      {/* 1. Tombol Trigger (Tong Sampah) */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all duration-200"
        title="Hapus Dokumen"
      >
        <FaTrash size={16} />
      </button>

      {/* 2. Modal Konfirmasi Kustom */}
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          
          {/* Backdrop (Layar Hitam Transparan) */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in"
            onClick={() => !isPending && setIsOpen(false)} // Klik luar untuk tutup (jika tidak sedang loading)
          />

          {/* Kartu Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 scale-100 animate-in zoom-in-95 duration-200">
            
            <div className="flex flex-col items-center text-center">
              {/* Ikon Peringatan Besar */}
              <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4 shadow-inner">
                <FaExclamationTriangle size={30} />
              </div>

              {/* Judul & Pesan */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Hapus Dokumen?
              </h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Tindakan ini tidak dapat dibatalkan. Dokumen ini akan hilang permanen dari database dan penyimpanan.
              </p>

              {/* Tombol Aksi */}
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setIsOpen(false)}
                  disabled={isPending}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition disabled:opacity-50"
                >
                  Batal
                </button>
                
                <button
                  onClick={handleDelete}
                  disabled={isPending}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 transition disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <>
                      <FaSpinner className="animate-spin" /> Menghapus...
                    </>
                  ) : (
                    "Ya, Hapus"
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}