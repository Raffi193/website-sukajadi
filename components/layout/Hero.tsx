'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaChevronRight, FaHome } from "react-icons/fa";

interface HeroPagesProps {
  title: string;
  subtitle?: string; // Opsional
  image?: string;    // Opsional, ada defaultnya nanti
}

export default function HeroPages({ 
  title, 
  subtitle, 
  image = "/images/kantor.jpeg" // Default Image
}: HeroPagesProps) {
  return (
    <section className="relative h-[340px] w-full flex items-center px-6">
      
      {/* 1. Background Image Full */}
      <Image 
        src={image}
        alt={title}
        fill
        className="object-cover"
        priority
      />

      {/* 2. Gradient Overlay (Sama seperti Hero Berita) */}
      {/* Gradasi Biru Gelap ke Transparan agar teks terbaca jelas */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/80 to-blue-900/30" />

      {/* 3. Konten Hero (Rata Kiri) */}
      <div className="relative z-10 container mx-auto px-4 md:px-16">
        <div className="max-w-3xl">
          
          {/* Breadcrumb Navigasi */}
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-4 font-sans">
            <Link href="/" className="hover:text-white transition flex items-center gap-1">
              <FaHome /> Beranda
            </Link>
            <FaChevronRight size={10} />
            <span className="text-white font-medium border-b border-yellow-400 pb-0.5">
              {title}
            </span>
          </div>

          {/* Judul Halaman */}
          <h1 className="text-3xl md:text-3xl font-bold text-white mb-4 font-poppins leading-tight">
            {title}
          </h1>
          
          {/* Deskripsi (Jika ada) */}
          {subtitle && (
            <p className="text-blue-100 text-medium font-sans leading-relaxed max-w-2xl border-l-4 border-yellow-400 pl-4">
              {subtitle}
            </p>
          )}

        </div>
      </div>
    </section>
  );
}