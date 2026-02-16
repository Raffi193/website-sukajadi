import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import NavBar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Footer from "@/components/layout/Footer";
import { FaSearch, FaHome, FaChevronRight } from "react-icons/fa";
import DaftarBerita from "@/components/DaftarBerita";


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
            <Link href="/" className="hover:text-white transition flex items-center gap-1">
              <FaHome size={14} /> Beranda
            </Link>
            <FaChevronRight size={10} className="text-blue-400" />
            <span className="text-white font-medium">Berita</span>
          </nav>

          {/* Judul & Deskripsi */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 font-poppins leading-tight">
            Kabar & Informasi <br className="hidden sm:block" />
            <span className="text-yellow-400 underline decoration-yellow-400/30">Terkini</span>
          </h1>

          <p className="text-blue-100 text-base md:text-lg mb-8 font-sans leading-relaxed max-w-2xl">
            Dapatkan informasi terbaru seputar kegiatan pemerintahan,
            layanan masyarakat, dan agenda kelurahan secara transparan.
          </p>

          {/* Search Bar Modern - Responsive Layout */}
          <div className="bg-white p-1.5 md:p-2 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row gap-2 max-w-2xl">
            <div className="relative flex-grow">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <FaSearch />
              </div>
              <input
                type="text"
                placeholder="Cari berita atau pengumuman..."
                className="w-full pl-11 pr-4 py-3 md:py-3.5 rounded-xl md:rounded-full focus:outline-none text-gray-700 font-sans text-sm md:text-base"
              />
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 md:py-3.5 rounded-xl md:rounded-full font-bold hover:bg-blue-700 transition font-sans shadow-lg active:scale-95 text-sm md:text-base">
              Cari Berita
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
