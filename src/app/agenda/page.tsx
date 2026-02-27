import Footer from "@/src/components/layout/Footer";
import TopBar from "@/src/components/layout/TopBar";
import Navbar from "@/src/components/layout/Navbar";
import AgendaClient from "@/src/components/views/agenda"; // Import komponen client tadi
import { prisma } from "@/lib/prisma"; // Pastikan path prisma benar

// Force dynamic agar data selalu fresh (opsional, tergantung kebutuhan caching)
export const dynamic = "force-dynamic";

export default async function AgendaPage() {
  // Ambil data dari database, urutkan dari yang terbaru atau yang akan datang
  const agendas = await prisma.agenda.findMany({
    where: {
      isPublished: true, // Hanya tampilkan yang sudah dipublish
    },
    orderBy: {
      tanggalMulai: "desc", // Urutkan berdasarkan tanggal (terbaru diatas)
    },
  });

  return (
    <>
      <TopBar />
      <Navbar />

      {/* Panggil Client Component dan kirim datanya */}
      <AgendaClient agendas={agendas} />

      <Footer />
    </>
  );
}
