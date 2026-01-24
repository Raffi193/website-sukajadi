import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Footer from "@/components/layout/Footer";
import FloatingButton from "@/components/layout/FloatingButton";
import Image from "next/image";
import DaftarBerita from "./berita/DaftarBerita";
import Jelajahi from "./section/jelajahDesa";
import SaranaPrasarana from "./section/saranaPrasarana";

export default function Home() {
  return (
    <>
      <main className=" text-gray-800 bg-gray-50 min-h-screen">
        <TopBar />
        <Navbar />
        <Hero />

        {/* Area Konten Utama Halaman */}
        <section data-aos="fade-up" className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Kolom Foto Lurah */}
              <div className="relative">
                {/* Frame aksen di belakang foto */}
                <div className="absolute -inset-4 bg-blue-100 rounded-xl transform rotate-3 -z-10" />

                <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-lg border-b-4 border-blue-600">
                  {/* Ganti dengan foto Pak Lurah nanti */}
                  <Image
                    src="/images/kantorLurah.png"
                    alt="Kepala Kelurahan Sukajadi"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Kolom Teks Sambutan */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">
                    Assalamu'alaikum Wr. Wb.
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                    Sambutan Lurah <br />{" "}
                    <span className="text-blue-600">Sukajadi</span>
                  </h2>
                  <div className="h-1 w-20 bg-yellow-400 rounded-full"></div>
                </div>

                <p className="text-gray-600 leading-relaxed text-lg">
                  "Selamat datang di website resmi Kelurahan Sukajadi. Website
                  ini kami hadirkan sebagai media informasi, transparansi, dan
                  pelayanan publik bagi seluruh masyarakat. Kami berkomitmen
                  untuk mewujudkan Sukajadi yang maju, mandiri, dan sejahtera."
                </p>

                <div className="pt-4">
                  <h4 className="font-bold text-xl text-gray-800">
                    H. Nama Lurah, S.IP., M.Si
                  </h4>
                  <p className="text-blue-600 font-medium">Lurah Sukajadi</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Jelajahi */}
        <Jelajahi />

        {/* Section Sarana */}
        <SaranaPrasarana />

        {/*Panggil list berita, batasi 3 saja */}
        <DaftarBerita limit={3} />

        <Footer />
        <FloatingButton />
      </main>
    </>
  );
}
