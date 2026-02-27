import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { ArrowLeft, Edit, Calendar, User, Eye, Tag, Globe } from "lucide-react";

import { prisma } from "@/lib/prisma"; // Sesuaikan path prisma Anda
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";

interface BeritaDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function BeritaDetailPage({
  params,
}: BeritaDetailPageProps) {
  // 1. Ambil ID dari URL
  const { id } = await params;

  // 2. Fetch Data Lengkap dari Database
  const berita = await prisma.berita.findUnique({
    where: { id },
    include: {
      kategori: true,
      author: true, // Asumsi ada relasi ke user/author
    },
  });

  // 3. Handle jika data tidak ditemukan
  if (!berita) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-8 space-y-6">
      {/* --- HEADER NAVIGATION --- */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/berita">
            <Button variant="outline" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              Detail Berita
            </h1>
            <p className="text-xs text-gray-500">ID: {berita.id}</p>
          </div>
        </div>

        <Link href={`/admin/berita/${berita.id}/edit`}>
          <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
            <Edit className="mr-2 h-4 w-4" />
            Edit Berita Ini
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* --- KOLOM KIRI: KONTEN UTAMA (2/3) --- */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm overflow-hidden">
            {/* Cover Image Hero */}
            <div className="relative w-full h-[300px] md:h-[400px] bg-gray-100">
              {berita.thumbnail ? (
                <img
                  src={berita.thumbnail}
                  alt="Thumbnail Preview"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 flex-col gap-2">
                  <div className="p-4 bg-gray-200 rounded-full">
                    <Globe className="h-8 w-8" />
                  </div>
                  <span className="text-sm">Tidak ada gambar cover</span>
                </div>
              )}
            </div>

            <CardContent className="p-8">
              {/* Judul Besar */}
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                {berita.judul}
              </h1>

              {/* Metadata Bar */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-8 pb-6 border-b">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  {format(new Date(berita.createdAt), "EEEE, dd MMMM yyyy", {
                    locale: idLocale,
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-green-500" />
                  {berita.author?.name || "Admin Kelurahan"}
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-orange-500" />
                  {berita.viewCount}x Dilihat
                </div>
              </div>

              {/* RENDERING HTML CONTENT (Rich Text) */}
              {/* Gunakan prose dari Tailwind Typography agar format tulisan rapi */}
              <div
                className="prose prose-lg max-w-none prose-img:rounded-xl prose-a:text-blue-600 prose-headings:font-bold text-gray-700 leading-relaxed break-words overflow-hidden"
                dangerouslySetInnerHTML={{ __html: berita.konten }}
              />
            </CardContent>
          </Card>
        </div>

        {/* --- KOLOM KANAN: SIDEBAR INFO (1/3) --- */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card className="border-none shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Status Publikasi</h3>
              <Separator />

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Status</span>
                {berita.isPublished ? (
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-3 py-1">
                    Published
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="px-3 py-1">
                    Draft / Pending
                  </Badge>
                )}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Kategori</span>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {berita.kategori?.nama || "Umum"}
                </Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Permalink</span>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded text-blue-600 truncate max-w-[150px]">
                  /{berita.slug}
                </code>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
