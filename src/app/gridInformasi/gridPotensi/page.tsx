"use client";

import TopBar from "@/src/components/layout/TopBar";
import NavBar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  FaStore,
  FaLeaf,
  FaHandsHelping,
  FaChartLine,
  FaArrowRight,
  FaBriefcase,
} from "react-icons/fa";

export default function PotensiSection() {
  // Data Sektor Berdasarkan Dokumen Profil Kelurahan Sukajadi
  const sectors = [
    {
      icon: <FaStore />,
      title: "Perdagangan & Wirausaha",
      desc: "Sektor ekonomi yang digerakkan oleh warga yang berprofesi sebagai pedagang dan wirausaha mandiri di berbagai bidang.",
      color: "bg-orange-100 text-orange-600 border-orange-200",
    },
    {
      icon: <FaLeaf />,
      title: "Pertanian & Peternakan",
      desc: "Pemanfaatan lahan seluas ± 517,2 Ha yang sebagian digunakan untuk kegiatan perkebunan, pertanian, dan peternakan warga.",
      color: "bg-green-100 text-green-600 border-green-200",
    },
    {
      icon: <FaBriefcase />, // Mengganti ikon agar sesuai dengan Jasa
      title: "Jasa & Profesional",
      desc: "Didukung oleh SDM yang bekerja sebagai PNS, TNI/Polri, Karyawan Swasta, hingga jasa pertukangan/buruh bangunan.",
      color: "bg-blue-100 text-blue-600 border-blue-200",
    },
  ];

  // Data Fokus Pengembangan (Diambil dari peran Lembaga di Dokumen)
  const highlights = [
    {
      name: "Pengembangan UMKM Pemuda",
      category: "Karang Taruna",
      // Menggunakan gambar ilustrasi kegiatan pemuda/UMKM
      image:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop",
      desc: "Dikelola oleh Bidang UMKM Karang Taruna",
    },
    {
      name: "Pembangunan Swadaya",
      category: "Infrastruktur",
      // Menggunakan gambar gotong royong/pembangunan
      image:
        "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop",
      desc: "Partisipasi aktif warga dalam pembangunan fisik",
    },
    {
      name: "Pemberdayaan Kesejahteraan",
      category: "PKK & LPM",
      // Menggunakan gambar kegiatan ibu-ibu/keterampilan
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
      desc: "Program Pokja Keterampilan & Seksi Perekonomian",
    },
  ];

  return (
    <>
      <TopBar />
      <NavBar />
      <section className="pb-20 py-6 mb-29 bg-white">
        <div className="container mx-auto px-4 md:px-16">
          {/* BAGIAN 1: STATISTIK & INTRO */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                <FaChartLine /> Ekonomi & Demografi
              </div>
              <h2 className="text-3xl font-semibold text-gray-800 font-poppins mb-4">
                Menggali Potensi, <br />
                <span className="text-gray-800">Membangun Sukajadi</span>
              </h2>
              <p className="text-gray-600 leading-relaxed text-justify font-sans">
                Kelurahan Sukajadi memiliki luas wilayah ± 517,2 Ha dengan
                potensi ekonomi yang beragam. Mulai dari sektor pertanian,
                perdagangan, hingga jasa yang didukung oleh ribuan penduduk usia
                produktif. Sinergi antara Pemerintah, LPM, PKK, dan Karang
                Taruna menjadi kunci penggerak kemandirian warga.
              </p>
            </div>

            {/* Box Statistik Berdasarkan Data Dokumen */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center">
                {/* Data Mata Pencaharian: Petani, PNS, Swasta, Pedagang, Wirausaha, Pensiunan, Buruh, Peternak  */}
                <h3 className="text-3xl font-bold text-blue-600 mb-1">8+</h3>
                <p className="text-sm text-gray-500 font-medium">
                  Sektor Profesi Utama
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center">
                {/* Data Kelembagaan: LPM, PKK, Karang Taruna, Lembaga Adat, Linmas [cite: 84] */}
                <h3 className="text-3xl font-bold text-green-600 mb-1">5</h3>
                <p className="text-sm text-gray-500 font-medium">
                  Lembaga Penggerak
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center col-span-2">
                {/* Data Luas Wilayah  */}
                <h3 className="text-3xl font-bold text-orange-600 mb-1">
                  517,2 Ha
                </h3>
                <p className="text-sm text-gray-500 font-medium">
                  Luas Wilayah Potensial
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

          {/* BAGIAN 3: FOKUS PENGEMBANGAN (Mini Gallery) */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900 font-poppins">
                Fokus Pengembangan Daerah
              </h3>
              {/* Button dinonaktifkan sementara atau diarahkan ke galeri */}
              {/* <button className="text-blue-600 text-sm font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Lihat Kegiatan <FaArrowRight />
              </button> */}
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {highlights.map((item, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="relative h-64 w-full rounded-xl overflow-hidden mb-4">
                    {/* <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />  */}
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {item.category}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 font-poppins group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
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
                Bersama Membangun Kelurahan Sukajadi!
              </h3>
              <p className="text-blue-100 mb-8 font-sans">
                Pemerintah Kelurahan terbuka untuk sinergi dan kolaborasi dalam
                mengembangkan potensi daerah demi kesejahteraan masyarakat.
              </p>
              <Link href="/kontak">
                <button className="bg-yellow-400 text-blue-900 font-bold py-3 px-8 rounded-full hover:bg-yellow-300 transition shadow-lg">
                  Hubungi Kami
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
