"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaChevronRight,
  FaHome,
  FaArrowRight,
} from "react-icons/fa";
import { Agenda } from "@prisma/client"; // Import tipe data dari Prisma

// Format Kategori agar rapi (kapital awal)
const formatKategori = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Kategori Filter (Sesuaikan dengan ENUM di database Anda)
const categories = [
  "Semua",
  "KEGIATAN",
  "RAPAT",
  "SOSIALISASI",
  "PELAYANAN",
  "LAINNYA",
];

interface AgendaClientProps {
  agendas: Agenda[]; // Menerima data agenda dari database
}

export default function AgendaClient({ agendas }: AgendaClientProps) {
  const [activeCategory, setActiveCategory] = useState("Semua");

  // Helper: Cek Status Waktu (Hari ini, Akan Datang, Selesai)
  const getStatus = (date: Date) => {
    const today = new Date();
    const eventDate = new Date(date);

    // Set jam ke 00:00:00 untuk perbandingan tanggal murni
    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);

    if (eventDate.getTime() === today.getTime()) return "Hari Ini";
    if (eventDate > today) return "Akan Datang";
    return "Selesai";
  };

  // Filter Logic
  const filteredData = agendas.filter((item) => {
    return activeCategory === "Semua" || item.jenis === activeCategory;
  });

  // Logika Featured: Agenda paling baru yang statusnya belum selesai
  const featuredEvent =
    agendas.find((item) => {
      const status = getStatus(new Date(item.tanggalMulai));
      return status === "Akan Datang" || status === "Hari Ini";
    }) || agendas[0]; // Fallback ke agenda pertama jika tidak ada yang upcoming

  // Exclude featured event dari list bawah jika sedang mode "Semua"
  const otherEvents = filteredData.filter(
    (item) => activeCategory !== "Semua" || item.id !== featuredEvent?.id,
  );

  return (
    <div className="bg-gray-50 min-h-screen w-full max-w-[100vw] overflow-x-hidden flex flex-col pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative h-[250px] md:h-[300px] w-full flex items-center container mx-auto ">
        <div className="absolute inset-0 bg-blue-950/80 rounded-b-3xl md:rounded-none" />
        <div className="container mx-auto px-4 relative z-10">
          <nav className="flex items-center gap-2 text-blue-200 text-xs sm:text-sm mb-3 font-sans">
            <a href="/" className="hover:text-white flex items-center gap-1">
              <FaHome /> Beranda
            </a>
            <FaChevronRight size={10} />
            <span className="text-white">Agenda</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 font-poppins">
            Kalender <span className="text-yellow-400">Kegiatan</span>
          </h1>
          <p className="text-blue-100 max-w-xl text-sm md:text-lg font-sans">
            Jadwal resmi kegiatan pemerintahan dan kemasyarakatan di lingkungan
            Kelurahan Sukajadi.
          </p>
        </div>
      </section>

      <div className="mx-auto container px-2 md:px-12 -mt-10 relative z-20 mb-30">
        {/* 2. FEATURED EVENT CARD (Agenda Utama - Compact Version) */}
        {featuredEvent && (
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden mb-8 border border-gray-100 flex flex-col md:flex-row group relative transition-all duration-300">
            {/* Image Side - Ukuran disesuaikan (w-1/3 di desktop) */}
            <div className="relative h-52 md:h-auto md:w-1/3 overflow-hidden bg-gray-200">
              {featuredEvent.thumbnail ? (
                <Image
                  src={featuredEvent.thumbnail}
                  alt={featuredEvent.judul}
                  fill
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-blue-50 text-blue-200">
                  <FaCalendarAlt size={48} />
                </div>
              )}

              {/* Badge Sorotan - Posisi lebih rapat */}
              <div className="absolute top-3 left-3 bg-yellow-400 text-blue-900 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md tracking-wider flex items-center gap-1 z-10">
                ⭐ SOROTAN
              </div>
            </div>

            {/* Content Side - Padding diperkecil (p-6) */}
            <div className="p-5 md:p-6 md:w-2/3 flex flex-col justify-center relative">
              {/* Kategori & Tanggal */}
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wide">
                  {formatKategori(featuredEvent.jenis)}
                </span>
                <span className="text-gray-400 text-[11px] flex items-center gap-1 font-medium">
                  <FaCalendarAlt className="text-blue-400" size={10} />
                  {new Date(featuredEvent.tanggalMulai).toLocaleDateString(
                    "id-ID",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )}
                </span>
              </div>

              {/* Judul - Ukuran font disesuaikan */}
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2.5 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                {featuredEvent.judul}
              </h2>

              {/* Deskripsi */}
              <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
                {featuredEvent.deskripsi}
              </p>

              {/* Detail Waktu & Lokasi - Lebih compact */}
              <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-5">
                <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-2.5 py-1.5 rounded-lg">
                  <FaClock className="text-blue-500" />
                  <span className="font-medium">
                    {featuredEvent.waktuMulai}{" "}
                    {featuredEvent.waktuSelesai
                      ? `- ${featuredEvent.waktuSelesai}`
                      : ""}{" "}
                    WIB
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-2.5 py-1.5 rounded-lg">
                  <FaMapMarkerAlt className="text-red-500" />
                  <span className="font-medium truncate max-w-[150px]">
                    {featuredEvent.lokasi}
                  </span>
                </div>
              </div>

              {/* Tombol Aksi - Lebih ramping */}
              <Link
                href={`/agenda/${featuredEvent.slug}`}
                className="w-full md:w-fit bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-600/10 active:scale-95"
              >
                Lihat Detail <FaArrowRight size={12} />
              </Link>
            </div>
          </div>
        )}

        {/* 3. FILTER & HEADER LIST */}
        <div className="flex flex-col gap-6 mb-8 border-b border-gray-200 pb-6">
          {/* Bagian Judul: Dibuat Center di Mobile, Left di Desktop */}
          <div className="flex flex-col gap-1 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center justify-center md:justify-start gap-2">
              <FaCalendarAlt className="text-blue-600" /> Daftar Agenda
            </h3>
            <p className="text-sm text-gray-500">
              Filter kegiatan berdasarkan kategori
            </p>
          </div>

          {/* Bagian Filter: Scrollable secara horizontal di Mobile dengan indikator yang lebih rapi */}
          <div className="relative group">
            <div className="flex gap-2 overflow-x-auto w-full pb-3 px-1 no-scrollbar scroll-smooth">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all border duration-200 ${
                    activeCategory === cat
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200 scale-100"
                      : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 active:scale-95"
                  }`}
                >
                  {formatKategori(cat)}
                </button>
              ))}
            </div>

            {/* Indikator visual bahwa area ini bisa di-scroll (hanya muncul di mobile jika dibutuhkan) */}
            <div className="absolute right-0 top-0 bottom-3 w-12 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none md:hidden" />
          </div>
        </div>

        {/* 4. LIST OF EVENTS */}
        <div className="space-y-4">
          {otherEvents.length > 0 ? (
            otherEvents.map((item) => {
              const dateObj = new Date(item.tanggalMulai);
              const day = dateObj.toLocaleDateString("id-ID", {
                day: "numeric",
              });
              const month = dateObj.toLocaleDateString("id-ID", {
                month: "short",
              });
              const year = dateObj.getFullYear();
              const status = getStatus(dateObj);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all flex flex-col md:flex-row gap-4 md:items-center group"
                >
                  {/* Date Box */}
                  <div className="flex-shrink-0 flex md:flex-col items-center justify-center bg-blue-50 text-blue-700 rounded-lg p-3 md:p-4 md:w-24 border border-blue-100 gap-2 md:gap-0">
                    <span className="text-2xl md:text-3xl font-bold block leading-none">
                      {day}
                    </span>
                    <span className="text-xs md:text-sm font-medium uppercase">
                      {month}
                    </span>
                    <span className="md:hidden text-xs font-medium ml-1">
                      {year}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded text-white ${
                          status === "Hari Ini"
                            ? "bg-green-500"
                            : status === "Akan Datang"
                              ? "bg-blue-400"
                              : "bg-gray-400"
                        }`}
                      >
                        {status}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">
                        {formatKategori(item.jenis)}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {item.judul}
                    </h4>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <FaClock size={14} className="text-blue-400" />
                        {item.waktuMulai} WIB
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FaMapMarkerAlt size={14} className="text-red-400" />
                        {item.lokasi}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-2 md:mt-0 md:ml-4 flex-shrink-0">
                    <Link
                      href={`/agenda/${item.slug}`}
                      className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all active:scale-95"
                    >
                      Lihat Detail <FaArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              );
            })
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
  );
}
