"use client";

import { useState } from "react";
import Image from "next/image";
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaTimes, FaExpand } from "react-icons/fa";

// Tipe data sesuai Schema Prisma
type GaleriItem = {
  id: string;
  judul: string;
  slug: string;
  deskripsi: string | null;
  tanggal: Date;
  lokasi: string | null;
  thumbnail: string | null;
};

export default function GaleriClient({ data }: { data: GaleriItem[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState<GaleriItem | null>(null);

  // Logic Search
  const filteredItems = data.filter((item) =>
    item.judul.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-16">
        
        {/* --- 1. HEADER & SEARCH --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 font-poppins mb-2">
              Galeri Kegiatan
            </h2>
            <p className="text-gray-500">
              Dokumentasi aktivitas dan kegiatan di Kelurahan Sukajadi
            </p>
            <div className="h-1.5 w-24 bg-blue-600 mt-4 rounded-full"></div>
          </div>

          {/* Search Bar Modern */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Cari kegiatan..."
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition shadow-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* --- 2. GRID GALLERY --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-2 mb-30 gap-8">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                {item.thumbnail ? (
                  <Image
                    src={item.thumbnail}
                    alt={item.judul}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <FaExpand size={24} />
                  </div>
                )}
                
                {/* Overlay Hover Effect */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white border border-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                        Lihat Foto
                    </span>
                </div>
              </div>

              {/* Content Card */}
              <div className="p-5">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 border-b border-gray-50 pb-3">
                  <span className="flex items-center gap-1 text-blue-600 font-medium">
                    <FaCalendarAlt /> 
                    {new Date(item.tanggal).toLocaleDateString("id-ID", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </span>
                  {item.lokasi && (
                    <span className="flex items-center gap-1 truncate max-w-[150px]">
                      <FaMapMarkerAlt /> {item.lokasi}
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 font-poppins mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {item.judul}
                </h3>
                {item.deskripsi && (
                    <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                        {item.deskripsi}
                    </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* --- 3. EMPTY STATE --- */}
        {filteredItems.length === 0 && (
          <div className="text-center py-24 bg-white rounded-2xl border-dashed border-2 border-gray-200 shadow-sm">
            <div className="inline-block p-4 rounded-full bg-gray-50 mb-4 text-gray-400">
                <FaSearch size={24} />
            </div>
            <h3 className="text-gray-800 font-bold text-lg">Tidak ditemukan</h3>
            <p className="text-gray-500">
              Coba kata kunci lain atau belum ada dokumentasi yang diunggah.
            </p>
          </div>
        )}
      </div>

      {/* --- 4. LIGHTBOX MODAL (Popup Gambar) --- */}
      {selectedImage && (
        <div 
            className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-5xl max-h-[90vh] flex flex-col items-center">
            
            {/* Tombol Close */}
            <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition p-2"
            >
                <FaTimes size={30} />
            </button>

            {/* Gambar Full */}
            <div className="relative w-full h-[60vh] md:h-[80vh] rounded-lg overflow-hidden shadow-2xl bg-black">
                {selectedImage.thumbnail && (
                    <Image 
                        src={selectedImage.thumbnail} 
                        alt={selectedImage.judul}
                        fill
                        className="object-contain"
                    />
                )}
            </div>

            {/* Caption Modal */}
            <div className="mt-4 text-center text-white max-w-2xl">
                <h3 className="text-xl font-bold mb-1">{selectedImage.judul}</h3>
                <p className="text-white/80 text-sm">
                    {new Date(selectedImage.tanggal).toLocaleDateString("id-ID", {
                      day: "numeric", month: "long", year: "numeric"
                    })} 
                    {selectedImage.lokasi && ` • ${selectedImage.lokasi}`}
                </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}