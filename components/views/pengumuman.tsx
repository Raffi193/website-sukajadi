"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaBullhorn,
  FaCalendarAlt,
  FaFilePdf,
  FaFileImage,
  FaDownload,
  FaExclamationTriangle,
  FaSearch,
  FaChevronRight,
  FaHome,
  FaFileAlt,
  FaFilter,
  FaTimes,
} from "react-icons/fa";
import { Pengumuman } from "@prisma/client"; // Import tipe data Prisma

// Helper untuk format kategori agar rapi (kapital awal)
const formatKategori = (cat: string) => {
  return cat
    .replace("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

const categories = [
  "Semua",
  "PELAYANAN",
  "HIMBAUAN",
  "BERITA",
  "LALU_LINTAS",
  "LAINNYA",
];

interface PengumumanClientProps {
  pengumumanList: Pengumuman[]; // Menerima data dari server
}

export default function PengumumanClient({
  pengumumanList,
}: PengumumanClientProps) {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter Logic
  const filteredData = pengumumanList.filter((item) => {
    const matchCategory =
      activeCategory === "Semua" || item.kategori === activeCategory;
    const matchSearch = item.judul
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Helper untuk menentukan icon file
  const getFileIcon = (url: string) => {
    if (url.endsWith(".pdf"))
      return <FaFilePdf className="text-red-500 text-lg" />;
    if (url.match(/\.(jpg|jpeg|png|webp)$/i))
      return <FaFileImage className="text-blue-500 text-lg" />;
    return <FaFileAlt className="text-gray-500 text-lg" />;
  };

  return (
    <>
      <section className="relative h-[250px] md:h-[280px] flex items-center container mx-auto">
        <div className="absolute inset-0 bg-blue-900/90 rounded-b-3xl md:rounded-none" />
        <div className="container mx-auto relative z-10 px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-blue-200 text-xs sm:text-sm mb-3 font-sans">
            <Link href="/" className="hover:text-white flex items-center gap-1">
              <FaHome /> Beranda
            </Link>
            <FaChevronRight size={10} />
            <span className="text-white">Pengumuman</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-poppins">
            Pengumuman <span className="text-yellow-400">Kelurahan</span>
          </h1>
          <p className="text-blue-100 max-w-xl text-sm md:text-base font-sans">
            Informasi resmi, himbauan, dan jadwal kegiatan terbaru dari
            pemerintah Kelurahan Sukajadi untuk seluruh warga.
          </p>
        </div>
      </section>

      <div className="bg-gray-50 min-h-screen pb-20 py-20 container mx-auto px-4">
        <div className="container mx-auto px-1 -mt-8 relative z-20 mb-30">
          {/* 2. URGENT NOTICE (Kategori HIMBAUAN dianggap Urgent) */}
          {pengumumanList.some((p) => p.kategori === "HIMBAUAN") && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 md:p-6 rounded-r-xl shadow-lg mb-8 flex flex-col md:flex-row items-start md:items-center gap-4 animate-fade-in-up">
              <div className="bg-red-100 p-3 rounded-full text-red-600 shrink-0">
                <FaExclamationTriangle size={24} />
              </div>
              <div className="flex-grow">
                <h3 className="text-red-700 font-bold text-lg mb-1">
                  PENGUMUMAN PENTING!
                </h3>
                <p className="text-red-600/80 text-sm md:text-base">
                  Terdapat informasi himbauan yang memerlukan perhatian Anda.
                  Silakan cek detail di bawah.
                </p>
              </div>
            </div>
          )}

          {/* --- BAGIAN YANG DIPERBAIKI: FILTER & SEARCH BAR --- */}
          {/* Menggunakan sticky top agar filter tetap terlihat saat scroll */}
          <div className="sticky top-14 z-30 mb-8">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/60 p-4 transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                {/* Bagian Kiri: Filter Kategori */}
                <div className="w-full md:w-auto flex flex-col gap-2">
                  {/* Label kecil untuk mobile agar user tahu ini bisa discroll */}
                  <span className="md:hidden text-[10px] text-gray-400 font-bold uppercase tracking-wider ml-1">
                    Geser untuk kategori
                  </span>

                  <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar scroll-smooth mask-linear-gradient">
                    {/* Ikon Filter Statis */}
                    <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-400 shrink-0">
                      <FaFilter size={12} />
                    </div>

                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        // Perbaikan style tombol agar lebih "tactile" (enak ditekan)
                        className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 border select-none ${
                          activeCategory === cat
                            ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200 ring-2 ring-blue-100"
                            : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-600"
                        }`}
                      >
                        {formatKategori(cat)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bagian Kanan: Search Bar */}
                <div className="relative w-full md:w-80 group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                  </div>
                  <input
                    type="text"
                    placeholder="Cari pengumuman..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-inner"
                  />
                  {/* Tombol Clear Search (Muncul jika ada ketikan) */}
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <FaTimes size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* --- AKHIR BAGIAN FILTER --- */}

          {/* 4. LIST PENGUMUMAN (Grid Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div
                  key={item.id}
                  className={`group bg-white rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col h-full ${
                    item.kategori === "HIMBAUAN"
                      ? "border-red-200 shadow-red-100 ring-1 ring-red-100"
                      : "border-gray-100 shadow-sm"
                  }`}
                >
                  {/* Header Card */}
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                        item.kategori === "HIMBAUAN"
                          ? "bg-red-50 text-red-600 border-red-100"
                          : item.kategori === "PELAYANAN"
                            ? "bg-blue-50 text-blue-600 border-blue-100"
                            : "bg-gray-50 text-gray-600 border-gray-100"
                      }`}
                    >
                      {formatKategori(item.kategori)}
                    </div>
                    <div className="flex items-center text-gray-400 text-xs font-medium">
                      <FaCalendarAlt className="mr-1.5" />
                      {new Date(item.tanggal).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-gray-800 mb-3 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.judul}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
                    {item.isi}
                  </p>

                  {/* Footer / Action */}
                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                    {item.dokumenUrl ? (
                      <>
                        <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                          {getFileIcon(item.dokumenUrl)}
                          <span>Dokumen Resmi</span>
                        </div>
                        <a
                          href={`${item.dokumenUrl}?download=`}
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 px-4 py-2 rounded-lg text-xs font-bold transition-all"
                        >
                          <span>Unduh</span>
                          <FaDownload size={10} />
                        </a>
                      </>
                    ) : (
                      <div className="text-xs text-gray-400 italic w-full text-center py-1">
                        Tidak ada lampiran file
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                  <FaBullhorn size={24} />
                </div>
                <h3 className="text-gray-900 font-medium">
                  Tidak ada pengumuman ditemukan
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Coba ubah kata kunci atau kategori pencarian.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
