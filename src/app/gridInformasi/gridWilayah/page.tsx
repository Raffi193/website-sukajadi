"use client";

import {
  FaMapMarkedAlt,
  FaCompass,
  FaMountain,
  FaTemperatureHigh,
  FaArrowUp,
  FaArrowDown,
  FaArrowRight,
  FaArrowLeft,
  FaChartPie,
} from "react-icons/fa";
import Topbar from "@/components/layout/TopBar";
import NavBar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function WilayahSection() {
  return (
    <>
      <Topbar />
      <NavBar />
      <section className="py-18 mb-29 bg-white">
        <div className="container mx-auto px-4 md:px-16">
          {/* BAGIAN 1: KONDISI GEOGRAFIS & STATISTIK */}
          <div className="grid lg:grid-cols-12 gap-12 mb-20 items-center">
            {/* Kolom Kiri: Deskripsi Naratif */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium">
                <FaMapMarkedAlt /> Geografis Kelurahan
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-poppins">
                Kondisi Geografis & <br />
                <span className="text-blue-600">Topografi Wilayah</span>
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg font-sans text-justify">
                Kelurahan Sukajadi memiliki topografi yang relatif datar dengan
                kemiringan tanah rata-rata 0-2 derajat. Terletak pada ketinggian
                yang strategis dan bebas banjir, menjadikan wilayah ini sangat
                potensial untuk kawasan pemukiman, perdagangan, dan jasa.
                Struktur tanah yang stabil mendukung pembangunan infrastruktur
                jangka panjang.
              </p>
            </div>

            {/* Kolom Kanan: Kotak Statistik */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {/* Stat 1: Luas */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:shadow-md transition hover:-translate-y-1">
                <div className="w-12 h-12 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl mb-3">
                  <FaMapMarkedAlt />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">145 Ha</h3>
                <p className="text-sm text-gray-500">Luas Wilayah</p>
              </div>

              {/* Stat 2: Ketinggian */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:shadow-md transition hover:-translate-y-1">
                <div className="w-12 h-12 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl mb-3">
                  <FaMountain />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">12 mdpl</h3>
                <p className="text-sm text-gray-500">Ketinggian</p>
              </div>

              {/* Stat 3: Suhu */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:shadow-md transition hover:-translate-y-1">
                <div className="w-12 h-12 mx-auto bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xl mb-3">
                  <FaTemperatureHigh />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">27°C</h3>
                <p className="text-sm text-gray-500">Suhu Rata-rata</p>
              </div>

              {/* Stat 4: RW/RT */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:shadow-md transition hover:-translate-y-1">
                <div className="w-12 h-12 mx-auto bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl mb-3">
                  <FaChartPie />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">09 / 45</h3>
                <p className="text-sm text-gray-500">Jml. RW / RT</p>
              </div>
            </div>
          </div>

          {/* BAGIAN 2: BATAS WILAYAH */}
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">
                Perbatasan
              </span>
              <h2 className="text-3xl font-bold text-gray-900 font-poppins mt-2">
                Batas Administrasi
              </h2>
              <div className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* UTARA */}
              <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-500 hover:-translate-y-2 transition-transform group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition">
                    <FaArrowUp />
                  </div>
                  <h4 className="font-bold text-gray-800 font-poppins">
                    Sebelah Utara
                  </h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Berbatasan dengan Kelurahan Sukamoro dan Area Perkebunan.
                </p>
              </div>

              {/* TIMUR */}
              <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-500 hover:-translate-y-2 transition-transform group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition">
                    <FaArrowRight />
                  </div>
                  <h4 className="font-bold text-gray-800 font-poppins">
                    Sebelah Timur
                  </h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Berbatasan dengan Kecamatan Sako dan Jalan Pangeran Ayin.
                </p>
              </div>

              {/* SELATAN */}
              <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-500 hover:-translate-y-2 transition-transform group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition">
                    <FaArrowDown />
                  </div>
                  <h4 className="font-bold text-gray-800 font-poppins">
                    Sebelah Selatan
                  </h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Berbatasan dengan Kelurahan Sukamaju dan Komplek Kenten.
                </p>
              </div>

              {/* BARAT */}
              <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-500 hover:-translate-y-2 transition-transform group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition">
                    <FaArrowLeft />
                  </div>
                  <h4 className="font-bold text-gray-800 font-poppins">
                    Sebelah Barat
                  </h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Berbatasan dengan Kelurahan Talang Kelapa dan Alang-Alang
                  Lebar.
                </p>
              </div>
            </div>
          </div>

          {/* BAGIAN 3: PETA DIGITAL */}
          <div className="bg-gray-900 rounded-2xl p-2 md:p-4 shadow-2xl">
            <div className="bg-white rounded-xl overflow-hidden relative h-[500px]">
              {/* Header Peta Melayang */}
              <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md border border-gray-200">
                <h4 className="font-bold text-gray-800 flex items-center gap-2 text-sm">
                  <FaCompass className="text-red-500" /> Peta Wilayah Digital
                </h4>
              </div>

              {/* iframe Google Maps */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.505541172605!2d104.764658!3d-2.95687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b77a067098e91%3A0x4a1801705d930263!2sKantor%20Lurah%20Sukajadi!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid" // Ganti dengan link embed asli Anda nanti
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="filter contrast-125"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
