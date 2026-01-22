import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Footer from "@/components/layout/Footer";
import FloatingButton from "@/components/layout/FloatingButton";

export default function Home() {
  return (
  <>
    <main className="font-sans text-gray-800 bg-gray-50 min-h-screen">
      <TopBar />
      <Navbar />
      <Hero />
      
      {/* Area Konten Utama Halaman (Bisa dibuat komponen terpisah lagi nanti) */}
      <section className="container mx-auto px-4 py-20 text-center text-gray-400">
        <p>Konten Artikel & Berita akan dimuat di sini...</p>
      </section>

      <Footer />
      <FloatingButton />
    </main>
  </>
  );
}