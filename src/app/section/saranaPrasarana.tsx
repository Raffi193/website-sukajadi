"use client";

import {
  FaSchool,
  FaHeartbeat,
  FaRoad,
  FaBuilding,
  FaStore,
  FaMapMarkerAlt,
  FaArchway,
  FaBolt,
  FaWater,
  FaArrowRight,
} from "react-icons/fa";

// --- DATA STATISTIK REAL (Berdasarkan Profil Kelurahan) ---
const STATS = [
  {
    label: "Total Jalan",
    value: "14 KM",
    sub: "Aspal, Beton & Tanah",
    icon: <FaRoad size={24} />,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Fasilitas Kesehatan",
    value: "6 Unit",
    sub: "1 Puskesmas & 5 Posyandu",
    icon: <FaHeartbeat size={24} />,
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    label: "Sarana Pendidikan",
    value: "3 Unit",
    sub: "TK, SD & SMP",
    icon: <FaSchool size={24} />,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    label: "Jembatan",
    value: "3 Unit",
    sub: "Penghubung Antar RW",
    icon: <FaArchway size={24} />,
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
];

const INFRASTRUCTURE_DETAILS = [
  {
    category: "Pendidikan",
    title: "Sarana Sekolah & Belajar",
    desc: "Mendukung wajib belajar 9 tahun dengan fasilitas pendidikan yang memadai di lingkungan kelurahan.",
    items: [
      "1 Unit TK/PAUD (50 Siswa)",
      "1 Unit SD/MI (509 Siswa)",
      "1 Unit SMP/MTS (400 Siswa)",
    ],
    icon: <FaSchool size={32} className="text-white" />,
    gradient: "from-blue-500 to-blue-600",
    shadow: "shadow-blue-200",
  },
  {
    category: "Kesehatan",
    title: "Layanan Kesehatan Warga",
    desc: "Didukung oleh tenaga medis profesional (2 Dokter, 54 Bidan) untuk pelayanan kesehatan ibu, anak, dan umum.",
    items: ["1 Puskesmas Induk", "5 Posyandu Aktif", "85 Tenaga Medis Siaga"],
    icon: <FaHeartbeat size={32} className="text-white" />,
    gradient: "from-pink-500 to-rose-600",
    shadow: "shadow-pink-200",
  },
  {
    category: "Aksesibilitas",
    title: "Infrastruktur Jalan & Jembatan",
    desc: "Jaringan jalan yang menghubungkan 5 RW dan 34 RT untuk menunjang mobilitas ekonomi warga.",
    items: [
      "7 KM Jalan Aspal (Kondisi Baik)",
      "2 KM Jalan Rabat Beton",
      "5 KM Jalan Tanah/Perkerasan",
    ],
    icon: <FaRoad size={32} className="text-white" />,
    gradient: "from-slate-700 to-slate-800",
    shadow: "shadow-gray-200",
  },
  {
    category: "Fasilitas Umum",
    title: "Ekonomi & Layanan Publik",
    desc: "Pusat aktivitas warga dan pelayanan administrasi pemerintahan satu pintu.",
    items: [
      "Kantor Kelurahan Terpadu",
      "Sentra UMKM & Pertokoan",
      "Sarana Ibadah (Masjid/Musholla)",
    ],
    icon: <FaBuilding size={32} className="text-white" />,
    gradient: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-200",
  },
];

export default function SaranaPrasaranaSection() {
  return (
    <section data-aos="fade-up" className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[300px] md:h-[500px] bg-gradient-to-b from-white to-transparent pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* 1. HEADER */}

        {/* HEADER SECTION - Responsif */}
        <div className="mb-12">
          <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">
            SARANA & PRASARANA
          </span>
          <h2 className="text-3xl md:text-3xl font-bold text-gray-900 font-poppins mt-2">
            Profil Infrastruktur Kelurahan Sukajadi
          </h2>
          <p className="text-gray-500 text-sm mt-2 sm:text-base max-w-2xl mx-auto md:mx-0 mb-4 md:mb-4 leading-relaxed">
            Data lengkap kondisi fisik fasilitas umum, pendidikan, kesehatan,
            dan infrastruktur jalan yang menunjang kesejahteraan 14.249 jiwa
            penduduk
          </p>
          <div className="h-1 w-20 bg-blue-600 mt-4 rounded-full"></div>
        </div>

        {/* 2. STATS GRID (QUICK OVERVIEW) - Responsif */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16 lg:mb-20">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-5 md:p-6 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div
                  className={`p-2.5 md:p-3 rounded-lg md:rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}
                >
                  {stat.icon}
                </div>
                <FaArrowRight className="text-gray-300 group-hover:text-blue-500 transition-colors -rotate-45 group-hover:rotate-0 transform duration-300" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-gray-700">
                {stat.label}
              </div>
              <div className="text-xs text-gray-400 mt-1">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* 3. DETAILED CARDS - Responsif dengan Stack di Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {INFRASTRUCTURE_DETAILS.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:-translate-y-1"
            >
              {/* Decorative Gradient Background on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              ></div>

              <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 relative z-10">
                {/* Icon Box - Lebih Kecil di Mobile */}
                <div
                  className={`shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg ${item.shadow} group-hover:scale-110 transition-transform duration-500`}
                >
                  <div className="scale-90 md:scale-100">{item.icon}</div>
                </div>

                {/* Text Content */}
                <div className="flex-1 w-full">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r ${item.gradient} mb-2 block`}
                  >
                    {item.category}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 md:mb-6">
                    {item.desc}
                  </p>

                  {/* List Items - Responsif */}
                  <ul className="space-y-2 md:space-y-3">
                    {item.items.map((subItem, i) => (
                      <li
                        key={i}
                        className="flex items-start sm:items-center gap-2 md:gap-3 text-xs sm:text-sm font-medium text-gray-700 bg-gray-50 p-2.5 md:p-2 rounded-lg border border-gray-100 group-hover:bg-white transition-colors"
                      >
                        <div
                          className={`shrink-0 w-2 h-2 rounded-full bg-gradient-to-r ${item.gradient} mt-0.5 sm:mt-0`}
                        ></div>
                        <span className="leading-tight">{subItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4. FOOTER NOTE - Responsif */}
        <div className="mt-12 md:mt-16 bg-blue-900 rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12 text-white relative overflow-hidden text-center">
          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
              Komitmen Pembangunan Berkelanjutan
            </h3>
            <p className="text-blue-100 text-sm md:text-base max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed">
              Pemerintah Kelurahan Sukajadi terus berupaya meningkatkan kualitas
              infrastruktur melalui Musrenbang dan partisipasi swadaya
              masyarakat demi kenyamanan bersama.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 md:gap-4 text-xs md:text-sm font-bold text-blue-200">
              <span className="flex items-center gap-2">
                <FaBolt className="text-yellow-400" /> Listrik Masuk 100%
              </span>
              <span className="hidden sm:block">|</span>
              <span className="flex items-center gap-2">
                <FaWater className="text-cyan-400" /> Sanitasi Layak
              </span>
              <span className="hidden sm:block">|</span>
              <span className="flex items-center gap-2">
                <FaStore className="text-green-400" /> Ramah UMKM
              </span>
            </div>
          </div>

          {/* Abstract Pattern - Disesuaikan untuk Mobile */}
          <div className="absolute top-0 right-0 w-40 h-40 md:w-64 md:h-64 bg-blue-500 opacity-20 rounded-full blur-3xl -mr-10 md:-mr-20 -mt-10 md:-mt-20"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 md:w-64 md:h-64 bg-purple-500 opacity-20 rounded-full blur-3xl -ml-10 md:-ml-20 -mb-10 md:-mb-20"></div>
        </div>
      </div>
    </section>
  );
}
