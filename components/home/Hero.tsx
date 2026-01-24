import Image from "next/image";
import { Shield, CheckCircle, CreditCard } from "lucide-react";

export default function Hero() {
  return (
    <div data-aos="fade-up" className="relative w-full">
      {/* Background & Text */}
      <div className="relative h-[550px] w-full bg-gray-200 overflow-hidden">
        <Image
          src="/images/kantorLurah.png"
          alt="Kantor Kelurahan Sukajadi"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 " />
        <div className="absolute inset-0 bg-black/10" />

        <div
          data-aos="fade-up"
          className="container absolute inset-0 flex items-center"
        >
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
            <div className="text-white space-y-6">
              <div className="flex items-center gap-4">
                <span className="h-1 w-12 bg-yellow-400 block"></span>
                <span className="uppercase tracking-widest text-sm font-semibold text-blue-100">
                  Website Resmi
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Pemerintah
                <br />
                Kelurahan Sukajadi
              </h1>
              <p className="text-lg text-blue-50 max-w-xl">
                Dapatkan kemudahan dalam mengakses informasi publik yang
                transparan dan akuntabel untuk mewujudkan pelayanan prima bagi
                masyarakat.
              </p>
              <button
                data-aos="zoom-in"
                className="bg-white text-blue-700 px-8 py-3 rounded font-semibold hover:bg-blue-50 hover:scale-105 transition-all shadow-lg"
              >
                Jelajahi Profil
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Info Cards */}
      <div
        data-aos="fade-up"
        className="relative -mt-10 z-20 container mx-auto px-4 md:px-20 mb-12"
      >
        <div className="grid md:grid-cols-3 shadow-xl rounded-lg overflow-hidden">
          {/* Card 1 */}
          {/* UBAH: p-8 jadi p-5 (padding lebih kecil) */}
          <div className="bg-white p-5 group hover:bg-gray-50 transition cursor-pointer">
            {/* UBAH: w-14 h-14 jadi w-10 h-10 (kotak ikon lebih kecil) */}
            <div className="bg-blue-100 w-10 h-10 rounded flex items-center justify-center text-blue-600 mb-3 group-hover:scale-110 transition-transform">
              {/* UBAH: size={32} jadi size={20} */}
              <Shield size={20} />
            </div>
            {/* UBAH: text-xl jadi text-lg (font judul lebih pas) */}
            <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition">
              Transparan & Responsif
            </h3>
            {/* UBAH: text-sm jadi text-xs (opsional, jika ingin teks lebih kecil lagi) */}
            <p className="text-gray-600 text-sm leading-relaxed">
              Layanan publik yang terbuka, cepat tanggap, dan mudah diakses oleh
              seluruh lapisan masyarakat.
            </p>
          </div>

          {/* Card 2 - Active */}
          <div className="bg-blue-600 p-5 text-white group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <CheckCircle size={80} />
            </div>
            <div className="bg-white/20 w-10 h-10 rounded flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
              <CheckCircle size={20} />
            </div>
            <h3 className="text-lg font-bold mb-1">Integritas Tinggi</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Aparatur kelurahan yang berdedikasi tinggi, jujur, dan profesional
              dalam melayani administrasi warga.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 group hover:bg-gray-50 transition cursor-pointer">
            <div className="bg-blue-100 w-10 h-10 rounded flex items-center justify-center text-blue-600 mb-3 group-hover:scale-110 transition-transform">
              <CreditCard size={20} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition">
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
