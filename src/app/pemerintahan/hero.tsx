"use client";

import React from "react";
import { FaLandmark, FaChevronDown } from "react-icons/fa";
import Image from "next/image";

export default function Hero() {
  return (
    <>
      {/* Hapus 'container' dari sini agar background & gambar bisa full width ke tepi layar */}
      <section data-aos="fade-up" className="relative w-full bg-blue-950 overflow-hidden md:h-[600px] flex items-center px-8">
        
        {/* --- LAYER 1: BACKGROUND PATTERN (HALUS) --- */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none z-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        ></div>

        {/* --- LAYER 2: GAMBAR HERO (KANAN) --- */}
        {/* Diletakkan absolute agar menempel ke sisi kanan layar tanpa terpotong container */}
        <div className="hidden md:block absolute top-0 right-0 w-[50%] h-full z-0 pointer-events-none">
           {/* WRAPPER MIRING (SKEW):
              - origin-bottom-left: Titik putar di bawah kiri
              - -skew-x-12: Memiringkan container ke kiri
              - -mr-32: Menarik container ke kanan MELEWATI batas layar untuk menutup celah kosong
              - border-l-4: Garis kuning pemanis
           */}
           <div className="relative h-full w-full transform -skew-x-9 origin-bottom-left border-l-4 border-yellow-400 overflow-hidden -mr-32">
              
              {/* GAMBAR ASLI:
                  - scale-125: Diperbesar agar sudut-sudut tidak kosong saat dimiringkan
                  - skew-x-12: Membalas kemiringan agar gedung tetap tegak
              */}
              <Image
                src="/images/pemerintahan.png" 
                alt="Kantor Pemerintahan Sukajadi"
                fill
                className="w-full h-full object-cover transform skew-x-12 scale-125 origin-bottom-left"
              />
              
              {/* GRADIENT OVERLAY: Agar teks tetap terbaca jika gambar terlalu terang & estetik */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/20 to-transparent transform skew-x-12 scale-125 origin-bottom-left"></div>
           </div>
        </div>

        {/* --- LAYER 3: KONTEN TEKS (TENGAH/KIRI) --- */}
        {/* Class 'container' diletakkan di sini agar teks rapi rata tengah */}
        <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
          <div className="grid md:grid-cols-12 w-full gap-8">
            
            {/* KOLOM TEKS (Span 7 agar tidak menabrak gambar) */}
            <div className="md:col-span-7 py-10 md:py-0 text-white">
              
              {/* Badge Stempel */}
              <div className="inline-flex items-center gap-2 bg-blue-800/50 border border-blue-700 px-4 py-2 rounded-full text-blue-200 text-sm font-medium mb-6 backdrop-blur-sm animate-fade-in-up">
                <FaLandmark />
                <span>Tata Kelola Pemerintahan</span>
              </div>

              {/* Judul Utama */}
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold font-poppins leading-tight mb-6 drop-shadow-lg">
                Melayani dengan <br />
                <span className="text-yellow-400">Integritas</span> & Transparansi
              </h1>

              {/* Deskripsi */}
              <p className="text-blue-100 text-medium font-sans leading-relaxed max-w-xl mb-8 border-l-4 border-yellow-400 pl-6">
                Mewujudkan tata kelola pemerintahan Kelurahan Sukajadi yang
                akuntabel, profesional, dan berorientasi pada pelayanan publik
                yang prima.
              </p>

              {/* Indikator Scroll */}
              <div className="hidden md:flex items-center gap-3 text-blue-300 text-sm animate-bounce mt-12 cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
                <div className="p-2 rounded-full border border-blue-400/30">
                  <FaChevronDown />
                </div>
                <span>Gulir untuk melihat struktur & visi kami</span>
              </div>

            </div>
            
            {/* Kolom Kanan Kosong (Space untuk gambar background) */}
            <div className="md:col-span-5"></div>
          </div>
        </div>
      </section>
    </>
  );
}   