"use client";

import { useState } from "react";
import { 
  FaUserTie, 
  FaUsers, 
  FaHandHoldingHeart, 
  FaShieldAlt, 
  FaLandmark, 
  FaChild,
  FaChevronRight,
  FaBuilding
} from "react-icons/fa";

// --- DATA STATIS (Berdasarkan Input Anda) ---

const PEJABAT_KELURAHAN = [
  { nama: "Rusdy Bahalwan, S.Sos. M.Si", jabatan: "Lurah", nip: "-" },
  { nama: "Nani Noviana, A.Md", jabatan: "Sekretaris Lurah", nip: "-" },
  { nama: "Yuyun Novita, SE. M.Si", jabatan: "Kasi PMD", nip: "-" },
  { nama: "Iskandar, ST", jabatan: "Kasi Trantib", nip: "-" },
  { nama: "Ahmadi, SH", jabatan: "Plt. Kasi Pemerintahan", nip: "-" },
];

const DATA_RW = [
  { no: 1, nama: "Muslim Ansori, SH", jabatan: "Ketua RW.01" },
  { no: 2, nama: "Asnawi", jabatan: "Ketua RW.02" },
  { no: 3, nama: "Yohan Aidi, AS", jabatan: "Ketua RW.03" },
  { no: 4, nama: "Sataruddin", jabatan: "Ketua RW.04" },
  { no: 5, nama: "Abdul Haris, S.Pd", jabatan: "Ketua RW.05" },
];

const DATA_RT = [
  { rt: "01", nama: "Berlian" }, { rt: "02", nama: "Ansori Yunus, SE" },
  { rt: "03", nama: "H. Dasril AR" }, { rt: "04", nama: "Rizsan Bitonda Al Affif" },
  { rt: "05", nama: "Firdaus" }, { rt: "06", nama: "Rahmadikrom, S.Pd.I" },
  { rt: "07", nama: "Rusli Effendi" }, { rt: "08", nama: "Warsono" },
  { rt: "09", nama: "Heri Gunawan" }, { rt: "10", nama: "Subejo" },
  { rt: "11", nama: "Faridah" }, { rt: "12", nama: "Indra Gunawan" },
  { rt: "13", nama: "Abdus Salam" }, { rt: "14", nama: "Yeri Koes Endang" },
  { rt: "15", nama: "Sunawi" }, { rt: "16", nama: "Sri Wahyuni" },
  { rt: "17", nama: "Denny Subastian" }, { rt: "18", nama: "Suyono" },
  { rt: "19", nama: "Sugianto" }, { rt: "20", nama: "Saripuddin" },
  { rt: "21", nama: "Debbi Ramdoni" }, { rt: "22", nama: "Drs. M. Jundi" },
  { rt: "23", nama: "Edi Susanto" }, { rt: "24", nama: "Hendrizal" },
  { rt: "25", nama: "Sunardi" }, { rt: "26", nama: "Sifta Ariani" },
  { rt: "27", nama: "M. Rohali" }, { rt: "28", nama: "Gunawan" },
  { rt: "29", nama: "Halil" }, { rt: "30", nama: "Darwin" },
  { rt: "31", nama: "Apri Santoso" }, { rt: "32", nama: "Adi Suwanto" },
  { rt: "33", nama: "Yanto Dahlan" }, { rt: "34", nama: "Fran Iswanto" },
];

const DATA_LPM = [
  { nama: "Ary Sopian, SH.i, ME. MM", jabatan: "Ketua" },
  { nama: "Sakroni", jabatan: "Wakil Ketua" },
  { nama: "Abbas", jabatan: "Sekretaris" },
  { nama: "Siska Arinda", jabatan: "Wakil Sekretaris" },
  { nama: "Ayu Dea Intan Perdana", jabatan: "Bendahara" },
  // ... (Data seksi bisa ditambahkan atau diringkas jika terlalu panjang)
];

const DATA_PKK_INTI = [
  { nama: "Tin Afpriani", jabatan: "Ketua" },
  { nama: "Nani Noviana, A.Md", jabatan: "Wakil Ketua" },
  { nama: "Yuyun Novita, SE. M.Si", jabatan: "Sekretaris" },
  { nama: "Hartini", jabatan: "Bendahara" },
];

const DATA_LINMAS = [
  { no: 1, nama: "Andi A Rahman", alamat: "RT.02 RW.01", hp: "0896-6793-2925" },
  { no: 2, nama: "Syakroni", alamat: "RT.02 RW.01", hp: "0813-7388-2191" },
  { no: 3, nama: "Sunarto", alamat: "RT.02 RW.01", hp: "0896-3741-9373" },
  { no: 4, nama: "Feri Wirayana", alamat: "RT.04 RW.01", hp: "0898-8654-895" },
  { no: 5, nama: "Abbas", alamat: "RT.41 RW.23", hp: "0823-7676-7722" },
  { no: 6, nama: "Joko Rianto", alamat: "RT.02 RW.01", hp: "0812-6202-2230" },
  { no: 7, nama: "Suhud Sobarna", alamat: "RT.02 RW.01", hp: "0813-6831-6355" },
  { no: 8, nama: "M. Syattoni Ismail", alamat: "RT.04 RW.01", hp: "0813-6969-6355" },
  { no: 9, nama: "Rusdy Bahalwan", alamat: "RT.04 RW.01", hp: "0813-6750-4543" },
  { no: 10, nama: "Ruslan Ependi", alamat: "RT.04 RW.01", hp: "0853-6801-5363" },
];

