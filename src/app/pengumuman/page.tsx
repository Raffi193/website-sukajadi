"use client";

import Footer from "@/components/layout/Footer";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import { useState } from "react";
import Image from "next/image";
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
} from "react-icons/fa";

// --- MOCK DATA (Nanti diganti data dari Database) ---
const mockPengumuman = [
  {
    id: 1,
    judul: "Pemadaman Listrik Bergilir Wilayah RW 01 - RW 05",
    tanggal: "2023-10-25",
    kategori: "Darurat",
    deskripsi:
      "Sehubungan dengan perbaikan gardu induk, akan dilakukan pemadaman listrik sementara mulai pukul 09.00 - 15.00 WIB.",
    fileType: "pdf",
    isUrgent: true,
  },
  {
    id: 2,
    judul: "Jadwal Pelayanan E-KTP Keliling Bulan November",
    tanggal: "2023-10-24",
    kategori: "Pelayanan",
    deskripsi:
      "Jadwal dan lokasi mobil pelayanan keliling untuk perekaman E-KTP dan perbaikan Kartu Keluarga.",
    fileType: "image",
    isUrgent: false,
  },
  {
    id: 3,
    judul: "Undangan Rapat Musyawarah Desa (Musdes)",
    tanggal: "2023-10-20",
    kategori: "Pemerintahan",
    deskripsi:
      "Mengundang seluruh Ketua RW dan RT untuk menghadiri pembahasan RKPDes tahun anggaran 2024.",
    fileType: "pdf",
    isUrgent: false,
  },
  {
    id: 4,
    judul: "Penyaluran Bantuan Langsung Tunai (BLT) Tahap 3",
    tanggal: "2023-10-18",
    kategori: "Bantuan Sosial",
    deskripsi:
      "Daftar nama penerima dan jadwal pengambilan bantuan dapat dilihat pada lampiran berikut.",
    fileType: "pdf",
    isUrgent: false,
  },
];

const categories = [
  "Semua",
  "Darurat",
  "Pelayanan",
  "Pemerintahan",
  "Bantuan Sosial",
];

export default function PengumumanPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter Logic
  const filteredData = mockPengumuman.filter((item) => {
    const matchCategory =
      activeCategory === "Semua" || item.kategori === activeCategory;
    const matchSearch = item.judul
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <>
      <TopBar />
      <Navbar />

      <section className="relative h-[250px] md:h-[280px] flex items-center container">
          {/* <Image
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop"
            alt="Papan Pengumuman"
            fill
            className="object-cover"
          /> */}
          <div className="absolute inset-0 bg-blue-900/80" />
          <div className="container mx-auto relative z-10 px-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-blue-200 text-xs sm:text-sm mb-3">
              <Link
                href="/"
                className="hover:text-white flex items-center gap-1"
              >
                <FaHome /> Beranda
              </Link>
              <FaChevronRight size={10} />
              <span className="text-white">Pengumuman</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-poppins">
              Pengumuman <span className="text-yellow-400">Kelurahan</span>
            </h1>
            <p className="text-blue-100 max-w-xl text-sm md:text-base">
              Informasi resmi, himbauan, dan jadwal kegiatan terbaru dari
              pemerintah Kelurahan Sukajadi untuk seluruh warga.
            </p>
          </div>
        </section>
      
      <div className="bg-gray-50 min-h-screen pb-20 py-20 container">
        {/* 1. HERO SECTION (Compact Version) */}
        

        <div className="container mx-auto px-1 -mt-8 relative z-20">
          {/* 2. URGENT NOTICE (Hanya muncul jika ada isUrgent) */}
          {mockPengumuman.some((p) => p.isUrgent) && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 md:p-6 rounded-r-xl shadow-lg mb-8 flex flex-col md:flex-row items-start md:items-center gap-4 animate-fade-in-up">
              <div className="bg-red-100 p-3 rounded-full text-red-600 shrink-0">
                <FaExclamationTriangle size={24} />
              </div>
              <div className="flex-grow">
                <h3 className="text-red-700 font-bold text-lg mb-1">
                  PENGUMUMAN PENTING!
                </h3>
                <p className="text-red-600/80 text-sm md:text-base">
                  Terdapat informasi darurat yang memerlukan perhatian Anda
                  segera. Silakan cek detail di bawah.
                </p>
              </div>
            </div>
          )}

          {/* 3. SEARCH & FILTER BAR */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-8 top-20 z-30 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              {/* Category Pills (Horizontal Scroll di Mobile) */}
              <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      activeCategory === cat
                        ? "bg-blue-600 text-white shadow-md transform scale-105"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Input */}
              <div className="relative w-full md:w-72">
                <input
                  type="text"
                  placeholder="Cari pengumuman..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          {/* 4. LIST PENGUMUMAN (Grid Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div
                  key={item.id}
                  className={`group bg-white rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col h-full ${
                    item.isUrgent
                      ? "border-red-200 shadow-red-100 ring-1 ring-red-100"
                      : "border-gray-100 shadow-sm"
                  }`}
                >
                  {/* Header Card */}
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                        item.isUrgent
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {item.kategori}
                    </div>
                    <div className="flex items-center text-gray-400 text-xs">
                      <FaCalendarAlt className="mr-1" />
                      {item.tanggal}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-gray-800 mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                    {item.judul}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 flex-grow line-clamp-3">
                    {item.deskripsi}
                  </p>

                  {/* Footer / Action */}
                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                      {item.fileType === "pdf" ? (
                        <FaFilePdf className="text-red-500 text-lg" />
                      ) : (
                        <FaFileImage className="text-blue-500 text-lg" />
                      )}
                      <span>Dokumen Resmi</span>
                    </div>

                    <button className="flex items-center gap-2 bg-gray-50 hover:bg-blue-600 hover:text-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                      <span>Unduh</span>
                      <FaDownload size={12} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <FaBullhorn size={24} />
                </div>
                <h3 className="text-gray-900 font-medium">
                  Tidak ada pengumuman ditemukan
                </h3>
                <p className="text-gray-500 text-sm">
                  Coba ubah kata kunci atau kategori pencarian.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
