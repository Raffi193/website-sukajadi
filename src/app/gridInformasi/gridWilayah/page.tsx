"use client";

import {
  FaMapMarkedAlt,
  FaCompass,
  FaUsers,
  FaHome,
  FaArrowUp,
  FaArrowDown,
  FaArrowRight,
  FaArrowLeft,
  FaChartPie,
  FaGraduationCap,
  FaSchool,
  FaBook,
  FaChild,
} from "react-icons/fa";
import Topbar from "@/src/components/layout/TopBar";
import NavBar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";

export default function WilayahSection() {
  // Data Pendidikan untuk Progress Bar
  const educationStats = [
    { label: "Tidak Tamat SD", count: 0, color: "bg-gray-200" },
    { label: "Tamat SD", count: 300, color: "bg-blue-300" },
    { label: "Tamat SLTP", count: 500, color: "bg-blue-400" },
    { label: "Tamat SMU", count: 1200, color: "bg-blue-600" },
    { label: "Diploma (D1-D3)", count: 50, color: "bg-indigo-500" },
    { label: "Sarjana (S1)", count: 30, color: "bg-indigo-600" },
    { label: "Pascasarjana (S2)", count: 0, color: "bg-indigo-800" },
  ];
  const totalEducation = 2080;

  return (
    <>
      <Topbar />
      <NavBar />
      <section className=" mb-50 bg-white">
        <div className="container mx-auto px-4 md:px-16 space-y-20">
          {/* BAGIAN 1: KONDISI GEOGRAFIS & STATISTIK UTAMA */}
          <div className="grid lg:grid-cols-12 gap-12 items-center mt-10">
            {/* Kolom Kiri: Deskripsi Naratif */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium">
                <FaMapMarkedAlt /> Gambaran Umum
              </div>
              <h2 className="text-3xl md:text-3xl font-bold text-gray-800 font-poppins">
                Kondisi Geografis & <br />
                <span className="text-gray-800">Demografi Wilayah</span>
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg font-sans text-justify">
                Kelurahan Sukajadi mencakup wilayah seluas{" "}
                <strong>± 517,2 Ha</strong>. Secara topografi, wilayah ini
                dikelompokkan untuk berbagai kebutuhan seperti fasilitas umum,
                pemukiman, perkebunan, dan kegiatan ekonomi. Struktur tanah yang
                stabil mendukung pengembangan infrastruktur jangka panjang di
                wilayah yang terbagi menjadi <strong>34 RT dan 06 RW</strong>{" "}
                ini.
              </p>
            </div>

            {/* Kolom Kanan: Kotak Statistik */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {/* Stat 1: Luas */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:shadow-md transition hover:-translate-y-1">
                <div className="w-12 h-12 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl mb-3">
                  <FaMapMarkedAlt />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">517,2 Ha</h3>
                <p className="text-sm text-gray-500">Luas Wilayah</p>
              </div>

              {/* Stat 2: Penduduk (Ganti Ketinggian jadi Penduduk) */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:shadow-md transition hover:-translate-y-1">
                <div className="w-12 h-12 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl mb-3">
                  <FaUsers />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">14.249</h3>
                <p className="text-sm text-gray-500">Total Penduduk</p>
              </div>

              {/* Stat 3: KK (Ganti Suhu jadi KK) */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:shadow-md transition hover:-translate-y-1">
                <div className="w-12 h-12 mx-auto bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xl mb-3">
                  <FaHome />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">3.926</h3>
                <p className="text-sm text-gray-500">Kepala Keluarga</p>
              </div>

              {/* Stat 4: RW/RT */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:shadow-md transition hover:-translate-y-1">
                <div className="w-12 h-12 mx-auto bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl mb-3">
                  <FaChartPie />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">06 / 34</h3>
                <p className="text-sm text-gray-500">Jml. RW / RT</p>
              </div>
            </div>
          </div>

          {/* BAGIAN 2: BATAS WILAYAH */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">
                Perbatasan
              </span>
              <p className="text-3xl md:text-3xl font-bold text-gray-800 font-poppins mt-2">
                Batas Administrasi
              </p>
              <div className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* UTARA */}
              <div className="bg-white p-6 rounded-xl shadow-sm  border border-gray-200 hover:-translate-y-2 transition-transform group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition">
                    <FaArrowUp />
                  </div>
                  <h4 className="font-bold text-gray-800 font-poppins">
                    Sebelah Utara
                  </h4>
                </div>
                <h5 className="font-semibold text-gray-700">
                  Desa Pangkalan Benteng
                </h5>
                <p className="text-gray-500 text-sm mt-1">
                  Jl. Desa Pkl. Benteng
                </p>
              </div>

              {/* SELATAN */}
              <div className="bg-white p-6 rounded-xl shadow-sm  border border-gray-200 hover:-translate-y-2 transition-transform group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition">
                    <FaArrowDown />
                  </div>
                  <h4 className="font-bold text-gray-800 font-poppins">
                    Sebelah Selatan
                  </h4>
                </div>
                <h5 className="font-semibold text-gray-700">
                  Kelurahan Tanah Mas
                </h5>
                <p className="text-gray-500 text-sm mt-1">
                  Jl. Raya Plg-Betung
                </p>
              </div>

              {/* TIMUR */}
              <div className="bg-white p-6 rounded-xl shadow-sm  border border-gray-200 hover:-translate-y-2 transition-transform group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition">
                    <FaArrowRight />
                  </div>
                  <h4 className="font-bold text-gray-800 font-poppins">
                    Sebelah Timur
                  </h4>
                </div>
                <h5 className="font-semibold text-gray-700">
                  Kel. Sukajadi Timur
                </h5>
                <p className="text-gray-500 text-sm mt-1">Jl. Pelita</p>
              </div>

              {/* BARAT */}
              <div className="bg-white p-6 rounded-xl shadow-sm  border border-gray-200 hover:-translate-y-2 transition-transform group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition">
                    <FaArrowLeft />
                  </div>
                  <h4 className="font-bold text-gray-800 font-poppins">
                    Sebelah Barat
                  </h4>
                </div>
                <h5 className="font-semibold text-gray-700">
                  Kelurahan Sukamoro
                </h5>
                <p className="text-gray-500 text-sm mt-1">Jl. Pasir Putih</p>
              </div>
            </div>
          </div>

          {/* BAGIAN 3: PENDIDIKAN (New Addition) */}
          <div className="bg-blue-50/50 rounded-3xl p-8 border border-blue-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-600 text-white rounded-xl shadow-md">
                <FaGraduationCap size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  Sektor Pendidikan
                </p>
                <p className="text-gray-500 text-sm">
                  Statistik Jenjang Pendidikan & Jumlah Siswa
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Grafik Progress Bar */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                  Tingkat Pendidikan Penduduk
                </h4>
                <div className="space-y-4">
                  {educationStats.map((item, index) => {
                    const percentage =
                      totalEducation > 0
                        ? (item.count / totalEducation) * 100
                        : 0;
                    return (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 font-medium">
                            {item.label}
                          </span>
                          <span className="font-bold text-gray-900">
                            {item.count}
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                          <div
                            className={`h-2.5 rounded-full ${item.color}`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Statistik Siswa */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* TK */}
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                    <div className="mx-auto w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-2">
                      <FaChild size={20} />
                    </div>
                    <h5 className="text-gray-500 text-xs font-bold uppercase">
                      TK
                    </h5>
                    <p className="text-2xl font-bold text-gray-800">50</p>
                  </div>
                  {/* SD */}
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                    <div className="mx-auto w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-2">
                      <FaSchool size={20} />
                    </div>
                    <h5 className="text-gray-500 text-xs font-bold uppercase">
                      SD/MI
                    </h5>
                    <p className="text-2xl font-bold text-gray-800">509</p>
                  </div>
                  {/* SMP */}
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                    <div className="mx-auto w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-2">
                      <FaBook size={20} />
                    </div>
                    <h5 className="text-gray-500 text-xs font-bold uppercase">
                      SMP/MTs
                    </h5>
                    <p className="text-2xl font-bold text-gray-800">400</p>
                  </div>
                </div>

                {/* Note Tantangan */}
                <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-xl">
                  <h5 className="font-bold text-yellow-800 mb-2 text-sm">
                    Tantangan Pendidikan
                  </h5>
                  <p className="text-sm text-yellow-700 leading-relaxed">
                    Diperlukan peningkatan partisipasi masyarakat, perbaikan
                    sarana prasarana, dan peningkatan kualitas tenaga pengajar
                    untuk mengurangi angka putus sekolah.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
