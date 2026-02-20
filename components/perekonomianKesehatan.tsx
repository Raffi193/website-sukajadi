"use client";

import TopBar from "@/components/layout/TopBar";
import NavBar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  FaBriefcase,
  FaStore,
  FaHardHat,
  FaUserShield,
  FaLeaf,
  FaUserMd,
  FaHospital,
  FaAmbulance,
  FaRoad,
  FaArchway,
  FaBolt,
  FaTools,
  FaWalking,
  FaHeartbeat,
} from "react-icons/fa";
import { MdOutlineAgriculture, MdStorefront } from "react-icons/md";

export default function PerekonomianKesehatan() {
  // --- DATA 1: PEREKONOMIAN ---
  const livelihoods = [
    {
      name: "Petani / Pekebun",
      icon: <FaLeaf />,
      color: "bg-green-100 text-green-600",
    },
    {
      name: "PNS / TNI / Polri",
      icon: <FaUserShield />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      name: "Karyawan Swasta",
      icon: <FaBriefcase />,
      color: "bg-gray-100 text-gray-600",
    },
    {
      name: "Pedagang / Wirausaha",
      icon: <MdStorefront />,
      color: "bg-orange-100 text-orange-600",
    },
    {
      name: "Buruh Bangunan",
      icon: <FaHardHat />,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      name: "Peternak",
      icon: <MdOutlineAgriculture />,
      color: "bg-emerald-100 text-emerald-600",
    },
  ];

  // --- DATA 2: KESEHATAN ---
  const healthStats = [
    { label: "Puskesmas Induk", val: "1 Unit", icon: <FaHospital /> },
    { label: "Posyandu", val: "5 Unit", icon: <FaHeartbeat /> },
    { label: "Tenaga Medis", val: "85 Orang", icon: <FaUserMd /> },
    { label: "Bidan Desa", val: "54 Orang", icon: <FaUserMd /> }, // Menggunakan icon sama utk variasi
    { label: "Dokter Umum", val: "2 Orang", icon: <FaUserMd /> },
  ];

  // --- DATA 3: INFRASTRUKTUR JALAN ---
  const roadInfrastucture = [
    { type: "Jalan Aspal", length: 7, total: 14, color: "bg-gray-800" }, // total dummy utk bar
    { type: "Jalan Rabat Beton", length: 2, total: 14, color: "bg-gray-500" },
    { type: "Jalan Tanah/Batu", length: 5, total: 14, color: "bg-amber-600" },
  ];

  // --- DATA 4: TANTANGAN INFRASTRUKTUR ---
  const infraChallenges = [
    "Pembangunan & Pengaspalan Jalan Kelurahan",
    "Rehabilitasi Jalan Rusak",
    "Pembuatan Gorong-gorong & Siring",
    "Peningkatan Jaringan Listrik",
  ];

  return (
    <>
      <section className="py-20 bg-white ">
        <div className="container mx-auto px-4 md:px-16 space-y-24 mb-30">
          {/* ================= 1. PEREKONOMIAN ================= */}
          <div>
            <div className="mb-12">
              <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">
                Ekonomi Kerakyatan
              </span>
              <h2 className="text-3xl md:text-3xl font-semibold text-gray-800 font-poppins mt-2">
                Mata Pencaharian <span className="text-gray-800">Warga</span>
              </h2>
              <div className="h-1 w-20 bg-blue-600 mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {livelihoods.map((job, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:-translate-y-2 transition-transform duration-300 group"
                >
                  <div
                    className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center text-2xl mb-4 ${job.color} group-hover:scale-110 transition-transform`}
                  >
                    {job.icon}
                  </div>
                  <h4 className="font-bold text-gray-700 text-sm font-poppins">
                    {job.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* ================= 2. KESEHATAN ================= */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid lg:grid-cols-12">
              {/* Kolom Kiri: Header & Aksesibilitas */}
              <div className="lg:col-span-5 bg-blue-600 p-10 text-white flex flex-col justify-center">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-white/20 rounded-xl">
                      <FaHeartbeat size={24} />
                    </div>
                    <h3 className="text-2xl font-bold font-poppins">
                      Sarana Kesehatan
                    </h3>
                  </div>
                  <p className="text-blue-100 text-justify text-sm leading-relaxed font-sans">
                    Fasilitas kesehatan di Kelurahan Sukajadi cukup memadai
                    dengan dukungan tenaga medis yang kompeten. Kami berkomitmen
                    menjamin akses kesehatan cepat bagi warga.
                  </p>
                </div>

                {/* Aksesibilitas Box */}
                <div className="bg-blue-700/50 p-6 rounded-xl border border-blue-500/30">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <FaAmbulance /> Akses Layanan
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-blue-100">
                        <FaWalking /> Ke Puskesmas
                      </div>
                      <span className="font-bold text-white">
                        5 Menit (0.5 KM)
                      </span>
                    </div>
                    <div className="w-full bg-blue-800 h-1.5 rounded-full">
                      <div className="bg-green-400 h-1.5 rounded-full w-[30%]"></div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 text-sm text-blue-100">
                        <FaHospital /> Ke Rumah Sakit
                      </div>
                      <span className="font-bold text-white">15 Menit</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Statistik Grid */}
              <div className="lg:col-span-7 p-10 bg-white">
                <h4 className="font-bold text-gray-800 mb-6 font-poppins">
                  Data Fasilitas & Tenaga Medis (2024)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {healthStats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-gray-50 border border-gray-100"
                    >
                      <div className="text-blue-600 mb-2 text-xl">
                        {stat.icon}
                      </div>
                      <div className="text-2xl font-bold text-gray-800 font-mono">
                        {stat.val}
                      </div>
                      <div className="text-xs text-gray-500 uppercase font-semibold mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-right">
                  <span className="text-xs text-gray-400 italic">
                    Sumber: Profil Kelurahan Tabel 8
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= 3. INFRASTRUKTUR & SARANA ================= */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Infrastruktur Jalan (Progress Bar) */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gray-800 text-white rounded-lg">
                  <FaRoad />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-poppins">
                  Kondisi Jalan
                </h3>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                {roadInfrastucture.map((road, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-gray-700 text-sm flex items-center gap-2">
                        {idx === 0 ? (
                          <span className="w-2 h-2 rounded-full bg-gray-800"></span>
                        ) : idx === 1 ? (
                          <span className="w-2 h-2 rounded-full bg-gray-500"></span>
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                        )}
                        {road.type}
                      </span>
                      <span className="font-bold text-gray-900">
                        {road.length} KM
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${road.color}`}
                        style={{
                          width: `${(road.length / road.total) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}

                {/* Jembatan Stat Kecil */}
                <div className="pt-6 mt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <FaArchway className="text-blue-500 text-xl" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase">
                        Jembatan Kecil
                      </p>
                      <p className="font-bold text-gray-900">3 Unit</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaTools className="text-gray-400 text-xl" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase">
                        Irigasi/Bendungan
                      </p>
                      <p className="font-bold text-gray-900">-</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tantangan / Prioritas Pembangunan */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-amber-500 text-white rounded-lg">
                  <FaBolt />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-poppins">
                  Prioritas Pembangunan
                </h3>
              </div>

              <div className="bg-amber-50 border border-amber-100 p-8 rounded-2xl h-fit">
                <p className="text-amber-900 mb-6 font-sans">
                  Pembangunan infrastruktur dihadapkan pada keterbatasan
                  anggaran, namun melalui swadaya masyarakat yang terkoordinir
                  di RT/RW, beberapa perbaikan terus diupayakan. Berikut adalah
                  fokus masalah yang menjadi prioritas:
                </p>
                <ul className="space-y-3">
                  {infraChallenges.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm border border-amber-100/50"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-bold mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-gray-700 font-medium text-sm">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
