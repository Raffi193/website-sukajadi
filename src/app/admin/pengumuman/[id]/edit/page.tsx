import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditPengumumanForm from "@/src/components/admin/EditPengungumanForm";

interface EditPageProps {
  params: Promise<{ id: string }>; // Params sekarang Promise di Next.js terbaru
}

export default async function EditPage({ params }: EditPageProps) {
  const { id } = await params;

  // 1. Ambil data pengumuman berdasarkan ID
  const pengumuman = await prisma.pengumuman.findUnique({
    where: { id },
  });

  // 2. Jika tidak ada, kembalikan 404
  if (!pengumuman) {
    notFound();
  }

  // 3. Render Form Client Component dengan data awal
  return <EditPengumumanForm initialData={pengumuman} />;
}
