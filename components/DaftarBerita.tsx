import Link from "next/link";
import { FaArrowRight, FaNewspaper } from "react-icons/fa";
import { prisma } from "@/lib/prisma";
import BeritaCard from "./BeritaCard";

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
          slug: true,
        },
      },
    },
    where: {
      isPublished: true,
    },
  });

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-2 md:px-8 mb-26">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
              <FaNewspaper className="inline mr-2" />
              Berita Terkini
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Kabar <span className="text-gray-800">Sukajadi</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Ikuti perkembangan terbaru dan kegiatan di wilayah kami
          </p>
          {limit && (
            <Link
              href="/berita"
              className="inline-flex items-center gap-2 mt-6 text-blue-600 hover:text-blue-700 font-semibold group"
            >
              Lihat Semua Berita
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {/* Grid Berita */}
        {beritaData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beritaData.map((item) => (
              <BeritaCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <FaNewspaper className="text-gray-300 text-6xl mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              Belum ada berita yang dipublikasikan.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}