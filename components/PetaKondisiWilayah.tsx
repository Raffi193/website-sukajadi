import React from "react";
import {
  MapPin,
  Users,
  Home,
  GraduationCap,
  ArrowRight,
  Layers,
  Compass,
} from "lucide-react";

export default function PetaKondisiWilayah() {
  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 space-y-6 md:space-y-8">
        {/* HEADER SECTION - Responsif */}      
        <div className="mb-12">
          <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">
            Gambaran Umum
          </span>
          <h2 className="text-3xl font-bold text-gray-900 font-poppins mt-2">
            Peta & Kondisi Wilayah
          </h2>
          <div className="h-1 w-20 bg-blue-600 mt-4 rounded-full"></div>
        </div>

        {/* 1. KONDISI GEOGRAFIS (Grid Layout Responsif) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Card Luas & Administratif */}
          <div className="bg-white p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="p-2.5 md:p-3 bg-blue-100 text-blue-600 rounded-lg md:rounded-xl shrink-0">
                <Layers size={24} className="md:w-7 md:h-7" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base md:text-lg font-bold text-gray-900 truncate">
                  Luas & Administratif
                </h3>
                <p className="text-xs md:text-sm text-gray-500 truncate">
                  Data Terkini Wilayah
                </p>
              </div>
            </div>

            <div className="space-y-3 md:space-y-4">
              <div className="flex justify-between items-center p-3 md:p-4 bg-gray-50 rounded-lg md:rounded-xl">
                <span className="text-sm md:text-base text-gray-600 font-medium">
                  Luas Wilayah
                </span>
                <span className="text-blue-700 font-bold text-base md:text-lg">
                  ± 517,2 Ha
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="p-3 md:p-4 bg-gray-50 rounded-lg md:rounded-xl text-center">
                  <span className="block text-xl md:text-2xl font-bold text-gray-800">
                    34
                  </span>
                  <span className="text-xs text-gray-500 uppercase font-semibold mt-1 block">
                    Rukun Tetangga
                  </span>
                </div>
                <div className="p-3 md:p-4 bg-gray-50 rounded-lg md:rounded-xl text-center">
                  <span className="block text-xl md:text-2xl font-bold text-gray-800">
                    05
                  </span>
                  <span className="text-xs text-gray-500 uppercase font-semibold mt-1 block">
                    Rukun Warga
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Batas Wilayah */}
          <div className="bg-white p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="p-2.5 md:p-3 bg-blue-100 text-blue-600 rounded-lg md:rounded-xl shrink-0">
                <Compass size={24} className="md:w-7 md:h-7" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base md:text-lg font-bold text-gray-900">
                  Batas Wilayah
                </h3>
                <p className="text-xs md:text-sm text-gray-500">
                  Perbatasan Administratif Kelurahan
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {[
                {
                  label: "Sebelah Utara",
                  val: "Desa Pangkalan Benteng",
                  icon: "N",
                  desc: "Jl. Desa Pkl. Benteng",
                },
                {
                  label: "Sebelah Selatan",
                  val: "Kelurahan Tanah Mas",
                  icon: "S",
                  desc: "Jl. Raya Plg-Betung",
                },
                {
                  label: "Sebelah Timur",
                  val: "Kelurahan Sukajadi Timur",
                  icon: "E",
                  desc: "Jl. Pelita",
                },
                {
                  label: "Sebelah Barat",
                  val: "Kelurahan Sukamoro",
                  icon: "W",
                  desc: "Jl. Pasir Putih",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 md:gap-4 p-3 md:p-4 border border-gray-100 rounded-lg md:rounded-xl hover:bg-blue-50/30 transition-colors"
                >
                  <div className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-gray-100 text-gray-600 font-bold rounded-full text-sm shrink-0">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-semibold text-blue-600 uppercase block mb-1">
                      {item.label}
                    </span>
                    <h4 className="font-bold text-gray-800 text-sm md:text-base leading-tight">
                      {item.val}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. DEMOGRAFI (Stats Row Responsif) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Total Penduduk */}
          <div className="bg-blue-600 text-white p-5 md:p-6 rounded-xl md:rounded-2xl shadow-lg relative overflow-hidden group">
            <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
              <Users size={100} className="md:w-[120px] md:h-[120px]" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2 opacity-90">
                <Users size={18} className="md:w-5 md:h-5" />
                <span className="font-medium text-xs md:text-sm">
                  Total Penduduk
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-1">14.249</h3>
              <p className="text-blue-100 text-sm">Jiwa</p>
            </div>
          </div>

          {/* Rincian Gender */}
          <div className="bg-white p-5 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-gray-700 text-sm md:text-base">
                Berdasarkan Gender
              </h4>
              <div className="p-1.5 md:p-2 bg-gray-50 rounded-lg">
                <Users
                  size={16}
                  className="md:w-[18px] md:h-[18px] text-gray-400"
                />
              </div>
            </div>
            <div className="space-y-3 md:space-y-4">
              <div>
                <div className="flex justify-between text-xs md:text-sm mb-1.5">
                  <span className="text-gray-600">Laki-laki</span>
                  <span className="font-bold text-gray-900">7.011</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: "49%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs md:text-sm mb-1.5">
                  <span className="text-gray-600">Perempuan</span>
                  <span className="font-bold text-gray-900">7.238</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-pink-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: "51%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Kepala Keluarga */}
          <div className="bg-white p-5 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2.5 md:gap-3 mb-3 md:mb-4">
              <div className="p-1.5 md:p-2 bg-orange-100 text-orange-600 rounded-lg">
                <Home size={20} className="md:w-6 md:h-6" />
              </div>
              <h4 className="font-bold text-gray-700 text-sm md:text-base">
                Kepala Keluarga
              </h4>
            </div>
            <div className="mt-2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                3.926
              </h3>
              <p className="text-gray-500 text-xs md:text-sm mt-1">
                Kepala Keluarga (KK) Terdaftar
              </p>
            </div>
            <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-gray-50">
              <p className="text-xs text-gray-400 italic">
                *Data kependudukan berdasarkan catatan kelurahan terkini.
              </p>
            </div>
          </div>
        </div>

        {/* 3. PENDIDIKAN & FASILITAS - Responsif Stack di Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 bg-white p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl shadow-sm border border-gray-100">
          {/* Kolom Narasi Pendidikan */}
          <div className="lg:pr-4">
            <div className="flex items-center gap-2.5 md:gap-3 mb-4">
              <div className="p-1.5 md:p-2 bg-green-100 text-green-700 rounded-lg shrink-0">
                <GraduationCap size={20} className="md:w-6 md:h-6" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                Sektor Pendidikan
              </h3>
            </div>

            <div className="prose max-w-none text-gray-600 leading-relaxed text-sm md:text-base">
              <p className="mb-3 md:mb-4 text-justify">
                Pendidikan adalah pilar utama dalam memajukan kesadaran dan
                perekonomian masyarakat. Tingkat pendidikan yang tinggi
                berkorelasi langsung dengan peningkatan kecakapan, keterampilan
                kewirausahaan, dan pola pikir yang sistematis.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 md:p-4 my-3 md:my-4 rounded-r-lg">
                <p className="text-blue-800 font-medium italic text-xs md:text-sm leading-relaxed">
                  "Kelurahan secara bertahap merencanakan dan menganggarkan
                  bidang pendidikan melalui ADD dan swadaya masyarakat guna
                  mendukung RPJM Daerah Kabupaten Banyuasin."
                </p>
              </div>
            </div>
          </div>

          {/* Kolom Fasilitas / Topografi */}
          <div className="bg-gray-50 rounded-lg md:rounded-xl p-4 md:p-5 lg:p-6 border border-gray-100">
            <h4 className="font-bold text-gray-800 text-sm md:text-base mb-3 md:mb-4 flex items-center gap-2">
              <MapPin
                size={16}
                className="md:w-[18px] md:h-[18px] text-red-500 shrink-0"
              />
              <span>Fasilitas & Tata Guna Lahan</span>
            </h4>
            <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4 leading-relaxed">
              Inventarisasi fasilitas umum dan penggunaan lahan di wilayah
              Sukajadi:
            </p>

            <ul className="space-y-2 md:space-y-3">
              {[
                "Perkantoran Pemerintah",
                "Pemakaman Umum",
                "Bangunan Sekolah",
                "Area Pertokoan & Ekonomi",
                "Infrastruktur Jalan",
                "Jaringan Listrik Tegangan Tinggi",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between text-xs md:text-sm bg-white p-2.5 md:p-3 rounded-lg shadow-sm hover:shadow transition-shadow"
                >
                  <span className="text-gray-700 font-medium">{item}</span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 md:py-1 rounded shrink-0">
                    Terdata
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Optional: Info Footer untuk Context Tambahan */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm shrink-0">
              <MapPin size={24} className="md:w-7 md:h-7" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg md:text-xl mb-2">
                Lokasi Strategis
              </h4>
              <p className="text-blue-100 text-sm md:text-base leading-relaxed">
                Kelurahan Sukajadi terletak di posisi strategis sebagai pintu
                gerbang Kecamatan Betung, dengan akses mudah ke pusat kota
                Palembang dan kawasan ekonomi sekitar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
