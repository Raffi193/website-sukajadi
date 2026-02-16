import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LayananPenduduk from "./LayananPenduduk";
import Link from "next/link";
import { FaChevronRight, FaHome } from "react-icons/fa";
import TopBar from "@/components/layout/TopBar";
import { prisma } from "@/lib/prisma"; // Import Prisma

// Tambahkan 'async' karena kita akan fetch data database
export default async function HalamanKependudukan() {
  
  // 1. Ambil data dokumen dari database (diurutkan terbaru)
  const dokumenList = await prisma.dokumenPublik.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <TopBar />
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-5">
        {/* Header Simple dengan Breadcrumb */}
        <div className="container mx-auto px-4 md:px-16">
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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-poppins mb-3">
                Layanan Administrasi
              </h1>
              <p className="text-gray-500 text-medium leading-relaxed">
                Informasi lengkap persyaratan dan prosedur pengurusan dokumen
                kependudukan di Kelurahan Sukajadi. Hemat waktu dengan
                mempersiapkan berkas dari rumah.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Kirim data dokumen ke Component Client 
          Pastikan component LayananPenduduk menerima props ini
        */}
        <LayananPenduduk dataDokumen={dokumenList} />
        
      </main>
      <Footer />
    </>
  );
}