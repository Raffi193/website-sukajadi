import React from "react";
import {
  MapPin,
  Users,
  Home,
  GraduationCap,
  Layers,
  Compass,
  BookOpen,
  Backpack,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

export default function PetaKondisiWilayah() {
  // Data Tabel 6: Tingkat Pendidikan
  const educationStats = [
    { label: "Tidak Tamat SD", count: 0, color: "bg-gray-200" },
    { label: "Tamat SD", count: 300, color: "bg-blue-300" },
    { label: "Tamat SLTP", count: 500, color: "bg-blue-400" },
    { label: "Tamat SMU", count: 1200, color: "bg-blue-600" }, // Dominan
    { label: "Diploma (D1-D3)", count: 50, color: "bg-indigo-500" },
    { label: "Sarjana (S1)", count: 30, color: "bg-indigo-600" },
    { label: "Pascasarjana (S2)", count: 0, color: "bg-indigo-800" },
  ];

  // Menghitung persentase untuk visualisasi bar
  const totalEducation = 2080;

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 space-y-8 md:space-y-12">
        <div>
          {/* HEADER SECTION - Responsif */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="p-2.5 md:p-3 bg-blue-600 text-white rounded-lg md:rounded-xl shadow-md shrink-0">
              <GraduationCap size={22} className="md:w-6 md:h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl lg:text-2xl font-semibold text-gray-900 mb-1">
                Sektor Pendidikan
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm md:text-base">
                Data Statistik & Kondisi Pendidikan Terkini
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* KOLOM KIRI: Statistik Penduduk Menurut Pendidikan (Tabel 6) */}
            <div className="bg-white p-5 md:p-6 lg:p-7 rounded-xl md:rounded-2xl shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 md:mb-6">
                <h4 className="font-bold text-gray-800 text-sm md:text-base flex items-center gap-2">
                  <TrendingUp size={16} className="md:w-[18px] md:h-[18px] text-blue-500 shrink-0" />
                  <span>Tingkat Pendidikan Penduduk</span>
                </h4>
                <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2.5 py-1 rounded whitespace-nowrap">
                  Total Sampel: {totalEducation}
                </span>
              </div>

              <div className="space-y-3.5 md:space-y-4">
                {educationStats.map((item, index) => {
                  // Hitung persentase untuk lebar bar
                  const percentage =
                    totalEducation > 0
                      ? (item.count / totalEducation) * 100
                      : 0;

                  return (
                    <div key={index}>
                      <div className="flex justify-between items-baseline text-xs md:text-sm mb-1.5">
                        <span className="text-gray-600 font-medium">
                          {item.label}
                        </span>
                        <span className="font-bold text-gray-900 text-sm md:text-base">
                          {item.count} <span className="text-xs text-gray-500 font-normal">Jiwa</span>
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 md:h-2.5 overflow-hidden">
                        <div
                          className={`h-2 md:h-2.5 rounded-full ${item.color} transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 md:mt-6 pt-3 md:pt-4 border-t border-gray-50 text-xs text-gray-400 text-center sm:text-right">
                Sumber: Profil Kelurahan (Tabel 6) - Tahun 2024
              </div>
            </div>

            {/* KOLOM KANAN: Data Siswa & Isu Pendidikan */}
            <div className="space-y-5 md:space-y-6">
              {/* Data Siswa (Tabel 7) - Tampilan Cards Responsif */}
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {/* TK */}
                <div className="bg-white p-3 md:p-4 rounded-lg md:rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                  <div className="mx-auto w-9 h-9 md:w-10 md:h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-2">
                    <Users size={18} className="md:w-5 md:h-5" />
                  </div>
                  <h5 className="text-gray-500 text-[10px] sm:text-xs font-bold uppercase leading-tight mb-1">
                    Siswa TK
                  </h5>
                  <p className="text-xl md:text-2xl font-bold text-gray-800">50</p>
                </div>
                {/* SD/MI */}
                <div className="bg-white p-3 md:p-4 rounded-lg md:rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                  <div className="mx-auto w-9 h-9 md:w-10 md:h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-2">
                    <Backpack size={18} className="md:w-5 md:h-5" />
                  </div>
                  <h5 className="text-gray-500 text-[10px] sm:text-xs font-bold uppercase leading-tight mb-1">
                    Siswa SD/MI
                  </h5>
                  <p className="text-xl md:text-2xl font-bold text-gray-800">509</p>
                </div>
                {/* SMP/MTS */}
                <div className="bg-white p-3 md:p-4 rounded-lg md:rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                  <div className="mx-auto w-9 h-9 md:w-10 md:h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-2">
                    <BookOpen size={18} className="md:w-5 md:h-5" />
                  </div>
                  <h5 className="text-gray-500 text-[10px] sm:text-xs font-bold uppercase leading-tight mb-1">
                    Siswa SMP/MTs
                  </h5>
                  <p className="text-xl md:text-2xl font-bold text-gray-800">400</p>
                </div>
              </div>

              {/* Tantangan / Isu Pendidikan - Responsif */}
              <div className="bg-amber-50 border border-amber-100 rounded-xl md:rounded-2xl p-5 md:p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-2 -mr-2 w-12 h-12 md:w-16 md:h-16 bg-amber-100 rounded-full blur-xl opacity-50"></div>

                <h4 className="font-bold text-amber-900 text-sm md:text-base mb-3 flex items-center gap-2 relative z-10">
                  <AlertCircle size={18} className="md:w-5 md:h-5 shrink-0" />
                  <span>Tantangan Pendidikan</span>
                </h4>

                <p className="text-amber-800 text-xs md:text-sm leading-relaxed mb-4 relative z-10">
                  "Permasalahan pendidikan secara umum antara lain masih
                  rendahnya kualitas pendidikan, rendahnya tingkat partisipasi
                  masyarakat, terbatasnya sarana dan prasarana, serta perlunya
                  peningkatan kualitas tenaga pengajar."
                </p>

                <div className="bg-white/60 p-3 md:p-4 rounded-lg border border-amber-100/50 relative z-10">
                  <h5 className="text-[10px] sm:text-xs font-bold text-amber-800 uppercase mb-2 md:mb-3">
                    Fokus Perbaikan:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Kualitas Pengajar",
                      "Sarana Prasarana",
                      "Partisipasi Warga",
                      "Angka Putus Sekolah",
                    ].map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 md:px-2.5 py-1 bg-white text-amber-700 text-[10px] sm:text-xs rounded border border-amber-100 font-medium hover:bg-amber-50 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Optional: Summary Footer */}
          <div className="mt-6 md:mt-8 bg-blue-50 border border-blue-100 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
              <div className="p-2 md:p-2.5 bg-blue-100 rounded-lg shrink-0">
                <BookOpen size={20} className="md:w-6 md:h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h5 className="font-bold text-blue-900 text-sm md:text-base mb-1">
                  Komitmen Peningkatan Mutu Pendidikan
                </h5>
                <p className="text-blue-700 text-xs md:text-sm leading-relaxed">
                  Kelurahan secara bertahap merencanakan dan menganggarkan bidang pendidikan 
                  melalui ADD dan swadaya masyarakat guna mendukung RPJM Daerah Kabupaten Banyuasin. 
                  <span className="font-semibold"> Total {educationStats.reduce((sum, item) => sum + item.count, 0)} jiwa</span> penduduk 
                  telah mengenyam pendidikan formal di berbagai jenjang.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}