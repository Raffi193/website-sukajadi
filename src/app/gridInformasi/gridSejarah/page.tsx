"use client";

import TopBar from "@/components/layout/TopBar";
import NavBar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FaQuoteLeft, FaHistory, FaUserTie } from "react-icons/fa";

export default function SejarahSection() {
  // --- DATA 1: TIMELINE SEJARAH (Disesuaikan dengan Periode Pemimpin) ---
  const timelineEvents = [
    {
      year: "1952",
      title: "Era Pemerintahan Marga",
      desc: "Awal mula pencatatan kepemimpinan wilayah di bawah administrasi Pasirah H. Musa Rohim, menandai fondasi pemerintahan lokal yang masih tradisional.",
    },
    {
      year: "1990",
      title: "Transisi ke Desa",
      desc: "Perubahan status administratif dan kepemimpinan dari sistem Pasirah menjadi Kepala Desa (Kades) di bawah pimpinan Drs. Slamet Priyanto.",
    },
    {
      year: "1994",
      title: "Peningkatan Status Kelurahan",
      desc: "Seiring perkembangan wilayah, status administrasi ditingkatkan menjadi Kelurahan yang dipimpin oleh Lurah Tjik Agus Solihin, BA.",
    },
    {
      year: "2010-an",
      title: "Pembangunan Modern",
      desc: "Masa percepatan pembangunan infrastruktur dan fasilitas publik di bawah kepemimpinan Lurah H. Syaiful Anwar, SH dan Haliman Tori, S.Ag.",
    },
    {
      year: "2023",
      title: "Era Inovasi Digital",
      desc: "Di bawah kepemimpinan Lurah Rusdy Bahalwan, S.Sos. M.Si, Kelurahan Sukajadi terus berbenah menuju pelayanan publik yang modern dan adaptif.",
    },
  ];

  // --- DATA 2: DAFTAR PEMIMPIN (Sesuai Data Anda) ---
  const leaders = [
    { no: 1, nama: "H. Musa Rohim", jabatan: "Pasirah", periode: "1952-1990", status: "Selesai" },
    { no: 2, nama: "Drs. Slamet Priyanto", jabatan: "Kades", periode: "1990-1994", status: "Selesai" },
    { no: 3, nama: "Tjik Agus Solihin, BA", jabatan: "Lurah", periode: "1994-1999", status: "Selesai" },
    { no: 4, nama: "Musni Wijaya, S.Sos", jabatan: "Lurah", periode: "1999-2001", status: "Selesai" },
    { no: 5, nama: "Sayusin Sarbi, SH", jabatan: "Lurah", periode: "2001-2005", status: "Selesai" },
    { no: 6, nama: "Meizar, S.Sos", jabatan: "Lurah", periode: "2005-2009", status: "Selesai" },
    { no: 7, nama: "Drs. Oktavianus, R.AM", jabatan: "Lurah", periode: "2009-2013", status: "Selesai" },
    { no: 8, nama: "H. Syaiful Anwar, SH", jabatan: "Lurah", periode: "2013-2017", status: "Selesai" },
    { no: 9, nama: "Haliman Tori, S.Ag", jabatan: "Lurah", periode: "2017-2023", status: "Selesai" },
    { no: 10, nama: "Rusdy Bahalwan, S.Sos. M.Si", jabatan: "Lurah", periode: "2023-Sekarang", status: "Aktif" },
  ];

  return (
    <>
      <TopBar />
      <NavBar />

      <section className="py-12 mb-30 bg-white">
        <div className="container mx-auto px-4 md:px-16">
          
          {/* ================= BAGIAN 1: NARASI & FILOSOFI ================= */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            {/* Gambar Ilustrasi */}
            <div className="relative h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-xl rotate-1 hover:rotate-0 transition-transform duration-500 group bg-gray-200">
              {/* Placeholder untuk gambar sejarah */}
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-800 to-gray-400 flex items-center justify-center">
                 <FaHistory className="text-white/20 text-9xl" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white text-sm italic">
                  "Menelusuri jejak langkah pembangunan Kelurahan Sukajadi"
                </p>
              </div>
            </div>

            {/* Teks Narasi */}
            <div>
              <span className="text-blue-600 font-bold tracking-wider text-sm uppercase flex items-center gap-2">
                <FaHistory /> Napak Tilas
              </span>
              <h2 className="text-3xl md:text-3xl font-semibold text-gray-800 font-poppins mt-3 mb-6">
                Sejarah & <span className="text-gray-800">Perkembangan</span>
              </h2>

              <div className="prose text-gray-600 leading-relaxed text-justify mb-8 font-sans">
                <p className="mb-4">
                  Sejarah kepemimpinan di wilayah Sukajadi telah tercatat rapi sejak tahun 1952. 
                  Dimulai dari era kepemimpinan Marga yang dipimpin oleh seorang Pasirah, 
                  wilayah ini terus mengalami transformasi administratif yang dinamis.
                </p>
                <p>
                  Perubahan status dari Desa menjadi Kelurahan menandai percepatan pembangunan 
                  dan kompleksitas pelayanan publik. Setiap pemimpin telah menorehkan tinta emas 
                  dalam membangun fondasi masyarakat Sukajadi yang rukun, maju, dan sejahtera 
                  hingga saat ini.
                </p>
              </div>

              {/* Box Quote / Filosofi */}
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl relative">
                <FaQuoteLeft className="absolute top-4 right-4 text-blue-200 text-4xl" />
                <h4 className="font-bold text-blue-900 text-lg mb-2 font-poppins">
                   Komitmen Pelayanan
                </h4>
                <p className="text-sm text-gray-700 italic font-sans">
                  <em>
                    "Dari masa Pasirah hingga Lurah masa kini, semangat pengabdian kepada 
                    masyarakat Sukajadi terus menyala, beradaptasi dengan tantangan zaman 
                    demi kemajuan bersama."
                  </em>
                </p>
              </div>
            </div>
          </div>

          {/* ================= BAGIAN 2: TIMELINE (GARIS WAKTU) ================= */}
          <div className="max-w-4xl mx-auto mb-24">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 font-poppins">
                Jejak Langkah Perjalanan
              </h3>
              <div className="h-1 w-20 bg-blue-600 mx-auto mt-3 rounded-full"></div>
            </div>

            <div className="relative border-l-4 border-blue-100 ml-3 md:ml-6 space-y-10">
              {timelineEvents.map((event, index) => (
                <div key={index} className="relative pl-8 md:pl-12 group">
                  {/* Dot Penanda */}
                  <div className="absolute -left-[10px] top-1 w-5 h-5 bg-blue-600 rounded-full border-4 border-white shadow-md group-hover:scale-125 transition-transform"></div>

                  {/* Konten Timeline */}
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-2">
                      {event.year}
                    </span>
                    <h4 className="text-lg font-bold text-gray-800 font-poppins mb-2 group-hover:text-blue-600 transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed font-sans">
                      {event.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= BAGIAN 3: TABEL PEMIMPIN ================= */}
          <div className="bg-gray-50 rounded-3xl p-2 md:p-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">
                Dedikasi
              </span>
              <h2 className="text-3xl font-semibold text-gray-900 font-poppins mt-2">
                Pemimpin Dari Masa ke Masa
              </h2>
              <p className="text-gray-500 mt-2 text-sm font-sans">
                Urutan Pasirah, Kepala Desa, dan Lurah yang memerintah Wilayah Kelurahan Sukajadi.
              </p>
            </div>

            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-blue-900 text-white">
                      <th className="p-4 font-semibold text-sm uppercase tracking-wider w-16 text-center font-poppins">
                        No
                      </th>
                      <th className="p-4 font-semibold text-sm uppercase tracking-wider font-poppins">
                        Nama Pejabat
                      </th>
                      <th className="p-4 font-semibold text-sm uppercase tracking-wider font-poppins">
                        Jabatan
                      </th>
                      <th className="p-4 font-semibold text-sm uppercase tracking-wider font-poppins">
                        Periode
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {leaders.map((leader) => (
                      <tr
                        key={leader.no}
                        className={`transition-colors ${
                            leader.status === 'Aktif' 
                            ? "bg-blue-50/60 hover:bg-blue-100/50" 
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <td className="p-4 text-gray-500 font-medium text-center text-sm">
                          {leader.no}
                        </td>
                        <td className="p-4 text-gray-800 font-medium flex items-center gap-3 font-sans">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                              leader.status === 'Aktif' ? "bg-blue-200 text-blue-700" : "bg-gray-100 text-gray-400"
                          }`}>
                            <FaUserTie size={14} />
                          </div>
                          <div>
                              <span className={`block ${leader.status === 'Aktif' ? 'text-blue-800 font-bold' : ''}`}>
                                  {leader.nama}
                              </span>
                              {leader.status === 'Aktif' && (
                                  <span className="inline-block px-2 py-0.5 text-[10px] font-bold bg-green-100 text-green-700 rounded-full">
                                      Sedang Menjabat
                                  </span>
                              )}
                          </div>
                        </td>
                        <td className="p-4 text-gray-600 text-sm font-sans">
                           <span className={`px-2 py-1 rounded text-xs font-semibold ${
                               leader.jabatan === 'Pasirah' ? 'bg-amber-100 text-amber-800' :
                               leader.jabatan === 'Kades' ? 'bg-orange-100 text-orange-800' :
                               'bg-blue-100 text-blue-800'
                           }`}>
                               {leader.jabatan}
                           </span>
                        </td>
                        <td className="p-4 text-gray-600 text-sm font-mono font-medium">
                          {leader.periode}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}