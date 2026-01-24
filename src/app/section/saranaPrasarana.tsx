import React from "react";
// Import ikon dari Font Awesome (react-icons/fa)
import {
  FaLandmark,
  FaHeartbeat,
  FaSchool,
  FaFutbol,
  FaTree,
  FaShieldAlt,
} from "react-icons/fa";

// Data Dummy Sarana Prasarana (Bisa disesuaikan dengan kondisi riil Kelurahan Sukajadi)
const facilities = [
  {
    title: "Kantor Pelayanan Terpadu",
    desc: "Pusat pelayanan administrasi kependudukan dengan fasilitas ruang tunggu yang nyaman dan berbasis digital.",
    icon: <FaLandmark size={28} />,
  },
  {
    title: "Puskesmas Pembantu & Posyandu",
    desc: "Fasilitas kesehatan dasar yang tersebar di setiap RW untuk layanan ibu, anak, dan lansia.",
    icon: <FaHeartbeat size={28} />,
  },
  {
    title: "Gedung Sekolah (PAUD/TK/SD)",
    desc: "Tersedianya sarana pendidikan usia dini dan dasar yang berkualitas di lingkungan kelurahan.",
    icon: <FaSchool size={28} />,
  },
  {
    title: "Sarana Olahraga Warga",
    desc: "Lapangan serbaguna (voli, bulu tangkis, futsal) sebagai pusat aktivitas pemuda dan olahraga warga.",
    icon: <FaFutbol size={28} />,
  },
  {
    title: "Ruang Terbuka Hijau (RTH)",
    desc: "Taman kelurahan yang asri sebagai area resapan air dan tempat rekreasi keluarga.",
    icon: <FaTree size={28} />,
  },
  {
    title: "Pos Keamanan Lingkungan",
    desc: "Poskamling aktif di setiap RT yang terintegrasi dengan Babinsa dan Bhabinkamtibmas.",
    icon: <FaShieldAlt size={28} />,
  },
];

export default function SaranaPrasarana() {
  return (
    // Gunakan bg-gray-50 agar kontras dengan section sebelumnya yang berwarna putih
    <section data-aos="fade-up" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-16">
        {/* Header Section (Konsisten dengan section lain) */}
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">
            Fasilitas Publik
          </span>
          <h2 className=" mt-2 text-3xl md:text-4xl font-bold text-gray-900 font-poppins">
            Sarana & Prasarana <span className="text-blue-600">Unggulan</span>
          </h2>
          <p className="text-gray-600 leading-relaxed font-sans">
            Kami berkomitmen menyediakan infrastruktur yang memadai untuk
            mendukung kenyamanan dan kesejahteraan seluruh warga.
          </p>
          <div className="h-1 w-20 bg-blue-600 rounded-full mt-4"></div>
        </div>

        {/* Grid Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:-translate-y-2 cursor-default"
            >
              {/* Icon Container */}
              {/* Saat hover, background jadi biru, ikon jadi putih */}
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-3 font-poppins group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed font-sans text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
