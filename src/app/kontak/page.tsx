// app/kontak/page.tsx
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import HeroPages from "../../../components/layout/Hero";
import Footer from "@/components/layout/Footer";
import ContactForm from "./ContactForm";

export default function HalamanKontak() {
  return (
    <main className="min-h-screen bg-white">
      <TopBar />
      <Navbar />

      {/* 1. Hero Halaman Kontak */}
      <HeroPages
        title="Kontak Kami"
        subtitle="Layanan pengaduan dan informasi masyarakat Kelurahan Sukajadi, kami siap melayani Anda"
        // Ganti dengan foto customer service/kantor depan
        image="/images/kantorLurah.png"
      />

      {/* 2. Formulir & Info Kontak */}
      <ContactForm />

      {/* 3. Peta Lokasi (Paling Bawah) */}
      <section className="py-55 bg-gray-50 pt-10">
        {" "}
        {/* Background disamakan dengan form */}
        <div className="container grid place-items-center mx-auto px-4 md:px-16">
          {/* Header Style ala Screenshot: Garis Putus-putus */}
          <div className="flex items-center justify-center gap-3 mb-10 text-black font-medium">
            <span className="tracking-widest text-xl">— — — —</span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 font-poppins tracking-wide">
              Lokasi Kantor
              <div className="h-1 w-53 bg-blue-600 rounded-full mt-4"></div>
            </h2>
            <span className="tracking-widest text-xl">— — — —</span>
          </div>

          {/* Map Container */}
          <div className="size-220  h-[500px] bg-gray-200 rounded-xl overflow-hidden shadow-lg border-2 border-white relative">
            {/* Ganti src dengan Embed Map asli Kelurahan Sukajadi */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14070.842070074848!2d104.63747265541988!3d-2.9128995999999967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b0cac53f936b9%3A0x2997769e28f68579!2sKantor%20Lurah%20Sukajadi!5e1!3m2!1sid!2sid!4v1769485745549!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
