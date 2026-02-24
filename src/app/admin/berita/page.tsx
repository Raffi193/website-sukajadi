import { getBerita, getKategoriBerita } from "@/src/actions/berita";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import { BeritaTable } from "@/components/admin/berita/BeritaTable";
import { BeritaFilters } from "@/components/admin/berita/BeritaFilters";

export default async function BeritaAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; kategori?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const kategoriId = params?.kategori;
  const search = params?.search;

  // Fetch data secara paralel agar cepat
  const [beritaResult, kategoriResult] = await Promise.all([
    getBerita({ page, limit: 10, kategoriId, search }),
    getKategoriBerita(),
  ]);

  if (!beritaResult.success || !kategoriResult.success) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-gray-500 ">
        Gagal memuat data. Silakan refresh halaman.
      </div>
    );
  }

  // Hitung statistik sederhana untuk tampilan
  const totalBerita = beritaResult.pagination.total;
  // Catatan: filter ini hanya menghitung dari page yang aktif (10 item).
  // Idealnya backend menyediakan endpoint khusus count status, tapi untuk UI ini cukup.
  const publishedCount = beritaResult.data.filter((b) => b.isPublished).length;
  const draftCount = beritaResult.data.filter((b) => !b.isPublished).length;

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-8 space-y-8">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Kelola Berita
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manajemen artikel dan informasi publik desa.
          </p>
        </div>
        <Link href="/admin/berita/create">
          <Button className="shadow-sm transition-all hover:shadow-md">
            <Plus className="mr-2 h-4 w-4" />
            Buat Berita Baru
          </Button>
        </Link>
      </div>

      {/* --- STATS CARDS (Borderless & Clean) --- */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Card 1: Total */}
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Artikel
            </CardTitle>
            <FileText className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {totalBerita}
            </div>
            <p className="text-xs text-gray-400 mt-1">Semua berita tersimpan</p>
          </CardContent>
        </Card>

        {/* Card 2: Published */}
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Tayang (Published)
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {publishedCount}
            </div>
            <p className="text-xs text-gray-400 mt-1">Dapat dilihat publik</p>
          </CardContent>
        </Card>

        {/* Card 3: Draft */}
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Draft (Pending)
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{draftCount}</div>
            <p className="text-xs text-gray-400 mt-1">Belum dipublikasikan</p>
          </CardContent>
        </Card>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="space-y-4">
        {/* Filters */}
        <div className="">
          <BeritaFilters kategoris={kategoriResult.data} />
        </div>

        {/* Table - Tanpa Wrapper Card Tambahan */}
        <BeritaTable
          berita={beritaResult.data}
          pagination={beritaResult.pagination}
        />
      </div>
    </div>
  );
}
