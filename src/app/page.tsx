import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Footer from "@/components/layout/Footer";
import FloatingButton from "@/components/layout/FloatingButton";
import Image from "next/image";
import DaftarBerita from "@/components/DaftarBerita";
import Jelajahi from "./section/jelajahDesa";
import SaranaPrasarana from "./section/saranaPrasarana";

export const metadata = {
  title: "Website Resmi Kelurahan Sukajadi",
  description:
    "Website resmi Kelurahan Sukajadi sebagai media informasi kepada masyarakat",
};

export default function Home() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="text-gray-800 bg-gray-50 min-h-screen overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "GovernmentOrganization",
              name: "Kelurahan Sukajadi",
              url: "https://sukajadi.com",
            }),
          }}
        />

        <Hero />

        {/* --- SECTION SAMBUTAN LURAH (DESAIN BARU) --- */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* KOLOM KIRI: FOTO LURAH (Desain Lebih Bersih) */}
              <div className="relative">
                {/* Frame Background Simple (Opsional, bisa dihapus jika ingin polos) */}
                <div className="absolute -inset-3 bg-blue-50 rounded-2xl transform rotate-2 -z-10" />

                <div className="relative h-[500px] lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  {/* Gunakan foto formal Pak Lurah yang berkualitas tinggi di sini */}
                  <Image
                    src="/images/kantorlurah.jpeg" // Pastikan ganti dengan foto Pak Rusdy Bahalwan
                    alt="Rusdy Bahalwan, S.Sos. M.Si - Lurah Sukajadi"
                    fill
                    className="object-cover object-top" // object-top agar fokus ke wajah
                    priority // Agar gambar dimuat lebih dulu
                  />
                </div>
              </div>

              {/* KOLOM KANAN: TEKS SAMBUTAN (Rata Kiri, Profesional) */}
              <div className="space-y-8 text-left">
                <div>
                  <span className="text-blue-600 font-bold tracking-wider text-sm uppercase block mb-2">
                    Assalamu'alaikum Wr. Wb.
                  </span>
                  <h2 className="text-4xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4 font-poppins">
                    Sambutan Lurah <br />
                    <span className="text-blue-600">Sukajadi</span>
                  </h2>
                  {/* Garis Bawah Biru */}
                  <div className="h-1.5 w-24 bg-blue-600 rounded-full"></div>
                </div>

                <div className="space-y-6 text-medium leading-relaxed text-gray-600 font-sans text-justify">
                  <p>
                    "Selamat datang di website resmi Pemerintah Kelurahan
                    Sukajadi, Kabupaten Banyuasin. Website ini merupakan wujud
                    komitmen kami dalam era keterbukaan informasi publik,
                    sebagai sarana interaksi dan komunikasi antara pemerintah
                    kelurahan dengan seluruh lapisan masyarakat."
                  </p>
                  <p>
                    Melalui media ini, kami berupaya menyajikan informasi
                    terkini mengenai profil kelurahan, program pembangunan,
                    layanan administrasi, serta berbagai potensi dan kegiatan
                    kemasyarakatan. Kami berharap website ini dapat menjadi
                    jembatan yang efektif untuk meningkatkan kualitas pelayanan
                    publik yang lebih cepat, transparan, dan akuntabel.
                  </p>
                  <p>
                    Mari bersama-sama kita bersinergi, bergotong royong
                    membangun Kelurahan Sukajadi yang lebih maju, mandiri, dan
                    sejahtera. Terima kasih atas dukungan dan partisipasi aktif
                    seluruh warga.
                  </p>
                </div>

                <div className="pt-4">
                  <p className="text-medium font-medium text-gray-500 mb-2">
                    Wassalamu'alaikum Wr. Wb.
                  </p>
                  <h4 className="font-bold text-xl text-gray-900 mb-1">
                    Rusdy Bahalwan, S.Sos. M.Si
                  </h4>
                  <p className="text-blue-600 font-semibold text-medium">
                    Lurah Sukajadi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* --- AKHIR SECTION SAMBUTAN --- */}

        <Jelajahi />
        <SaranaPrasarana />
        <DaftarBerita limit={6} />
        <Footer />
        <FloatingButton />
      </main>
    </>
  );
}
