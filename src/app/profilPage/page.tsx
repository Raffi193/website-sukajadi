import TopBar from "@/components/layout/TopBar";
import NavBar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroPages from "./Hero";
import IdentitasSection from "./IdentitasKelurahan";
import SejarahSection from "./SejarahKelurahan";
import VisiMisi from "./VisiMisi";
import Image from "next/image";
import { FaSitemap, FaDownload, FaUserTie, FaIdBadge } from "react-icons/fa";
import PerangkatGrid from "../pemerintahan/PerangkatDesa";

export default function Profil() {
  return (
    <>
      <main className="min-h-screen bg-white">
        <TopBar />
        <NavBar />

        <HeroPages
          title="Profil & Sejarah"
          subtitle="Mengenal lebih dekat identitas, asal-usul, dan perjalanan Kelurahan Sukajadi dari masa ke masa."
        />

        <IdentitasSection />

        <SejarahSection />

        <VisiMisi />

        <Footer />
      </main>
    </>
  );
}
