import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import TopBar from "@/src/components/layout/TopBar";
import NavBar from "@/src/components/layout/Navbar";
import Hero from "@/src/components/home/Hero";
import Footer from "@/src/components/layout/Footer";
import { FaSearch, FaHome, FaChevronRight } from "react-icons/fa";
import DaftarBerita from "@/src/components/DaftarBerita";

export default function Berita() {
  return (
    <>
      <TopBar />
      <NavBar />
      <main className="text-gray-800 bg-gray-50 min-h-screen">
        <section className="container relative min-h-[400px] md:h-[470px] w-full flex items-center overflow-hidden">
          {/* 1. Background Image */}
          <Image
            src="images/berita.png"
            alt="Arsip Berita Kelurahan"
            fill
            className="object-cover"
            priority
          />

          {/* 2. Gradient Overlay - Lebih gelap di mobile agar teks terbaca */}
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-blue-950/95 via-blue-900/80 to-transparent" />

          {/* 3. Konten Hero */}
          <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8 py-12 md:py-0">
            <div className="max-w-3xl">
              {/* Breadcrumb - Sembunyi di HP sangat kecil, muncul di SM ke atas */}
              <nav className="hidden sm:flex items-center gap-2 text-blue-200 text-sm mb-2 font-sans">
                <Link
                  href="/"
                  className="hover:text-white transition flex items-center gap-1"
                >
                  <FaHome size={14} /> Beranda
                </Link>
                <FaChevronRight size={10} className="text-blue-400" />
                <span className="text-white font-medium">Berita</span>
              </nav>

              {/* Judul & Deskripsi */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-poppins leading-tight">
                Kabar & Informasi <br className="hidden sm:block" />
                <span className="text-yellow-400 underline decoration-yellow-400/30">
                  Terkini
                </span>
              </h1>

              <p className="text-blue-100 text-base md:text-lg mb-8 font-sans leading-relaxed max-w-2xl">
                Dapatkan informasi terbaru seputar kegiatan pemerintahan,
                layanan masyarakat, dan agenda kelurahan secara transparan.
              </p>

              {/* Search Bar Modern - Responsive Layout */}
              {/* Search Bar Profesional & Formal */}
              <div className="w-full md:w-140 max-w-2xl">
                <div className="relative flex items-center w-full border border-gray-300 rounded-4xl bg-white shadow-sm hover:shadow focus-within:ring-1 focus-within:ring-gray-200 transition-all duration-200 overflow-hidden">
                  {/* Ikon Pencarian */}
                  <div className="flex items-center justify-center pl-4 pr-3 text-gray-400">
                    <FaSearch className="w-4 h-4" />
                  </div>

                  {/* Area Input */}
                  <input
                    type="text"
                    placeholder="Cari berita atau pengumuman..."
                    className="w-full py-4 pl-1 pr-4 text-sm text-gray-800 bg-transparent focus:outline-none placeholder-gray-400 font-sans"
                  />

                  {/* Tombol Aksi */}
                  <button className="flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors border-l border-blue-600 active:bg-blue-800">
                    Cari
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <DaftarBerita />

        <Footer />
      </main>
    </>
  );
}
