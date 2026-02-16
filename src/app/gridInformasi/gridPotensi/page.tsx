"use client";

import TopBar from "@/components/layout/TopBar";
import NavBar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Image from "next/image";
import {
  FaStore,
  FaLeaf,
  FaHandsHelping,
  FaChartLine,
  FaArrowRight,
} from "react-icons/fa";

export default function PotensiSection() {
  // Data Sektor Unggulan
  const sectors = [
    {
      icon: <FaStore />,
      title: "UMKM & Kuliner",
      desc: "Pusat jajanan lokal dan kerajinan tangan yang dikelola oleh warga, menjadi penggerak ekonomi mikro.",
      color: "bg-orange-100 text-orange-600 border-orange-200",
    },
    {
      icon: <FaLeaf />,
      title: "Pertanian Perkotaan",
      desc: "Pemanfaatan lahan pekarangan untuk budidaya hidroponik dan tanaman obat keluarga (TOGA).",
      color: "bg-green-100 text-green-600 border-green-200",
    },
    {
      icon: <FaHandsHelping />,
      title: "Jasa & Perdagangan",
      desc: "Berkembangnya ruko dan usaha jasa yang melayani kebutuhan warga sekitar dan wilayah tetangga.",
      color: "bg-blue-100 text-blue-600 border-blue-200",
    },
  ];

  // Data Produk Unggulan (Dummy)
  const products = [
    {
      name: "Keripik Singkong 'Suka Rasa'",
      category: "Olahan Pangan",
      image:
        "https://images.unsplash.com/photo-1566478919030-41562d39014b?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Batik Tulis Motif Karet",
      category: "Kerajinan",
      image:
        "https://images.unsplash.com/photo-1598555743477-9df7283296c6?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Sayur Organik Hidroponik",
      category: "Pertanian",
      image:
        "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <>
      <TopBar />
      <NavBar />
      <section className="pb-20 py-20 mb-29 bg-white">
        <div className="container mx-auto px-4 md:px-16">
          {/* BAGIAN 1: STATISTIK & INTRO */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                <FaChartLine /> Ekonomi Desa
              </div>
              <h2 className="text-3xl font-bold text-gray-900 font-poppins mb-4">
                Menggali Potensi, <br />
                <span className="text-blue-600">Membangun Kemandirian</span>
              </h2>
              <p className="text-gray-600 leading-relaxed text-justify font-sans">
                Kelurahan Sukajadi memiliki beragam potensi strategis yang terus
                dikembangkan. Dari sektor UMKM yang kreatif hingga inisiatif
                pertanian perkotaan, kami berkomitmen untuk menciptakan
                ekosistem ekonomi yang inklusif dan berkelanjutan bagi seluruh
                warga.
              </p>
            </div>

            {/* Box Statistik Sederhana */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center">
                <h3 className="text-3xl font-bold text-blue-600 mb-1">150+</h3>
                <p className="text-sm text-gray-500 font-medium">Pelaku UMKM</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center">
                <h3 className="text-3xl font-bold text-green-600 mb-1">5</h3>
                <p className="text-sm text-gray-500 font-medium">
                  Kelompok Tani
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center col-span-2">
                <h3 className="text-3xl font-bold text-orange-600 mb-1">3</h3>
                <p className="text-sm text-gray-500 font-medium">
                  Produk Unggulan Daerah
                </p>
              </div>
            </div>
          </div>

          {/* BAGIAN 2: KATEGORI SEKTOR */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {sectors.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border hover:shadow-lg transition-shadow duration-300 bg-white border-gray-100 group"
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 ${item.color}`}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 font-poppins mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* BAGIAN 3: PRODUK UNGGULAN (Mini Gallery) */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900 font-poppins">
                Produk Lokal Unggulan
              </h3>
              <button className="text-blue-600 text-sm font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Lihat Katalog <FaArrowRight />
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {products.map((product, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="relative h-64 w-full rounded-xl overflow-hidden mb-4">
                    {/* <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    /> */}
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {product.category}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 font-poppins group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Produksi: KWT / UMKM Sukajadi
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* BAGIAN 4: AJAKAN KEMITRAAN (CTA) */}
          <div className="mt-20 bg-blue-900 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            {/* Pattern Background Tipis */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            ></div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold font-poppins mb-4">
                Tertarik Mengembangkan Usaha di Sukajadi?
              </h3>
              <p className="text-blue-100 mb-8 font-sans">
                Kami membuka peluang kemitraan dan investasi bagi pihak swasta
                maupun pemerintah untuk memajukan potensi lokal.
              </p>
              <button className="bg-yellow-400 text-blue-900 font-bold py-3 px-8 rounded-full hover:bg-yellow-300 transition shadow-lg">
                Hubungi Bagian Ekonomi
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
