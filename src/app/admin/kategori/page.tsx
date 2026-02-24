import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Tag, Layers, Hash } from "lucide-react";
import { deleteKategori } from "@/src/actions/kategori";

export default async function KategoriPage() {
  // Ambil data kategori + hitung jumlah beritanya
  const data = await prisma.kategoriBerita.findMany({
    orderBy: { nama: "asc" },
    include: {
      _count: {
        select: { berita: true },
      },
    },
  });

  return (
    <div className="min-h-screen bg-slate-50/50 -m-6 p-8 font-sans">
      {/* --- HEADER MANTAP --- */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-black font-bold text-xs uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-black"></span>
            Master Data
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Kategori Berita
          </h1>
          <p className="text-gray-500 max-w-lg">
            Kelola label dan topik untuk mengelompokkan artikel berita agar
            lebih terstruktur
          </p>
        </div>

        <Link href="/admin/kategori/tambah">
          <Button className="h-11 px-6 rounded-full bg-gray-900 text-white hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 font-semibold text-sm flex items-center gap-2 group">
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            Buat Kategori Baru
          </Button>
        </Link>
      </div>

      {/* --- TABLE CONTAINER (CARD STYLE) --- */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        {/* Table Header Custom */}
        <div className="grid grid-cols-12 gap-4 bg-gray-50/50 p-5 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
          <div className="col-span-5 md:col-span-4 pl-4 flex items-center gap-2">
            <Layers className="w-3.5 h-3.5" /> Nama Kategori
          </div>
          <div className="col-span-4 md:col-span-4 hidden md:flex items-center gap-2">
            <Hash className="w-3.5 h-3.5" /> Slug URL
          </div>
          <div className="col-span-4 md:col-span-2 text-center">
            Jumlah Artikel
          </div>
          <div className="col-span-3 md:col-span-2 text-right pr-4">Aksi</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-50">
          {data.length > 0 ? (
            data.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-4 p-5 items-center hover:bg-indigo-50/30 transition-colors duration-200 group"
              >
                {/* Nama Kategori */}
                <div className="col-span-5 md:col-span-4 pl-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Tag className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm md:text-base group-hover:text-indigo-600 transition-colors">
                        {item.nama}
                      </h3>
                      {/* Slug muncul di bawah nama hanya untuk Mobile */}
                      <span className="md:hidden text-xs text-gray-400 font-mono">
                        /{item.slug}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Slug (Desktop Only) */}
                <div className="col-span-4 hidden md:flex items-center">
                  <code className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs font-mono border border-gray-200">
                    /{item.slug}
                  </code>
                </div>

                {/* Jumlah Artikel */}
                <div className="col-span-4 md:col-span-2 flex justify-center">
                  {item._count.berita > 0 ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                      {item._count.berita} Artikel
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200">
                      0 Artikel
                    </span>
                  )}
                </div>

                {/* Aksi */}
                <div className="col-span-3 md:col-span-2 flex justify-end pr-4">
                  <form action={deleteKategori.bind(null, item.id) as any}>
                    <button
                      className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all hover:shadow-sm"
                      title="Hapus Kategori"
                      type="submit"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            ))
          ) : (
            // Empty State
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Layers className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-gray-900 font-medium">Belum ada kategori</h3>
              <p className="text-gray-500 text-sm mt-1 mb-6">
                Mulai buat kategori pertama Anda.
              </p>
              <Link href="/admin/kategori/tambah">
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" /> Buat Sekarang
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Footer Info Kecil */}
        <div className="bg-gray-50/50 p-4 border-t border-gray-100 text-center text-xs text-gray-400">
          Total {data.length} Kategori terdaftar
        </div>
      </div>
    </div>
  );
}
