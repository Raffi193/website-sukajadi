// app/layanan/kependudukan/page.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LayananPenduduk from "./LayananPenduduk";
import Link from "next/link";
import { FaChevronRight, FaHome } from "react-icons/fa";
import TopBar from "@/components/layout/TopBar";

export default function HalamanKependudukan() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-4">
        {/* Header Simple dengan Breadcrumb */}
        <div className=" mx-auto px-4 md:px-16">
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
              <span className="text-blue-600 font-medium">
                Administrasi Kependudukan
              </span>
            </div>

            {/* Judul & Intro */}
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-poppins mb-3">
                Layanan Administrasi
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed">
                Informasi lengkap persyaratan dan prosedur pengurusan dokumen
                kependudukan di Kelurahan Sukajadi. Hemat waktu dengan
                mempersiapkan berkas dari rumah.
              </p>
            </div>
          </div>
        </div>

        {/* Konten Utama (Grid Kartu & Modal) */}
        <LayananPenduduk />
      </main>
      <Footer />
    </>
  );
}
