import Image from "next/image";
import { Shield, CheckCircle, CreditCard } from "lucide-react";
import Link from "next/link";
// 1. Import fungsi untuk ambil data profil
import { getProfilKelurahan } from "@/src/app/actions/profil"; 

export default async function Hero() {
  // 2. Ambil data profil dari database
  const profil = await getProfilKelurahan();

  // 3. Tentukan gambar fallback jika admin belum upload
  const bgImage = profil?.gambarKantor || "/images/pemerintahan.png";

  return (
    <div data-aos="fade-up" className="relative w-full">
      {/* Background & Text */}
      <div className="relative h-[560px] w-full bg-gray-900 overflow-hidden">
        {/* Gambar Dinamis */}
        <Image
          src={bgImage}
          alt={profil?.namaKelurahan ? `Kantor ${profil.namaKelurahan}` : "Kantor Kelurahan"}
          fill
          className="object-cover opacity-90" // Opacity sedikit biar teks lebih terbaca
          priority
        />
        
        {/* Overlay Gradient (Agar teks putih terbaca jelas di atas foto apapun) */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/60 to-transparent" />

        <div
          data-aos="fade-up"
          className="container absolute inset-0 flex items-center mx-auto px-10"
        >
          <div className="w-full grid md:grid-cols-2 gap-8">
            <div className="text-white space-y-6 relative z-10">
              <div className="flex items-center gap-4">
                <span className="h-1 w-12 bg-yellow-400 block"></span>
                <span className="uppercase tracking-widest text-sm font-semibold text-blue-100">
                  Website Resmi
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight font-poppins">
                Pemerintah
                <br />
                {/* Nama Kelurahan Dinamis (Optional, jika mau) */}
                <span className="text-yellow-400">
                  {profil?.namaKelurahan || "Kelurahan Sukajadi"}
                </span>
              </h1>
              <p className="text-lg text-blue-50 max-w-xl leading-relaxed opacity-90">
                Dapatkan kemudahan dalam mengakses informasi publik yang
                transparan dan akuntabel untuk mewujudkan pelayanan prima bagi
                masyarakat.
              </p>
              <Link href="/profilPage">
                <button
                  data-aos="zoom-in"
                  className="bg-white text-blue-700 px-8 py-3 rounded-lg font-bold hover:bg-yellow-400 hover:text-blue-900 hover:scale-105 transition-all shadow-lg mt-4"
                >
                  Jelajahi Profil
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Info Cards (Tidak Berubah) */}
      <div
        data-aos="fade-up"
        className="relative -mt-16 z-20 container mx-auto px-4 md:px-16 mb-20"
      >
        <div className="grid md:grid-cols-3 shadow-2xl rounded-xl overflow-hidden ">
          {/* Card 1 */}
          <div className="bg-white p-6 group hover:bg-blue-50 transition cursor-pointer border-r border-gray-100">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform shadow-sm">
              <Shield size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition">
              Transparan & Responsif
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Layanan publik yang terbuka, cepat tanggap, dan mudah diakses oleh
              seluruh lapisan masyarakat.
            </p>
          </div>

          {/* Card 2 - Active */}
          <div className="bg-blue-600 p-6 text-white group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <CheckCircle size={100} />
            </div>
            <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform backdrop-blur-sm">
              <CheckCircle size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Integritas Tinggi</h3>
            <p className="text-blue-100 text-sm leading-relaxed relative z-10">
              Aparatur kelurahan yang berdedikasi tinggi, jujur, dan profesional
              dalam melayani administrasi warga.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 group hover:bg-blue-50 transition cursor-pointer">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform shadow-sm">
              <CreditCard size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition">
              Layanan Gratis
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Komitmen kami untuk memberantas pungli. Seluruh layanan
              administrasi dasar tidak dipungut biaya.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

