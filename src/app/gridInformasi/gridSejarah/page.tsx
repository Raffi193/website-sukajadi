"use client";

import TopBar from "@/components/layout/TopBar";
import NavBar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { FaQuoteLeft, FaHistory, FaUserTie } from "react-icons/fa";

export default function SejarahSection() {
  // --- DATA 1: TIMELINE SEJARAH ---
  const timelineEvents = [
    {
      year: "1980",
      title: "Era Marga Talang Kelapa",
      desc: "Wilayah ini masih berupa hamparan perkebunan karet dan pemukiman kecil yang masuk dalam administrasi Marga Talang Kelapa.",
    },
    {
      year: "1985",
      title: "Pembentukan Resmi",
      desc: "Berdasarkan Perda Kota Palembang No. 12 Tahun 1985, Kelurahan Sukajadi resmi dibentuk sebagai pemekaran wilayah.",
    },
    {
      year: "1998",
      title: "Pembangunan Infrastruktur",
      desc: "Dimulainya pengaspalan jalan poros utama dan pembangunan gedung kantor kelurahan permanen pertama.",
    },
    {
      year: "2010",
      title: "Transformasi Kawasan",
      desc: "Perubahan status dari kawasan pinggiran menjadi kawasan penyangga kota dengan tumbuhnya perumahan komersial.",
    },
    {
      year: "2024",
      title: "Era Digitalisasi",
      desc: "Penerapan sistem pelayanan berbasis digital untuk memudahkan administrasi warga Kelurahan Sukajadi.",
    },
  ];

  // --- DATA 2: DAFTAR MANTAN LURAH ---
  const leaders = [
    {
      periode: "1985 - 1990",
      nama: "H. Abdullah Sani",
      ket: "Lurah Pertama (Pjs)",
    },
    { periode: "1990 - 1998", nama: "Drs. M. Yamin", ket: "Lurah Definitif" },
    { periode: "1998 - 2005", nama: "R. Soeprapto", ket: "Lurah" },
    { periode: "2005 - 2015", nama: "Hj. Nurhasanah, S.Sos", ket: "Lurah" },
    { periode: "2015 - 2020", nama: "Bambang Irawan, SE", ket: "Lurah" },
    {
      periode: "2020 - Sekarang",
      nama: "H. Ahmad Fauzi, S.IP, M.Si",
      ket: "Lurah Petahana",
    },
  ];

  return (
    <>
      <TopBar />
      <NavBar />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-16">
          {/* ================= BAGIAN 1: NARASI & FILOSOFI ================= */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            {/* Gambar Ilustrasi */}
            <div className="relative h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-xl rotate-1 hover:rotate-0 transition-transform duration-500 group">
              <Image
                src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1000&auto=format&fit=crop"
                alt="Sejarah Tempo Dulu"
                fill
                className="object-cover sepia-[.3] group-hover:sepia-0 transition-all duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white text-sm italic">
                  "Suasana Kelurahan Sukajadi di masa lampau"
                </p>
              </div>
            </div>

            {/* Teks Narasi */}
            <div>
              <span className="text-blue-600 font-bold tracking-wider text-sm uppercase flex items-center gap-2">
                <FaHistory /> Napak Tilas
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-poppins mt-3 mb-6">
                Asal Usul & <span className="text-blue-600">Filosofi Nama</span>
              </h2>

              <div className="prose text-gray-600 leading-relaxed text-justify mb-8 font-sans">
                <p className="mb-4">
                  Cikal bakal Kelurahan Sukajadi tidak terlepas dari sejarah
                  perkembangan wilayah Kota Palembang bagian utara. Pada
                  mulanya, kawasan ini adalah area perkebunan rakyat yang subur
                  dan asri.
                </p>
                <p>
                  Seiring berjalannya waktu, para pendatang mulai menetap dan
                  membangun komunitas yang guyub. Semangat gotong royong yang
                  kuat menjadi ciri khas masyarakat setempat sejak dahulu kala.
                </p>
              </div>

              {/* Box Filosofi */}
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl relative">
                <FaQuoteLeft className="absolute top-4 right-4 text-blue-200 text-4xl" />
                <h4 className="font-bold text-blue-900 text-lg mb-2 font-poppins">
                  Mengapa "Sukajadi"?
                </h4>
                <p className="text-sm text-gray-700 italic font-sans">
                  Konon, nama <strong>"Sukajadi"</strong> diambil dari harapan
                  para sesepuh desa. Kata <strong>"Suka"</strong> berarti
                  dicintai atau disenangi, dan <strong>"Jadi"</strong> berarti
                  terwujud. Dimaknai sebagai{" "}
                  <em>
                    "Tempat yang disenangi di mana segala harapan baik dapat
                    terwujud."
                  </em>
                </p>
              </div>
            </div>
          </div>

          {/* ================= BAGIAN 2: TIMELINE (GARIS WAKTU) ================= */}
          <div className="max-w-4xl mx-auto mb-24">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 font-poppins">
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
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">
                Dedikasi
              </span>
              <h2 className="text-3xl font-bold text-gray-900 font-poppins mt-2">
                Pemimpin Dari Masa ke Masa
              </h2>
              <p className="text-gray-500 mt-2 text-sm font-sans">
                Penghormatan kepada para Lurah yang telah mengabdi.
              </p>
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-blue-900 text-white">
                      <th className="p-4 font-semibold text-sm uppercase tracking-wider w-1/4 font-poppins">
                        Periode
                      </th>
                      <th className="p-4 font-semibold text-sm uppercase tracking-wider w-1/2 font-poppins">
                        Nama Pejabat
                      </th>
                      <th className="p-4 font-semibold text-sm uppercase tracking-wider w-1/4 font-poppins">
                        Keterangan
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {leaders.map((leader, index) => (
                      <tr
                        key={index}
                        className="hover:bg-blue-50 transition-colors"
                      >
                        <td className="p-4 text-blue-600 font-bold font-mono text-sm">
                          {leader.periode}
                        </td>
                        <td className="p-4 text-gray-800 font-medium flex items-center gap-3 font-sans">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
                            <FaUserTie />
                          </div>
                          {leader.nama}
                        </td>
                        <td className="p-4 text-gray-500 text-sm font-sans">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${leader.ket.includes("Petahana") ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}
                          >
                            {leader.ket}
                          </span>
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
