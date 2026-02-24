import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUserTie,
  FaArrowLeft,
  FaInfoCircle,
  FaTag,
} from "react-icons/fa";
import Link from "next/link";

export default async function AgendaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // 1. Await params agar slug bisa terbaca sebagai string
  const { slug } = await params;

  // 2. Ambil data lengkap dari database
  const agenda = await prisma.agenda.findUnique({
    where: { slug: slug },
    include: { author: true },
  });

  if (!agenda) {
    notFound();
  }

  // Helper format tanggal Indonesia
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      <TopBar />
      <Navbar />
      <main className="bg-gray-50 min-h-screen py-10 font-sans">
        <div className="container mx-auto px-4 max-w-5xl mb-30">
          {/* Tombol Kembali & Breadcrumb */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/agenda"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"
            >
              <FaArrowLeft size={14} /> Kembali ke Daftar Agenda
            </Link>
            <div className="hidden md:block text-xs text-gray-400">
              Dipublikasikan oleh: {agenda.author?.name || "Administrator"}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            {/* 1. Header: Gambar Utama / Poster */}
            {/* 1. Header: Gambar Utama / Poster - Ukuran Diperbaiki */}
            <div className="relative w-full h-[250px] md:h-[400px] bg-gray-100 border-b border-gray-100 group overflow-hidden">
              {agenda.thumbnail ? (
                <>
                  {/* Background Blur (Efek estetik di belakang gambar utama) */}
                  <div
                    className="absolute inset-0 bg-cover bg-center blur-xl opacity-50 scale-110"
                    style={{ backgroundImage: `url(${agenda.thumbnail})` }}
                  />

                  {/* Gambar Utama (Contain agar tidak terpotong, atau Cover jika ingin full) */}
                  {/* Menggunakan object-contain agar poster full terlihat tanpa terpotong */}
                  <img
                    src={agenda.thumbnail}
                    alt={agenda.judul}
                    className="relative w-full h-full object-contain z-10 transition-transform duration-700 group-hover:scale-105"
                  />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full bg-blue-50 text-blue-200">
                  <FaCalendarAlt size={64} />
                  <p className="mt-4 font-bold text-sm">
                    Poster Belum Tersedia
                  </p>
                </div>
              )}

              {/* Badge Kategori - Posisi diperbaiki */}
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-white/90 backdrop-blur-md text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1.5 border border-blue-100">
                  <FaTag size={10} /> {agenda.jenis.replace("_", " ")}
                </span>
              </div>
            </div>

            {/* 2. Konten Utama */}
            <div className="p-6 md:p-12">
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Kolom Kiri: Judul & Deskripsi */}
                <div className="lg:col-span-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    {agenda.judul}
                  </h1>

                  <div className="flex items-center gap-3 mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600">
                      <FaUserTie size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                        Penyelenggara
                      </p>
                      <p className="text-gray-800 font-semibold">
                        {agenda.penyelenggara || "Pemerintah Kelurahan"}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaInfoCircle className="text-blue-500" /> Detail Kegiatan
                  </h3>
                  <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed whitespace-pre-line text-lg">
                    {agenda.deskripsi}
                  </div>
                </div>

                {/* Kolom Kanan: Sidebar Informasi Waktu & Lokasi */}
                <div className="space-y-6">
                  <div className="bg-blue-50/50 rounded-3xl p-8 border border-blue-100 sticky top-10">
                    <h4 className="text-gray-900 font-bold mb-6 text-lg border-b border-blue-100 pb-4">
                      Waktu & Tempat
                    </h4>

                    <div className="space-y-6">
                      {/* Tanggal Pelaksanaan */}
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600 shrink-0">
                          <FaCalendarAlt size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">
                            Tanggal
                          </p>
                          <p className="text-gray-800 font-bold text-sm leading-tight">
                            {formatDate(agenda.tanggalMulai)}
                          </p>
                          {agenda.tanggalSelesai && (
                            <p className="text-xs text-gray-500 mt-1 italic font-medium">
                              s/d {formatDate(agenda.tanggalSelesai)}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Jam Pelaksanaan */}
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-orange-500 shrink-0">
                          <FaClock size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">
                            Waktu
                          </p>
                          <p className="text-gray-800 font-bold text-sm">
                            {agenda.waktuMulai}{" "}
                            {agenda.waktuSelesai
                              ? `- ${agenda.waktuSelesai}`
                              : ""}{" "}
                            WIB
                          </p>
                        </div>
                      </div>

                      {/* Lokasi */}
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-red-500 shrink-0">
                          <FaMapMarkerAlt size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">
                            Lokasi
                          </p>
                          <p className="text-gray-800 font-bold text-sm leading-tight">
                            {agenda.lokasi}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-blue-100">
                      <p className="text-[10px] text-center text-gray-400 italic">
                        *Harap datang tepat waktu sesuai jadwal yang tertera.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
