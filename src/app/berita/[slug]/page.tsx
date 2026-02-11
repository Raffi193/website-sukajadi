import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  FaUser,
  FaCalendar,
  FaTag,
  FaArrowLeft,
  FaShareAlt,
} from "react-icons/fa";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/Navbar";
import TopBar from "@/components/layout/TopBar";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const berita = await prisma.berita.findUnique({
    where: { slug },
    select: { judul: true },
  });
  return {
    title: berita
      ? `${berita.judul} - Kelurahan Sukajadi`
      : "Berita Tidak Ditemukan",
  };
}

export default async function DetailBeritaPage({ params }: Props) {
  const { slug } = await params;

  // 1. QUERY UTAMA
  const berita = await prisma.berita.findUnique({
    where: { slug },
    include: {
      author: { select: { name: true } },
      kategori: { select: { nama: true, id: true, slug: true } },
    },
  });

  if (!berita) {
    return notFound();
  }

  // 2. QUERY BERITA TERKAIT
  const beritaTerkait = await prisma.berita.findMany({
    where: {
      kategoriId: berita.kategoriId,
      id: { not: berita.id },
      isPublished: true,
    },
    take: 4,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      judul: true,
      slug: true,
      thumbnail: true,
      createdAt: true,
    },
  });

  return (
    <>
      <TopBar />
      <NavBar />
      <div className="container bg-white min-h-screen pb-20 pt-10 mb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb Sederhana */}
          <div className="mb-8 flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">
              Beranda
            </Link>
            <span className="mx-2">/</span>
            <Link href="/berita" className="hover:text-blue-600">
              Berita
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">
              {berita.kategori.nama}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* ================= KOLOM KIRI: KONTEN UTAMA ================= */}
            <div className="lg:col-span-2">
              <article>
                {/* --- BAGIAN HEADER (JUDUL & INFO) --- */}
                <header className="mb-8 border-b border-gray-100 pb-8">
                  {/* Kategori Badge */}
                  <div className="mb-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1">
                      {berita.kategori.nama}
                    </span>
                  </div>

                  {/* Judul Besar */}
                  <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                    {berita.judul}
                  </h1>

                  {/* Info Penulis & Tanggal */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                          <FaUser />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">
                            {berita.author?.name || "Tim Redaksi"}
                          </p>
                          <p className="text-xs">
                            {format(
                              new Date(berita.createdAt),
                              "EEEE, dd MMMM yyyy - HH:mm",
                              { locale: id },
                            )}{" "}
                            WIB
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tombol Share (Hiasan) */}
                    <button className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <FaShareAlt />{" "}
                      <span className="text-xs font-semibold">Bagikan</span>
                    </button>
                  </div>
                </header>

                {/* --- GAMBAR UTAMA (Sekarang di bawah Judul) --- */}
                {berita.thumbnail && (
                  <figure className="w-full mb-10">
                    <div className="aspect-video relative rounded-xl overflow-hidden bg-gray-100 shadow-sm">
                      <img
                        src={berita.thumbnail}
                        alt={berita.judul}
                        className="w-full h-full object-cover"
                        loading="eager"
                      />
                    </div>
                    <figcaption className="mt-3 text-center text-xs text-gray-400 italic">
                      {/* Caption gambar default jika tidak ada kolom caption khusus */}
                      Dokumentasi Kegiatan Kelurahan Sukajadi
                    </figcaption>
                  </figure>
                )}

                {/* --- ISI BERITA --- */}
                <div
                  className="prose prose-lg prose-blue max-w-none text-gray-800 leading-relaxed break-words overflow-hidden"
                dangerouslySetInnerHTML={{ __html: berita.konten }}
                />

                {/* Tags Section (Opsional) */}
                <div className="mt-10 pt-6 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-bold text-gray-700 mr-2">
                      Topik:
                    </span>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm hover:bg-gray-200 cursor-pointer transition">
                      #KelurahanSukajadi
                    </span>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm hover:bg-gray-200 cursor-pointer transition">
                      #{berita.kategori.nama.replace(/\s+/g, "")}
                    </span>
                  </div>
                </div>
              </article>
            </div>

            {/* ================= KOLOM KANAN: SIDEBAR ================= */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Widget: Berita Terkait */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                    Berita Terkait
                  </h3>

                  <div className="flex flex-col gap-6">
                    {beritaTerkait.length > 0 ? (
                      beritaTerkait.map((item) => (
                        <Link
                          href={`/berita/${item.slug}`}
                          key={item.id}
                          className="group flex gap-4 items-start"
                        >
                          {/* Thumbnail Kecil */}
                          <div className="w-24 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 relative">
                            {item.thumbnail ? (
                              <img
                                src={item.thumbnail}
                                alt={item.judul}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                No Image
                              </div>
                            )}
                          </div>

                          {/* Judul */}
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-gray-800 line-clamp-3 leading-snug group-hover:text-blue-600 transition-colors mb-2">
                              {item.judul}
                            </h4>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <FaCalendar size={10} />
                              {format(new Date(item.createdAt), "dd MMM yyyy", {
                                locale: id,
                              })}
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500 text-sm">
                        Tidak ada berita terkait.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
