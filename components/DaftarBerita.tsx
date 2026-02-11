// src/components/DaftarBerita.tsx

import Link from "next/link";
import { FaCalendar, FaArrowRight, FaNewspaper } from "react-icons/fa";
import { prisma } from "@/lib/prisma"; // Pastikan path import benar
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface DaftarBeritaProps {
  limit?: number;
}

export default async function DaftarBerita({ limit }: DaftarBeritaProps) {
  const beritaData = await prisma.berita.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      id: true,
      judul: true,
      slug: true,
      thumbnail: true,
      createdAt: true,
      excerpt: true,
      konten: true,
      kategori: {
        select: {
          nama: true,
          slug: true
        },
      },
    },
    where: {
      isPublished: true 
    }
  });

  const getSummary = (text: string | null, htmlContent: string) => {
    if (text) return text;
    const cleanText = htmlContent.replace(/<[^>]+>/g, "");
    return cleanText.length > 100 ? cleanText.substring(0, 100) + "..." : cleanText;
  };

  return (
    // UBAHAN 1: Hapus 'container' dari section agar background full width
    <section className="py-12 md:py-20 bg-gray-50">
      
      {/* UBAHAN 2: Logika Container Responsif 
         - w-full: Lebar penuh di HP
         - px-0: Tidak ada jarak kiri-kanan di HP (nempel layar)
         - md:container: Jadi container HANYA di desktop
         - md:mx-auto: Tengah di desktop
         - md:px-4: Ada padding sedikit di desktop agar manis
      */}
      <div className="w-full px-5 md:container md:mx-auto md:px-16">
        
        {/* Header Section */}
        {/* Kita beri px-4 di sini agar TEXT judul tidak menempel ke pinggir layar HP, meskipun gambarnya nanti full width */}
        <div className="px-4 md:px-0 flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-800">Kabar Sukajadi</h2>
            <p className="text-gray-600">
              Ikuti perkembangan terbaru dan kegiatan di wilayah kami.
            </p>
            <div className="h-1 w-20 bg-blue-600 rounded-full mt-2"></div>
          </div>
          
          {limit && (
            <Link
              href="/berita"
              className="group flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition"
            >
              Lihat Semua Berita
              <FaArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {/* Grid Berita */}
        {beritaData.length > 0 ? (
          // UBAHAN 3: gap-y-1 (jarak tipis vertikal di HP) vs gap-8 (jarak renggang di Desktop)
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-8 mb-20">
            {beritaData.map((item) => (
              <div
                key={item.id}
                // UBAHAN 4:
                // Di Mobile: rounded-none (kotak sempurna) & shadow-none (biar menyatu)
                // Di Desktop: rounded-xl (sudut tumpul) & shadow (efek timbul)
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col h-full"
              >
                {/* Gambar */}
                <div className="relative h-64 md:h-52 w-full overflow-hidden bg-gray-200">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.judul}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <FaNewspaper size={40} />
                    </div>
                  )}
                  
                  {/* Badge Kategori */}
                  {item.kategori && (
                    <div className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                      {item.kategori.nama}
                    </div>
                  )}
                </div>

                {/* Konten */}
                <div className="p-4 md:p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-3 font-medium">
                    <FaCalendar size={12} className="text-blue-500" />
                    <span>
                      {format(new Date(item.createdAt), "dd MMMM yyyy", { locale: id })}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    <Link href={`/berita/${item.slug}`}>{item.judul}</Link>
                  </h3>

                  <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                    {getSummary(item.excerpt, item.konten)}
                  </p>

                  <Link
                    href={`/berita/${item.slug}`}
                    className="mt-auto text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                  >
                    Baca Selengkapnya <FaArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mx-4 md:mx-0 text-center py-12 bg-white rounded-xl border border-dashed border-gray-300 col-span-full">
            <p className="text-gray-500">Belum ada berita yang dipublikasikan.</p>
          </div>
        )}
      </div>
    </section>
  );
}