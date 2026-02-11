"use client"

import Footer from "@/components/layout/Footer";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaFilter,
  FaChevronRight,
  FaHome,
  FaArrowRight,
} from "react-icons/fa";

// --- MOCK DATA ---
const categories = [
  "Semua",
  "Pemerintahan",
  "Posyandu",
  "Gotong Royong",
  "Keagamaan",
];

const mockAgenda = [
  {
    id: 1,
    judul: "Musyawarah Perencanaan Pembangunan (Musrenbang) Desa",
    kategori: "Pemerintahan",
    tanggal: "2023-11-15",
    waktu: "09:00 - 12:00 WIB",
    lokasi: "Aula Kantor Kelurahan",
    deskripsi:
      "Pembahasan prioritas pembangunan desa untuk anggaran tahun depan. Diharapkan kehadiran seluruh Ketua RW/RT.",
    banner:
      "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=1000&auto=format&fit=crop",
    status: "Akan Datang",
    isFeatured: true, // Agenda Utama
  },
  {
    id: 2,
    judul: "Posyandu Balita & Lansia Mawar 03",
    kategori: "Posyandu",
    tanggal: "2023-11-10",
    waktu: "08:00 - 11:00 WIB",
    lokasi: "Posyandu RW 03",
    deskripsi:
      "Pemeriksaan kesehatan rutin, penimbangan berat badan, dan pemberian vitamin.",
    status: "Hari Ini",
    isFeatured: false,
  },
  {
    id: 3,
    judul: "Kerja Bakti Bersih Lingkungan (Jumat Bersih)",
    kategori: "Gotong Royong",
    tanggal: "2023-11-12",
    waktu: "07:00 - Selesai",
    lokasi: "Lingkungan RW 01 & RW 02",
    deskripsi:
      "Membersihkan saluran air antisipasi banjir dan pemangkasan dahan pohon.",
    status: "Akan Datang",
    isFeatured: false,
  },
  {
    id: 4,
    judul: "Penyuluhan Bahaya Narkoba bagi Remaja",
    kategori: "Sosialisasi",
    tanggal: "2023-11-20",
    waktu: "13:00 - 15:00 WIB",
    lokasi: "Balai Warga RW 05",
    deskripsi: "Kerjasama dengan BNN dan Polsek setempat.",
    status: "Akan Datang",
    isFeatured: false,
  },
];

export default function AgendaPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  // Filter Logic
  const filteredData = mockAgenda.filter((item) => {
    return activeCategory === "Semua" || item.kategori === activeCategory;
  });

  const featuredEvent = mockAgenda.find((item) => item.isFeatured);
  const otherEvents = filteredData.filter(
    (item) => !item.isFeatured || activeCategory !== "Semua",
  );

  return (
    <>
      <TopBar />
      <Navbar />
       {/* Wrapper utama dengan overflow-x-hidden untuk mencegah scroll samping */}
      <div className="bg-gray-50 min-h-screen w-full max-w-[100vw] overflow-x-hidden flex flex-col pb-20">
        {/* 1. HERO SECTION */}
        <section className="relative h-[250px] md:h-[300px] w-full flex items-center container">
          {/* <Image
            src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1000&auto=format&fit=crop"
            alt="Agenda Desa"
            fill
            className="object-cover"
          /> */}
          <div className="absolute inset-0 bg-blue-950/80" />
          <div className="container mx-auto px-4 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-blue-200 text-xs sm:text-sm mb-3 font-sans">
              <Link
                href="/"
                className="hover:text-white flex items-center gap-1"
              >
                <FaHome /> Beranda
              </Link>
              <FaChevronRight size={10} />
              <span className="text-white">Agenda</span>
            </nav>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 font-poppins">
              Kalender <span className="text-yellow-400">Kegiatan</span>
            </h1>
            <p className="text-blue-100 max-w-xl text-sm md:text-lg font-sans">
              Jadwal resmi kegiatan pemerintahan dan kemasyarakatan di
              lingkungan Kelurahan Sukajadi.
            </p>
          </div>
        </section>

        <div className=" mx-auto container -mt-10 relative z-20">
          {/* 2. FEATURED EVENT CARD (Agenda Utama) */}
          {featuredEvent && activeCategory === "Semua" && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-10 border border-gray-100 flex flex-col md:flex-row group">
              {/* Image Side */}
              <div className="relative h-48 md:h-auto md:w-2/5 overflow-hidden">
                {/* <Image
                  src={featuredEvent.banner || ""}
                  alt={featuredEvent.judul}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                /> */}
                <div className="absolute top-4 left-4 bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  SOROTAN UTAMA
                </div>
              </div>

              {/* Content Side */}
              <div className="p-6 md:p-8 md:w-3/5 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">
                    {featuredEvent.kategori}
                  </span>
                  <span className="text-gray-400 text-xs flex items-center gap-1">
                    <FaCalendarAlt /> {featuredEvent.tanggal}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {featuredEvent.judul}
                </h2>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed line-clamp-2">
                  {featuredEvent.deskripsi}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                    <FaClock className="text-blue-500" /> {featuredEvent.waktu}
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                    <FaMapMarkerAlt className="text-red-500" />{" "}
                    {featuredEvent.lokasi}
                  </div>
                </div>

                <button className="w-full md:w-fit bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20">
                  Lihat Detail Agenda <FaArrowRight size={12} />
                </button>
              </div>
            </div>
          )}

          {/* 3. FILTER & HEADER LIST */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 self-start md:self-auto">
              <FaCalendarAlt className="text-blue-600" /> Agenda Lainnya
            </h3>

            {/* Filter Pills */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar md:flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                    activeCategory === cat
                      ? "bg-blue-600 text-white border-blue-600 shadow-md"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 4. LIST OF EVENTS (Vertical Cards) */}
          <div className="space-y-4">
            {otherEvents.length > 0 ? (
              otherEvents.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all flex flex-col md:flex-row gap-4 md:items-center group"
                >
                  {/* Date Box */}
                  <div className="flex-shrink-0 flex md:flex-col items-center justify-center bg-blue-50 text-blue-700 rounded-lg p-3 md:p-4 md:w-24 border border-blue-100 gap-2 md:gap-0">
                    <span className="text-2xl md:text-3xl font-bold block leading-none">
                      {item.tanggal.split("-")[2]}
                    </span>
                    <span className="text-xs md:text-sm font-medium uppercase">
                      Nov
                    </span>
                    {/* Mobile only Year display */}
                    <span className="md:hidden text-xs font-medium ml-1">
                      2023
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded text-white ${
                          item.status === "Hari Ini"
                            ? "bg-green-500"
                            : "bg-blue-400"
                        }`}
                      >
                        {item.status}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">
                        {item.kategori}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {item.judul}
                    </h4>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <FaClock size={14} className="text-blue-400" />{" "}
                        {item.waktu}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FaMapMarkerAlt size={14} className="text-red-400" />{" "}
                        {item.lokasi}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-2 md:mt-0 md:ml-4 flex-shrink-0">
                    <button className="w-full md:w-auto px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition">
                      Detail
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500">
                  Tidak ada agenda ditemukan untuk kategori ini.
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
