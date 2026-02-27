import { prisma } from "@/lib/prisma";
import Navbar from "@/src/components/layout/Navbar"; // Pastikan path benar
import Footer from "@/src/components/layout/Footer"; // Pastikan path benar
import TopBar from "@/src/components/layout/TopBar"; // Pastikan path benar
import GaleriClient from "./GaleriClient";
import Link from "next/link";
import { FaChevronRight, FaHome } from "react-icons/fa";

// Agar data selalu fresh saat ada upload baru
export const dynamic = "force-dynamic";

export default async function HalamanGaleri() {
  // Ambil Data dari Database
  const galeriData = await prisma.galeri.findMany({
    where: { isPublished: true },
    orderBy: { tanggal: "desc" },
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <TopBar />
      <Navbar />

      {/* --- HEADER BARU (Ganti HeroPages) --- */}
      <section className="bg-[#1e293b] pt-20 pb-20 px-4 md:px-8 text-white relative overflow-hidden">
        {/* Dekorasi Background (Opsional) */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

        <div className="container mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <Link
              href="/"
              className="hover:text-white flex items-center gap-1 transition"
            >
              <FaHome /> Beranda
            </Link>
            <FaChevronRight size={10} />
            <span className="text-white font-medium">Galeri</span>
          </div>

          {/* Judul Besar */}
          <h1 className="text-3xl md:text-5xl lg:text-4xl font-bold font-poppins mb-3">
            Galeri <span className="text-yellow-400">Kegiatan</span>
          </h1>

          {/* Subjudul */}
          <p className="text-gray-300 text-medium md:text-medium max-w-2xl leading-relaxed">
            Arsip dokumentasi visual kegiatan pemerintahan, pembangunan, dan
            kemasyarakatan di lingkungan Kelurahan Sukajadi.
          </p>
        </div>
      </section>

      {/* --- KONTEN CLIENT (Grid Foto) --- */}
      {/* Kita kirim data ke Client Component */}
      <GaleriClient data={galeriData} />

      <Footer />
    </main>
  );
}
