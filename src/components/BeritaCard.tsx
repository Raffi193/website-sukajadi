"use client";

import Link from "next/link";
import { FaCalendar, FaArrowRight, FaNewspaper } from "react-icons/fa";
import Image from "next/image";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useState } from "react";

interface BeritaCardProps {
  item: {
    id: string;
    judul: string;
    slug: string;
    thumbnail: string | null;
    createdAt: Date;
    excerpt: string | null;
    konten: string;
    kategori: {
      nama: string;
      slug: string;
    } | null;
  };
}

export default function BeritaCard({ item }: BeritaCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Pindahkan getSummary ke sini (dalam client component)
  const getSummary = (text: string | null, htmlContent: string) => {
    if (text) return text;
    const cleanText = htmlContent.replace(/<[^>]+>/g, "");
    return cleanText.length > 100 ? cleanText.substring(0, 100) + "..." : cleanText;
  };

  return (
    <>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-700 font-medium">Memuat berita...</p>
            </div>
          </div>
        </div>
      )}

      <Link
        href={`/berita/${item.slug}`}
        onClick={() => setIsLoading(true)}
        className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
      >
        {/* Gambar */}
        <div className="relative h-48 w-full overflow-hidden">
          {item.thumbnail ? (
            <Image
              src={item.thumbnail}
              alt={item.judul}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <FaNewspaper className="text-blue-300 text-5xl" />
            </div>
          )}

          {/* Badge Kategori */}
          {item.kategori && (
            <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {item.kategori.nama}
            </div>
          )}
        </div>

        {/* Konten */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
            <FaCalendar />
            <span>
              {format(new Date(item.createdAt), "dd MMMM yyyy", {
                locale: id,
              })}
            </span>
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
            {item.judul}
          </h3>

          <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
            {getSummary(item.excerpt, item.konten)}
          </p>

          <div className="flex items-center text-blue-600 font-semibold group-hover:gap-3 transition-all">
            <span>Baca Selengkapnya</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </>
  );
}