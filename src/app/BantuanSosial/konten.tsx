"use client";

import {
  FaHandHoldingHeart,
  FaUserCheck,
  FaSearch,
  FaQuestionCircle,
  FaExternalLinkAlt,
  FaMoneyBillWave,
  FaMedkit,
  FaGraduationCap,
} from "react-icons/fa";
import { FaBowlRice } from "react-icons/fa6";

export default function BansosSection() {
  // Data Program Bansos
  const programs = [
    {
      title: "PKH (Program Keluarga Harapan)",
      desc: "Bantuan bersyarat untuk keluarga kurang mampu dengan komponen kesehatan, pendidikan, dan kesejahteraan sosial.",
      target: "Ibu Hamil, Balita, Lansia, Disabilitas, Anak Sekolah",
      icon: <FaHandHoldingHeart />,
      color: "bg-pink-100 text-pink-600 border-pink-200",
    },
    {
      title: "BPNT / Sembako",
      desc: "Bantuan Pangan Non Tunai yang disalurkan melalui Kartu Keluarga Sejahtera (KKS) untuk membeli bahan pangan.",
      target: "Keluarga Miskin & Rentan Miskin",
      icon: <FaBowlRice />,
      color: "bg-green-100 text-green-600 border-green-200",
    },
    {
      title: "BLT Dana Desa",
      desc: "Bantuan Langsung Tunai yang bersumber dari Dana Desa untuk warga yang belum tersentuh bantuan pusat.",
      target: "Warga Desa Non-PKH/BPNT yang kehilangan mata pencaharian",
      icon: <FaMoneyBillWave />,
      color: "bg-blue-100 text-blue-600 border-blue-200",
    },
    {
      title: "PBI-JKN (KIS Gratis)",
      desc: "Penerima Bantuan Iuran Jaminan Kesehatan Nasional. Layanan kesehatan gratis dari pemerintah.",
      target: "Masyarakat tidak mampu yang terdata di DTKS",
      icon: <FaMedkit />,
      color: "bg-red-100 text-red-600 border-red-200",
    },
    {
      title: "PIP (Program Indonesia Pintar)",
      desc: "Bantuan uang tunai, perluasan akses, dan kesempatan belajar bagi peserta didik dari keluarga miskin.",
      target: "Siswa SD, SMP, SMA/SMK pemegang KIP",
      icon: <FaGraduationCap />,
      color: "bg-yellow-100 text-yellow-600 border-yellow-200",
    },
  ];

  return (
    <section className="pb-20 bg-gray-50 ">
      <div className="container mx-auto px-4 md:px-16">
        {/* --- 1. WIDGET CEK STATUS (Highlight) --- */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 mb-16 relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full -mr-10 -mt-10 opacity-50"></div>

          <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
            <div>
              <span className="text-blue-600 font-bold tracking-wider text-sm uppercase mb-2 block">
                Transparansi Data
              </span>
              <h2 className="text-3xl font-bold text-gray-900 font-poppins mb-4">
                Cek Penerima Bansos
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Pastikan nama Anda terdaftar sebagai penerima manfaat. Data
                penerima bantuan sosial pusat (PKH, BPNT, BST) mengacu pada Data
                Terpadu Kesejahteraan Sosial (DTKS) Kemensos.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a
                  href="https://cekbansos.kemensos.go.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition shadow-lg hover:-translate-y-1"
                >
                  Cek Portal Kemensos <FaExternalLinkAlt size={12} />
                </a>
                <button className="flex items-center gap-2 bg-white text-gray-700 border border-gray-300 font-bold py-3 px-6 rounded-lg hover:bg-gray-50 transition">
                  <FaSearch size={12} /> Cek BLT Desa (Lokal)
                </button>
              </div>
            </div>

            {/* Box Informasi DTKS */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="font-bold text-blue-900 flex items-center gap-2 mb-3">
                <FaQuestionCircle /> Apa itu DTKS?
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed text-justify mb-4">
                DTKS adalah basis data induk berisi data pemerlu pelayanan
                kesejahteraan sosial. <strong>Wajib masuk DTKS</strong> jika
                ingin mendapatkan bantuan sosial reguler seperti PKH, BPNT, dan
                PBI-JK.
              </p>
              <div className="text-xs text-blue-600 font-semibold bg-white px-3 py-2 rounded inline-block shadow-sm">
                💡 Belum terdaftar? Hubungi Operator Desa.
              </div>
            </div>
          </div>
        </div>

        {/* --- 2. KATALOG PROGRAM --- */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-gray-900 font-poppins">
              Jenis Bantuan Sosial
            </h3>
            <div className="h-1 w-20 bg-blue-600 mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${item.color}`}
                  >
                    {item.icon}
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-800 font-poppins mb-2 group-hover:text-blue-600">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed min-h-[60px]">
                  {item.desc}
                </p>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">
                    Sasaran Penerima:
                  </p>
                  <p className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                    <FaUserCheck className="text-green-500" /> {item.target}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- 3. ALUR PENGAJUAN (Timeline Style) --- */}
        <div className="max-w-4xl mx-auto mb-20">
          <h3 className="text-2xl font-bold text-gray-900 font-poppins mb-8 text-center">
            Alur Pengusulan DTKS Baru
          </h3>

          <div className="grid md:grid-cols-4 gap-4">
            {/* Step 1 */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 text-center relative">
              <div className="w-8 h-8 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center mx-auto mb-3">
                1
              </div>
              <h4 className="font-bold text-gray-800 text-sm mb-2">
                Lapor RT/RW
              </h4>
              <p className="text-xs text-gray-500">
                Membawa KTP & KK untuk surat pengantar.
              </p>
              {/* Arrow Connector (Hidden on Mobile) */}
              <div className="hidden md:block absolute top-9 -right-6 text-gray-300 z-10">
                ➔
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 text-center relative">
              <div className="w-8 h-8 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center mx-auto mb-3">
                2
              </div>
              <h4 className="font-bold text-gray-800 text-sm mb-2">
                Musyawarah Kelurahan
              </h4>
              <p className="text-xs text-gray-500">
                Data dibahas dalam Musyawarah Kelurahan (Muskel).
              </p>
              <div className="hidden md:block absolute top-9 -right-6 text-gray-300 z-10">
                ➔
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 text-center relative">
              <div className="w-8 h-8 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center mx-auto mb-3">
                3
              </div>
              <h4 className="font-bold text-gray-800 text-sm mb-2">
                Verifikasi Dinsos
              </h4>
              <p className="text-xs text-gray-500">
                Data diteruskan ke Dinsos Kabupaten/Kota.
              </p>
              <div className="hidden md:block absolute top-9 -right-6 text-gray-300 z-10">
                ➔
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 text-center relative">
              <div className="w-8 h-8 bg-green-500 text-white font-bold rounded-full flex items-center justify-center mx-auto mb-3">
                4
              </div>
              <h4 className="font-bold text-gray-800 text-sm mb-2">
                Penetapan Kemensos
              </h4>
              <p className="text-xs text-gray-500">
                Masuk DTKS setelah disetujui pusat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