const DATA_ADAT = [
  { nama: "Halimantori, S.Ag", jabatan: "Pemangku Adat" },
  { nama: "H. Dasri Ar", jabatan: "Pemangku Adat" },
  { nama: "Choirudin", jabatan: "Pemangku Adat" },
  { nama: "Muslim Ansori, SH", jabatan: "Pemangku Adat" },
  { nama: "Nasihin", jabatan: "Pemangku Adat" },
];

const DATA_KARANG_TARUNA = [
  { nama: "M Fahrul Fauzi, SP", jabatan: "Ketua" },
  { nama: "Suparjo, S.Pd.I", jabatan: "Wakil Ketua" },
  { nama: "Joko Rianto, SH", jabatan: "Sekretaris" },
  { nama: "Diny Tria Pitaloka", jabatan: "Bendahara" },
];

// --- SUB-COMPONENTS ---

const TabButton = ({ active, label, icon, onClick }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap
      ${active 
        ? "bg-blue-600 text-white shadow-lg scale-105" 
        : "bg-white text-gray-500 border border-gray-100 hover:bg-gray-50 hover:text-blue-600"}
    `}
  >
    {icon}
    {label}
  </button>
);

const CardPerson = ({ nama, jabatan, subtext }: any) => (
  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
      <FaUserTie />
    </div>
    <div>
      <h4 className="font-bold text-gray-800 text-sm md:text-base">{nama}</h4>
      <p className="text-xs text-blue-600 font-bold uppercase">{jabatan}</p>
      {subtext && <p className="text-xs text-gray-400">{subtext}</p>}
    </div>
  </div>
);

// --- MAIN COMPONENT ---

export default function KelembagaanSection() {
  const [activeTab, setActiveTab] = useState("pemerintahan");

  return (
    <section className="mb-50 pt-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-14">
        
        {/* Header */}
        <div className="text-left mb-12 px-2">
          <span className="text-blue-600 font-bold tracking-wider text-sm uppercase bg-blue-50 py-1 rounded-full">
            Struktur & Kelembagaan
          </span>
          <h2 className="text-3xl md:text-3xl font-semibold text-gray-800 font-poppins mt-2">
            Kelembagaan <span className="text-gray-800">Kelurahan Sukajadi</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl">
            Daftar lengkap pejabat pemerintahan, pengurus RT/RW, dan lembaga kemasyarakatan yang bersinergi membangun kelurahan.
          </p>
        </div>

        {/* Tab Navigation (Scrollable on Mobile) */}
        <div className="flex overflow-x-auto pb-4 gap-3 justify-start md:justify-center mb-10 no-scrollbar">
          <TabButton 
            active={activeTab === "pemerintahan"} 
            label="Pemerintahan & RT/RW" 
            icon={<FaBuilding />} 
            onClick={() => setActiveTab("pemerintahan")} 
          />
          <TabButton 
            active={activeTab === "lpm"} 
            label="LPM" 
            icon={<FaUsers />} 
            onClick={() => setActiveTab("lpm")} 
          />
          <TabButton 
            active={activeTab === "pkk"} 
            label="PKK" 
            icon={<FaHandHoldingHeart />} 
            onClick={() => setActiveTab("pkk")} 
          />
          <TabButton 
            active={activeTab === "linmas"} 
            label="Linmas & Adat" 
            icon={<FaShieldAlt />} 
            onClick={() => setActiveTab("linmas")} 
          />
          <TabButton 
            active={activeTab === "kt"} 
            label="Karang Taruna" 
            icon={<FaChild />} 
            onClick={() => setActiveTab("kt")} 
          />
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100 min-h-[500px]">
          
          {/* 1. PEMERINTAHAN & RT/RW */}
          {activeTab === "pemerintahan" && (
            <div className="space-y-12 animate-fade-in">
              {/* Pejabat Kelurahan */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-2">
                  <FaLandmark className="text-blue-600" /> Pejabat Kelurahan (2024)
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {PEJABAT_KELURAHAN.map((item, idx) => (
                    <CardPerson key={idx} {...item} />
                  ))}
                </div>
              </div>

              {/* Daftar RW */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-2">
                  <FaUsers className="text-blue-600" /> Ketua RW
                </h3>
                <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {DATA_RW.map((item, idx) => (
                    <div key={idx} className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100">
                      <div className="text-2xl font-bold text-blue-200 mb-2">RW {item.no}</div>
                      <h4 className="font-bold text-gray-800 text-sm">{item.nama}</h4>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daftar RT */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-2">
                  <FaUsers className="text-blue-600" /> Ketua RT Se-Kelurahan
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {DATA_RT.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200 hover:bg-white hover:shadow-md transition-all">
                      <span className="font-bold text-gray-700 text-sm">{item.nama}</span>
                      <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">RT {item.rt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. LPM */}
          {activeTab === "lpm" && (
            <div className="animate-fade-in">
              <div className="bg-blue-50 p-6 rounded-2xl mb-8 border border-blue-100">
                <h3 className="text-lg font-bold text-blue-900 mb-2">Tentang LPM</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Lembaga Pemberdayaan Masyarakat (LPM) adalah mitra Pemerintah Kelurahan dalam menampung dan menyalurkan aspirasi masyarakat serta menyusun rencana pembangunan secara partisipatif.
                </p>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Pengurus LPM (2022-2027)</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {DATA_LPM.map((item, idx) => (
                    <CardPerson key={idx} {...item} />
                 ))}
                 <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm">
                    + Anggota Seksi Lainnya
                 </div>
              </div>
            </div>
          )}

          {/* 3. PKK */}
          {activeTab === "pkk" && (
            <div className="animate-fade-in">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="md:col-span-2">
                   <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Pengurus Inti TP-PKK</h3>
                   <div className="grid sm:grid-cols-2 gap-4">
                      {DATA_PKK_INTI.map((item, idx) => (
                        <CardPerson key={idx} {...item} />
                      ))}
                   </div>
                </div>
                <div className="bg-pink-50 p-6 rounded-2xl border border-pink-100">
                  <h4 className="font-bold text-pink-700 mb-3">10 Program Pokok PKK</h4>
                  <ul className="text-sm text-gray-700 space-y-1 list-disc pl-4">
                    <li>Penghayatan Pancasila</li>
                    <li>Gotong Royong</li>
                    <li>Pangan & Sandang</li>
                    <li>Perumahan & Tata Laksana</li>
                    <li>Pendidikan & Keterampilan</li>
                    <li>Kesehatan</li>
                    <li>Pengembangan Koperasi</li>
                    <li>Lingkungan Hidup</li>
                    <li>Perencanaan Sehat</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Kelompok Kerja (Pokja)</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                {["Pokja I (Pengajian)", "Pokja II (Pendidikan)", "Pokja III (Keterampilan)", "Pokja IV (Kesehatan)"].map((pokja, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200 font-bold text-center text-gray-700">
                    {pokja}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. LINMAS & ADAT */}
          {activeTab === "linmas" && (
            <div className="animate-fade-in space-y-10">
              
              {/* Linmas Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-2">
                  <FaShieldAlt className="text-green-600" /> Satuan Linmas / Hansip
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-600">
                    <thead className="bg-gray-50 text-gray-800 uppercase font-bold text-xs">
                      <tr>
                        <th className="px-4 py-3 rounded-tl-lg">Nama</th>
                        <th className="px-4 py-3">Alamat</th>
                        <th className="px-4 py-3 rounded-tr-lg">Kontak</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DATA_LINMAS.map((item, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-3 font-bold">{item.nama}</td>
                          <td className="px-4 py-3">{item.alamat}</td>
                          <td className="px-4 py-3 font-mono text-xs">{item.hp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pemangku Adat Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-2">
                  <FaUserTie className="text-yellow-600" /> Pemangku Adat
                </h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                   {DATA_ADAT.map((item, idx) => (
                      <div key={idx} className="bg-yellow-50/50 p-4 rounded-xl border border-yellow-100 flex items-center gap-3">
                         <div className="w-10 h-10 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center">
                            <FaLandmark size={14} />
                         </div>
                         <div className="font-bold text-gray-800">{item.nama}</div>
                      </div>
                   ))}
                </div>
              </div>

            </div>
          )}

          {/* 5. KARANG TARUNA */}
          {activeTab === "kt" && (
            <div className="animate-fade-in">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Pengurus Karang Taruna</h3>
                  <div className="space-y-4">
                     {DATA_KARANG_TARUNA.map((item, idx) => (
                        <CardPerson key={idx} {...item} />
                     ))}
                  </div>
                </div>
                <div className="flex-1">
                   <div className="bg-blue-600 text-white p-8 rounded-3xl relative overflow-hidden">
                      <div className="relative z-10">
                        <h4 className="text-2xl font-bold mb-4">Pemuda Berkarya</h4>
                        <p className="text-blue-100 mb-6">
                           Karang Taruna Kelurahan Sukajadi aktif dalam berbagai bidang:
                        </p>
                        <ul className="space-y-2 font-medium">
                           {[
                             "Bidang Olahraga (Fauzan)", 
                             "Bidang UMKM (Fitri Wahyu Lestari)", 
                             "Bidang Humas (Ansyori Yunus)", 
                             "Bidang Keagamaan (Zainal Abidin)"
                           ].map((bid, i) => (
                             <li key={i} className="flex items-center gap-2">
                               <FaChevronRight size={12} className="text-yellow-400" /> {bid}
                             </li>
                           ))}
                        </ul>
                      </div>
                      {/* Dekorasi */}
                      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
                   </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}