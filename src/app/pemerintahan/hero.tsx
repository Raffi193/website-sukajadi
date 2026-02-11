"use client";

import React from "react";
import Image from "next/image";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LembagaMitra from "./lembagaKemasyarakatan";
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

export default function Hero() {
  return (
    <>
      <section className="container relative bg-blue-950 overflow-hidden md:h-[550px] flex items-center">
        {/* --- LAYER 1: BACKGROUND PATTERN (KIRI) --- */}
        {/* Ini memberikan tekstur halus di area biru agar tidak flat */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}            
        ></div>

        <div className="container   relative z-10 h-full">
          <div className="grid md:grid-cols-12 h-full items-center gap-8">
            {/* --- KOLOM KIRI: KONTEN TEKS (Span 7) --- */}
            <div className="md:col-span-7 py-16 md:py-0 text-white relative">
              {/* Ornamen "Stempel" Kecil */}
              <div className="inline-flex items-center gap-2 bg-blue-800/50 border border-blue-700 px-4 py-2 rounded-full text-blue-200 text-sm font-medium mb-6 backdrop-blur-sm">
                <FaLandmark />
                <span>Tata Kelola Pemerintahan</span>
              </div>

              {/* Judul Utama */}
              <h1 className="text-4xl md:text-5xl font-bold font-poppins leading-tight mb-6">
                Melayani dengan <br />
                <span className="text-yellow-400">Integritas</span> &
                Transparansi
              </h1>

              {/* Deskripsi */}
              <p className="text-blue-100 text-lg font-sans leading-relaxed max-w-xl mb-8 border-l-4 border-yellow-400 pl-6">
                Mewujudkan tata kelola pemerintahan Kelurahan Sukajadi yang
                akuntabel, profesional, dan berorientasi pada pelayanan publik
                yang prima.
              </p>

              {/* Indikator Scroll (Opsional, pemanis) */}
              <div className="hidden md:flex items-center gap-3 text-blue-300 text-sm animate-bounce mt-12">
                <FaChevronDown />
                <span>Gulir untuk melihat struktur & visi kami</span>
              </div>
            </div>

            {/* --- KOLOM KANAN: GAMBAR DINAMIS (Span 5) --- */}
            {/* Di Desktop: Gambar absolute di kanan, tinggi penuh, ada efek miring (skew).
             Di Mobile: Gambar relatif di bawah teks, tinggi terbatas.
          */}
            <div className="md:col-span-5 relative h-[300px] md:h-full w-full md:absolute md:right-0 md:top-0 md:w-[45%] overflow-hidden hidden md:block">
              {/* Wrapper untuk efek miring (skew) */}
              <div className="h-full w-full md:-skew-x-10 md:origin-bottom-left overflow-hidden relative md:-mr-20">
                {/* Gambar Asli (Harus di-unskew balik agar gambarnya tetap tegak) */}
                {/* <Image
                  // 
                  src="https://images.unsplash.com/photo-1768399808130-abac2a8442e0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Kantor Pemerintahan Sukajadi"
                  fill
                  className="object-cover md:skew-x-12 scale-100" // scale-110 untuk menghindari celah putih saat di-skew
                  priority
                /> */}
                {/* Overlay Gradient halus di atas gambar */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent md:skew-x-12"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
