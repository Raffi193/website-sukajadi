import React from "react";
import Image from "next/image";
import TopBar from "@/src/components/layout/TopBar";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import LembagaMitra from "./lembagaKemasyarakatan";
import Hero from "./hero";
import TupoksiSection from "./TupoksiSection";
import VisiMisi from "./VisiMisi";
import KelembagaanSection from "@/src/components/views/KelembagaanSection";
import {
  FaSitemap,
  FaDownload,
  FaUserTie,
  FaIdBadge,
  FaLandmark,
  FaChevronDown,
} from "react-icons/fa";
import PerangkatGrid from "./PerangkatDesa";
import Link from "next/link";

export default function page() {
  return (
    <>
      <TopBar />
      <Navbar />
      <Hero />

      <VisiMisi />

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          {/* Header Section (Gaya Baru) */}
          <div className="mb-12">
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2 block">
              Hierarki organisasi
            </span>
            <h2 className="text-3xl md:text-3xl font-semibold text-gray-900 font-poppins mb-3">
              Bagan Struktur <span className="text-gray-800">Pemerintahan</span>
            </h2>
            <p className="text-gray-500 text-medium max-w-2xl leading-relaxed">
              Gambaran alur koordinasi dan pertanggungjawaban tugas di
              lingkungan Pemerintah Kelurahan Sukajadi
            </p>
            {/* Garis Aksen Biru */}
            <div className="w-24 h-1.5 bg-blue-600 mt-4 rounded-full"></div>
          </div>

          {/* 2. CONTAINER GAMBAR (Card Effect) */}
          <div className="relative w-full max-w-2xl mx-auto">
            {/* Efek Shadow & Background Putih */}
            <div className="bg-white p-3 md:p-6 rounded-2xl shadow-xl border border-gray-100">
              {/* Gambar Bagan Full Width & Auto Height */}
              <Image
                src="/images/bagan.png" // Pastikan path ini benar sesuai file Anda
                alt="Bagan Struktur Organisasi Kelurahan Sukajadi"
                className="w-full h-auto rounded-lg border border-gray-100"
                priority // Agar gambar dimuat lebih dulu
                width={0}
                height={0}
              />

              {/* 3. TOMBOL DOWNLOAD BERFUNGSI */}
              {/* Menggunakan tag <a> dengan atribut 'download' */}
              <div className="mt-8 flex justify-center pb-2">
                <a
                  href="/images/bagan.png" // Link ke file gambar
                  download="Struktur-Organisasi-Sukajadi.png" // Nama file saat didownload user
                  className="flex items-center gap-3 bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 hover:shadow-lg transition-all transform hover:-translate-y-1 font-sans text-sm font-bold tracking-wide"
                >
                  <FaDownload /> UNDUH BAGAN
                </a>
              </div>
            </div>

            {/* Dekorasi Background di belakang card (Opsional - Pemanis) */}
            <div className="absolute -top-4 -left-4 w-full h-full bg-blue-100 rounded-2xl -z-10 hidden md:block"></div>
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-yellow-100 rounded-2xl -z-10 hidden md:block"></div>
          </div>
        </div>
      </section>

      {/*  Komponen Grid Foto (Daftar Pegawai) */}
      <PerangkatGrid />

      <TupoksiSection />

      <KelembagaanSection />

      <Footer />
    </>
  );
}
