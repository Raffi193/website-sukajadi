import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import NavBar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Footer from "@/components/layout/Footer";
import { FaSearch, FaHome, FaChevronRight } from "react-icons/fa";
import DaftarBerita from "./DaftarBerita";


export default function Berita() {
  return (
    <>
      <main className="text-gray-800 bg-gray-50 min-h-screen">
        <TopBar />
        <NavBar />

        <section className="relative h-[400px] w-full flex items-center container">
          {/* 1. Background Image (Ganti dengan foto aktivitas warga/kantor) */}
          <Image
            src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000&auto=format&fit=crop"
            alt="Arsip Berita Kelurahan"
            fill
            className="object-cover"
            priority
          />

          {/* 2. Gradient Overlay (Supaya teks terbaca jelas) */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/80 to-blue-900/40" />

          {/* 3. Konten Hero */}
          <div className="relative z-10 px-4 md:px-3">
            <div className="max-w-3xl">
              {/* Breadcrumb (Navigasi Kecil) */}
              <div className="flex items-center gap-2 text-blue-200 text-sm mb-4 font-sans">
                <Link
                  href="/"
                  className="hover:text-white transition flex items-center gap-1"
                >
                  <FaHome /> Beranda
                </Link>
                <FaChevronRight size={10} />
                <span className="text-white font-medium">Berita</span>
              </div>

              {/* Judul & Deskripsi */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins leading-tight">
                Kabar & Informasi <br />
                <span className="text-yellow-400">Terkini</span>
              </h1>

              <p className="text-blue-100 text-lg mb-8 font-sans leading-relaxed max-w-2xl">
                Dapatkan informasi terbaru seputar kegiatan pemerintahan,
                layanan masyarakat, dan potensi desa secara transparan.
              </p>

              {/* Search Bar Modern */}
              <div className="bg-white p-2 rounded-lg shadow-lg flex flex-col md:flex-row gap-2 max-w-xl">
                <div className="relative flex-grow">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaSearch />
                  </div>
                  <input
                    type="text"
                    placeholder="Cari berita atau pengumuman..."
                    className="w-full pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 font-sans"
                  />
                </div>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-md font-bold hover:bg-blue-700 transition font-sans shadow-md">
                  Cari
                </button>
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
