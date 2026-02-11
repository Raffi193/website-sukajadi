'use client';

import { useState } from 'react';
import { FaTasks, FaChevronDown, FaChevronUp, FaGavel, FaFileAlt, FaHandHoldingHeart } from "react-icons/fa";

// Data Tugas Pokok & Fungsi
const tupoksiData = [
  {
    id: 1,
    jabatan: "Lurah",
    icon: <FaGavel />,
    deskripsi: "Memimpin penyelenggaraan pemerintahan kelurahan, melaksanakan pembangunan, pembinaan kemasyarakatan, dan pemberdayaan masyarakat.",
    rincian: [
      "Pelaksanaan kegiatan pemerintahan kelurahan.",
      "Pemberdayaan masyarakat.",
      "Pelayanan masyarakat.",
      "Penyelenggaraan ketenteraman dan ketertiban umum.",
      "Pemeliharaan prasarana dan fasilitas pelayanan umum.",
      "Pembinaan lembaga kemasyarakatan."
    ]
  },
  {
    id: 2,
    jabatan: "Sekretaris Kelurahan",
    icon: <FaFileAlt />,
    deskripsi: "Membantu Lurah dalam bidang administrasi pemerintahan, pembangunan, dan kemasyarakatan serta memberikan pelayanan administratif kepada seluruh perangkat kelurahan.",
    rincian: [
      "Pengelolaan administrasi umum dan kearsipan.",
      "Pengelolaan administrasi kepegawaian.",
      "Pengelolaan administrasi keuangan.",
      "Penyusunan perencanaan dan pelaporan.",
      "Pelaksanaan tugas lain yang diberikan oleh Lurah."
    ]
  },
  {
    id: 3,
    jabatan: "Seksi Pemerintahan",
    icon: <FaTasks />,
    deskripsi: "Membantu Lurah dalam menyiapkan bahan perumusan kebijakan teknis, pelaksanaan, dan pelayanan administrasi di bidang pemerintahan.",
    rincian: [
      "Pelaksanaan administrasi kependudukan (KTP, KK, Kelahiran, Kematian).",
      "Fasilitasi penyelenggaraan pemilihan umum.",
      "Penyusunan monografi dan profil kelurahan.",
      "Pelaksanaan tugas bidang pertanahan."
    ]
  },
  {
    id: 4,
    jabatan: "Seksi Pemberdayaan Masyarakat",
    icon: <FaHandHoldingHeart />,
    deskripsi: "Membantu Lurah dalam menyiapkan bahan perumusan kebijakan teknis dan pelaksanaan pemberdayaan masyarakat.",
    rincian: [
      "Fasilitasi kegiatan lembaga kemasyarakatan (LPMK, PKK, Karang Taruna).",
      "Pembinaan bidang kesehatan dan keluarga berencana.",
      "Pelaksanaan kegiatan sosial kemasyarakatan.",
      "Pemberdayaan ekonomi masyarakat."
    ]
  }
];

export default function TupoksiSection() {
  const [openId, setOpenId] = useState<number | null>(1); // Default item 1 terbuka

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (  
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-end mb-12 border-b border-gray-100 pb-8">
          <div className="max-w-2xl">
             <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">Tanggung Jawab</span>
             <h2 className="text-3xl font-bold text-gray-900 font-poppins mt-2">Tugas Pokok & Fungsi</h2>
             <p className="text-gray-500 mt-2 font-sans">
               Uraian tugas dan wewenang setiap unit kerja dalam memberikan pelayanan prima kepada masyarakat
             </p>
          </div>
        </div>

        {/* Accordion Layout */}
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Kolom Kiri: Ilustrasi / Intro (Opsional) */}
          <div className="lg:col-span-4 bg-blue-50 rounded-2xl p-8 border border-blue-100 h-fit">
            <h3 className="text-xl font-bold text-blue-900 mb-4 font-poppins">Dasar Hukum</h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-6 text-justify">
              Pelaksanaan tugas pokok dan fungsi Pemerintah Kelurahan Sukajadi mengacu pada Peraturan Bupati Kabupaten Banyuasin tentang Susunan Organisasi dan Tata Kerja Pemerintah Kelurahan
            </p>
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-400">
               <p className="text-xs text-gray-500 italic">
                 "Setiap aparatur bekerja sesuai standar operasional prosedur (SOP) demi terciptanya tertib administrasi."
               </p>
            </div>
          </div>

          {/* Kolom Kanan: List Accordion */}
          <div className="lg:col-span-8 space-y-4">
            {tupoksiData.map((item) => (
              <div 
                key={item.id} 
                className={`border rounded-xl transition-all duration-300 ${openId === item.id ? 'border-blue-600 bg-blue-50/30 shadow-md' : 'border-gray-200 bg-white hover:border-blue-300'}`}
              >
                {/* Header Accordion */}
                <button 
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${openId === item.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className={`text-lg font-bold font-poppins ${openId === item.id ? 'text-blue-900' : 'text-gray-700'}`}>
                        {item.jabatan}
                      </h4>
                    </div>
                  </div>
                  {openId === item.id ? <FaChevronUp className="text-blue-600" /> : <FaChevronDown className="text-gray-400" />}
                </button>

                {/* Content Accordion */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openId === item.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-5 pt-0 ml-14 border-t border-dashed border-gray-200 mt-2">
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed mt-4 font-medium">
                      {item.deskripsi}
                    </p>
                    <ul className="list-disc list-outside text-sm text-gray-500 space-y-2 ml-4">
                      {item.rincian.map((tugas, idx) => (
                        <li key={idx}>{tugas}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}