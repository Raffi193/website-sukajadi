"use client";

import { useState } from "react";
import Image from "next/image";
import { FaImage, FaFilter } from "react-icons/fa";
import TopBar from "@/components/layout/TopBar";
import NavBar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Data Dummy Foto Kegiatan
const galleryItems = [
  {
    id: 1,
    category: "Pemerintahan",
    title: "Rapat Koordinasi Mingguan",
    date: "24 Jan 2026",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    category: "Pembangunan",
    title: "Perbaikan Jalan Poros Desa",
    date: "20 Jan 2026",
    image:
      "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "Sosial",
    title: "Posyandu Balita & Lansia",
    date: "15 Jan 2026",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    category: "Pemerintahan",
    title: "Pelayanan Administrasi Terpadu",
    date: "12 Jan 2026",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    category: "Sosial",
    title: "Gotong Royong Jumat Bersih",
    date: "10 Jan 2026",
    image:
      "https://images.unsplash.com/photo-1558522192-964566258349?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    category: "Pembangunan",
    title: "Renovasi Balai Warga",
    date: "05 Jan 2026",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
  },
];

const categories = ["Semua", "Foto", "Video", "Pembangunan", "Pemerintahan"];

export default function GaleriSection() {
  const [activeFilter, setActiveFilter] = useState("Semua");

  // Logic Filter
  const filteredItems =
    activeFilter === "Semua"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <>
      <TopBar />
      <NavBar />

      

      {/* Galeri Section */}
      <section className="py-14 mb-30 bg-white">
        <div className="container mx-auto px-4 md:px-16">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeFilter === cat
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white text-gray-500 border-gray-200 hover:border-blue-400 hover:text-blue-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] shadow-sm mb-4 bg-gray-100 border border-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay Badge Kategori */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-blue-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Caption Text */}
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <FaImage /> {item.date}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 font-poppins group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State jika foto tidak ada */}
          {filteredItems.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
              <p className="text-gray-400">
                Belum ada dokumentasi untuk kategori ini.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
