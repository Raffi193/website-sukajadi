// app/layanan/bansos/page.tsx
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import BansosSection from "./konten";
import Link from "next/link";
import { FaChevronRight, FaHome } from "react-icons/fa";
import TopBar from "@/src/components/layout/TopBar";

export default function HalamanBansos() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto px-4 md:px-16">
          {/* --- HEADER SIMPLE --- */}
          <div className="mb-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
              <Link
                href="/"
                className="hover:text-blue-600 flex items-center gap-1"
              >
                <FaHome /> Beranda
              </Link>
              <FaChevronRight size={10} />
              <span className="text-blue-600 font-medium">Bantuan Sosial</span>
            </div>

            {/* Judul & Intro */}
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-3xl font-semibold text-gray-800 font-poppins mb-3">
                Informasi Bantuan Sosial
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed">
                Pusat informasi transparansi penyaluran bantuan sosial. Cek
                jenis bantuan, persyaratan, dan status kepesertaan Anda.
              </p>
            </div>
          </div>
        </div>

        {/* Konten Utama */}
        <BansosSection />
      </main>

      <Footer />
    </>
  );
}
