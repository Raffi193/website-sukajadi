import { getProfilKelurahan } from "@/src/app/actions/profil"; // 1. Import Server Action
import TopBar from "@/components/layout/TopBar";
import NavBar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroPages from "@/components/layout/Hero"; // Pastikan path ini benar
import IdentitasSection from "./IdentitasKelurahan";
import SejarahSection from "./SejarahKelurahan";
import SejarahKepemimpinan from '@/components/sejarahKepemimpinan';
import PetaKondisiWilayah from "@/components/PetaKondisiWilayah";
import PendidikanFasilitas from "@/components/pendidikanFasilitas";
import PerekonomianKesehatan from "@/components/perekonomianKesehatan";

// 2. Ubah function menjadi async
export default async function ProfilPage() {
  
  // 3. Ambil data dari database
  const profil = await getProfilKelurahan();

  return (
    <main className="min-h-screen bg-white">
      <TopBar />
      <NavBar />

      <HeroPages
        title="Profil & Sejarah"
        subtitle="Mengenal lebih dekat identitas, asal-usul, dan perjalanan Kelurahan Sukajadi dari masa ke masa."
        image="/images/fix.jpeg" // Jangan lupa tambahkan props image jika HeroPages memintanya
      />

      {/* 4. Kirim data ke komponen IdentitasSection */}
      <IdentitasSection data={profil} />

      {/* Catatan: Jika SejarahSection nanti ingin dibuat dinamis juga (mengambil teks sejarah dari database),
         Anda bisa mengirim props seperti: <SejarahSection data={profil?.sejarah} />
      */}
      <SejarahSection />

      <SejarahKepemimpinan />

      <PetaKondisiWilayah />

      <PendidikanFasilitas />

      <PerekonomianKesehatan />

      <Footer />
    </main>
  );
}