import React from "react";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Footer from "@/components/layout/Footer";
import { FaSitemap, FaDownload, FaUserTie, FaIdBadge } from "react-icons/fa";
import PerangkatGrid from "./PerangkatDesa"

export default function page() {
  return (
    <>
      <TopBar />
      <Navbar />

      <section className="py-18 bg-gray-50">
        <div className="container">
          {/* Judul Section */}
          <div className=" mb-12 container">
            <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">
              Hierarki Organisasi
            </span>
            <h2 className="text-3xl font-bold text-gray-900 font-poppins mt-2">
              Bagan Struktur Pemerintahan
            </h2>
            <p className="text-gray-500 mt-4 font-sans">
              Gambaran alur koordinasi dan pertanggungjawaban tugas di
              lingkungan Pemerintah Kelurahan Sukajadi
            </p>
            <div className="h-1 w-20 bg-blue-600 rounded-full mt-4"></div>
          </div>

          {/* Container Gambar Bagan */}
          <div className="relative w-full max-w-4xl mx-auto bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
            {/* Ganti src ini dengan gambar bagan struktur asli Anda nanti */}
            <div className="relative aspect-[12/5] w-full overflow-hidden rounded-lg">
              {/* <Image
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop"
                  alt="Bagan Struktur Organisasi"
                  fill
                  className="object-contain" // Agar bagan tidak terpotong
                /> */}
            </div>

            {/* Tombol Download (Opsional) */}
            <div className="mt-6 flex justify-center">
              <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition font-sans text-sm font-medium shadow-md">
                <FaDownload /> Unduh Bagan Resolusi Tinggi
              </button>
            </div>
          </div>
        </div>
      </section>

      {/*  Komponen Grid Foto (Daftar Pegawai) */}
      <PerangkatGrid />

      <Footer />
    </>
  );
}
