import { getProfilKelurahan } from "@/src/actions/profil"; // 1. Import Server Action
import TopBar from "@/src/components/layout/TopBar";
import NavBar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import HeroPages from "@/src/components/layout/Hero"; // Pastikan path ini benar
import IdentitasSection from "./IdentitasKelurahan";
import SejarahSection from "./SejarahKelurahan";
import SejarahKepemimpinan from "@/src/components/sejarahKepemimpinan";
import PetaKondisiWilayah from "@/src/components/PetaKondisiWilayah";
import PendidikanFasilitas from "@/src/components/pendidikanFasilitas";
import PerekonomianKesehatan from "@/src/components/perekonomianKesehatan";

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
        image="/images/kantor.jpeg" // Jangan lupa tambahkan props image jika HeroPages memintanya
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
