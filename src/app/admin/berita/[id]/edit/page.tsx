// app/admin/berita/[id]/edit/page.tsx

import { prisma } from "@/lib/prisma"; // Sesuaikan path prisma
import { notFound } from "next/navigation";
import { BeritaForm } from "@/src/components/admin/berita/BeritaForm"; // Sesuaikan path import
import { ArrowLeft } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

interface EditBeritaPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBeritaPage({ params }: EditBeritaPageProps) {
  // 1. Ambil ID dari URL (Next.js 15 params berupa Promise)
  const { id } = await params;

  // 2. Fetch Data Berita & Kategori secara paralel
  const [berita, kategoris] = await Promise.all([
    prisma.berita.findUnique({
      where: { id },
    }),
    prisma.kategoriBerita.findMany({
      orderBy: { nama: "asc" },
    }),
  ]);

  // 3. Jika berita tidak ditemukan, lempar ke 404
  if (!berita) {
    notFound();
  }

  // 4. Format data agar sesuai dengan "initialData" di BeritaForm
  // Kita perlu membuang field seperti createdAt, updatedAt, viewCount, dll
  const formattedData = {
    id: berita.id,
    judul: berita.judul,
    slug: berita.slug,
    konten: berita.konten,
    excerpt: berita.excerpt || "",
    thumbnail: berita.thumbnail || "",
    kategoriId: berita.kategoriId,
    isPublished: berita.isPublished,
    isPinned: berita.isPinned,
  };

  return (
    <div className="p-6 md:p-8 bg-gray-50/50 min-h-screen">
      {/* Tombol Back Opsional */}
      <div className="mb-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/berita">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>
          </Link>
        </div>
      </div>

      {/* Render Form dengan Data Awal */}
      <BeritaForm kategoris={kategoris} initialData={formattedData} />
    </div>
  );
}
