'use client';

import { useState } from 'react';
import { 
  FaIdCard, FaUsers, FaBaby, FaHeartBroken, FaTruckMoving, 
  FaFileContract, FaSearch, FaTimes, FaDownload, FaClock, FaInfoCircle 
} from "react-icons/fa";

// --- DATA LAYANAN ---
const servicesData = [
  {
    id: 1,
    title: "Pembuatan KTP-el",
    icon: <FaIdCard />,
    color: "text-blue-600 bg-blue-100",
    desc: "Penerbitan KTP elektronik baru, hilang, atau rusak.",
    syarat: [
      "Surat Pengantar RT/RW",
      "Fotokopi Kartu Keluarga (KK)",
      "KTP Lama (jika rusak/perubahan data)",
      "Surat Keterangan Hilang dari Polisi (jika hilang)",
      "Pas Foto 3x4 (Warna Merah/Biru) jika belum rekam"
    ],
    waktu: "3 - 7 Hari Kerja",
    biaya: "Gratis"
  },
  {
    id: 2,
    title: "Kartu Keluarga (KK)",
    icon: <FaUsers />,
    color: "text-green-600 bg-green-100",
    desc: "Pembuatan KK baru, penambahan anggota, atau pisah KK.",
    syarat: [
      "Surat Pengantar RT/RW",
      "KK Lama (Asli)",
      "Buku Nikah / Akta Cerai (Fotokopi)",
      "Surat Pindah (jika pendatang baru)",
      "Akta Kelahiran (untuk penambahan anggota)"
    ],
    waktu: "3 - 5 Hari Kerja",
    biaya: "Gratis"
  },
  {
    id: 3,
    title: "Akta Kelahiran",
    icon: <FaBaby />,
    color: "text-pink-500 bg-pink-100",
    desc: "Pencatatan kelahiran baru bagi warga kelurahan.",
    syarat: [
      "Surat Keterangan Lahir dari Bidan/RS (Asli)",
      "Fotokopi KTP Orang Tua & Saksi (2 orang)",
      "Fotokopi KK & Buku Nikah Orang Tua",
      "Mengisi Formulir F-2.01"
    ],
    waktu: "5 Hari Kerja",
    biaya: "Gratis"
  },
  {
    id: 4,
    title: "Akta Kematian",
    icon: <FaHeartBroken />,
    color: "text-gray-600 bg-gray-200",
    desc: "Pelaporan warga meninggal dunia untuk administrasi.",
    syarat: [
      "Surat Keterangan Kematian dari RS/Dokter",
      "Surat Pengantar RT/RW",
      "KTP & KK Asli yang meninggal",
      "Fotokopi KTP Pelapor & Saksi"
    ],
    waktu: "2 - 3 Hari Kerja",
    biaya: "Gratis"
  },
  {
    id: 5,
    title: "Surat Pindah / Datang",
    icon: <FaTruckMoving />,
    color: "text-orange-600 bg-orange-100",
    desc: "Pengurusan surat pindah keluar atau masuk wilayah.",
    syarat: [
      "Surat Pengantar RT/RW",
      "KK & KTP Asli",
      "Pas Foto 4x6 (4 lembar)",
      "Alamat tujuan lengkap (RT/RW, Kel, Kec, Kab/Kota)"
    ],
    waktu: "1 - 3 Hari Kerja",
    biaya: "Gratis"
  },
  {
    id: 6,
    title: "Surat Keterangan (SKTM/Usaha)",
    icon: <FaFileContract />,
    color: "text-purple-600 bg-purple-100",
    desc: "Surat keterangan tidak mampu, domisili usaha, atau kelakuan baik.",
    syarat: [
      "Surat Pengantar RT/RW",
      "Fotokopi KTP & KK",
      "Bukti pendukung lain (misal: Foto Usaha untuk SKU)"
    ],
    waktu: "1 Hari Kerja (Bisa Ditunggu)",
    biaya: "Gratis"
  },
];

const downloadLinks = [
  { name: "Formulir F-1.01 (Biodata)", size: "120 KB" },
  { name: "Formulir F-1.21 (Permohonan KTP)", size: "85 KB" },
  { name: "Surat Pernyataan Belum Menikah", size: "50 KB" },
];

export default function LayananPenduduk() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState<typeof servicesData[0] | null>(null);

  // Filter Layanan
  const filteredServices = servicesData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-13 mb-26 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-16">
        
        {/* --- 1. SEARCH BAR --- */}
        <div className="relative -mt-6 mb-12 max-w-2xl mx-auto z-10">
          <div className="bg-white p-2 rounded-full shadow-lg border border-gray-200 flex items-center">
            <div className="pl-4 text-gray-400">
              <FaSearch />
            </div>
            <input 
              type="text" 
              placeholder="Cari layanan... (misal: KTP, KK, Akta)" 
              className="w-full px-4 py-3 rounded-full outline-none text-gray-700 bg-transparent placeholder-gray-400"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* --- 2. GRID LAYANAN --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredServices.map((item) => (
            <div 
              key={item.id}
              onClick={() => setSelectedService(item)}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${item.color} group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <div className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded-md uppercase">
                  Detail
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        
        {/* Jika tidak ada hasil pencarian */}
        {filteredServices.length === 0 && (
          <div className="text-center text-gray-400 mb-12">
            <p>Layanan yang Anda cari tidak ditemukan.</p>
          </div>
        )}

        {/* --- 3. DOWNLOAD AREA --- */}
        <div className="bg-blue-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          {/* Dekorasi Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl font-bold font-poppins mb-4 flex items-center gap-3">
                <FaDownload /> Pusat Unduhan
              </h3>
              <p className="text-blue-100 mb-6 leading-relaxed text-sm">
                Unduh formulir persyaratan administrasi secara mandiri untuk mempercepat proses pelayanan di kantor kelurahan.
              </p>
            </div>
            <div className="space-y-3">
              {downloadLinks.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white/10 hover:bg-white/20 border border-white/10 p-4 rounded-xl transition cursor-pointer backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <FaFileContract className="text-yellow-400" />
                    <span className="font-medium text-sm">{file.name}</span>
                  </div>
                  <span className="text-xs text-blue-200">{file.size}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* --- 4. MODAL POPUP DETAIL (Overlay) --- */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setSelectedService(null)}>
          <div 
            className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat klik isi modal
          >
            {/* Header Modal */}
            <div className="bg-gray-50 p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${selectedService.color}`}>
                    {selectedService.icon}
                 </div>
                 <h3 className="text-lg font-bold text-gray-800">{selectedService.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedService(null)}
                className="text-gray-400 hover:text-red-500 transition"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Body Modal */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
               <div className="mb-6">
                 <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                   <FaInfoCircle className="text-blue-600" /> Persyaratan Dokumen:
                 </h4>
                 <ul className="space-y-2">
                   {selectedService.syarat.map((req, i) => (
                     <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                       <span className="min-w-[6px] h-[6px] rounded-full bg-blue-400 mt-1.5"></span>
                       {req}
                     </li>
                   ))}
                 </ul>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-blue-500 font-bold mb-1">Estimasi Waktu</p>
                    <p className="text-sm font-bold text-gray-800 flex items-center gap-2">
                      <FaClock /> {selectedService.waktu}
                    </p>
                 </div>
                 <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-xs text-green-600 font-bold mb-1">Biaya Administrasi</p>
                    <p className="text-sm font-bold text-gray-800">
                      {selectedService.biaya}
                    </p>
                 </div>
               </div>
            </div>

            {/* Footer Modal */}
            <div className="p-4 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400">
                Pastikan dokumen Anda lengkap sebelum datang ke kantor kelurahan.
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}