import Footer from "@/src/components/layout/Footer";
import TopBar from "@/src/components/layout/TopBar";
import Navbar from "@/src/components/layout/Navbar";
import PengumumanClient from "@/src/components/views/pengumuman"; // Import komponen client tadi
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function PengumumanPage() {
  // 1. Ambil data dari database (Urutkan dari yang terbaru)
  const pengumumanList = await prisma.pengumuman.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      tanggal: "desc",
    },
  });

  // 2. Serialisasi Data Tanggal (Sama seperti Agenda)
  const serializedPengumuman = pengumumanList.map((item) => ({
    ...item,
    tanggal: item.tanggal.toISOString(),
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));

  return (
    <>
      <TopBar />
      <Navbar />

      {/* 3. Kirim data ke Client Component */}
      <PengumumanClient pengumumanList={serializedPengumuman as any} />

      <Footer />
    </>
  );
}
