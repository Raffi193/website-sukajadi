import { FaBullseye, FaCheckCircle, FaQuoteLeft } from "react-icons/fa";

export default function VisiMisi() {
  const listMisi = [
    "Meningkatkan kualitas pelayanan publik yang prima, cepat, dan transparan berbasis teknologi informasi.",
    "Mewujudkan tata kelola pemerintahan yang akuntabel, bersih, dan bebas dari korupsi.",
    "Memberdayakan ekonomi masyarakat melalui pengembangan UMKM dan ekonomi kreatif.",
    "Meningkatkan kualitas infrastruktur lingkungan yang berkelanjutan dan ramah lingkungan.",
    "Menciptakan keamanan dan ketertiban lingkungan melalui sinergi dengan masyarakat dan aparat penegak hukum.",
  ];

  return (
    <section className="py-18 bg-white">
      <div className="container mx-auto px-4 md:px-16">
        <div className="text-left mb-16 space-y-3">
          <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">
            Arah & Tujuan
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-poppins">
            Visi & Misi <span className="text-blue-600">Pemerintahan</span>
          </h2>
          <p className="text-gray-600 leading-relaxed font-sans max-w-2xl">
            Komitmen kami dalam merancang masa depan kelurahan yang lebih baik,
            terarah, dan berorientasi pada kesejahteraan warga.
          </p>
          <div className="h-1 w-20 bg-blue-600 rounded-full mt-4"></div>
        </div>

        {/* Konten Grid Visi & Misi */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* KOLOM KIRI: VISI (Card Biru) */}
          <div className="relative">
            <div className="sticky top-28">
              <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white rounded-2xl p-8 md:p-10 shadow-xl overflow-hidden relative">
                <FaBullseye className="absolute -bottom-10 -right-10 text-white opacity-10 text-[15rem]" />

                <div className="relative z-10">
                  <span className="bg-yellow-400 text-blue-900 font-bold px-4 py-1 rounded-full text-xs uppercase tracking-wider mb-6 inline-block">
                    Visi Kami
                  </span>

                  <FaQuoteLeft className="text-4xl text-blue-300 mb-4 opacity-50" />

                  <h2 className="text-2xl md:text-3xl font-bold font-poppins leading-relaxed mb-6">
                    "Terwujudnya Kelurahan Sukajadi yang Maju, Mandiri, dan
                    Sejahtera Berlandaskan Iman dan Taqwa."
                  </h2>

                  <div className="h-1 w-20 bg-yellow-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: MISI (List) */}
          <div className="space-y-6">
            {/* Sub-judul kecil untuk Misi */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800 font-poppins">
                Misi Strategis
              </h3>
              <p className="text-sm text-gray-500">
                Langkah nyata yang kami tempuh:
              </p>
            </div>

            {/* List Misi Items */}
            <div className="space-y-4">
              {listMisi.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-300 group"
                >
                  <div className="mt-1 flex-shrink-0">
                    <FaCheckCircle className="text-gray-300 group-hover:text-blue-600 text-xl transition-colors" />
                  </div>
                  <p className="text-gray-700 font-sans leading-relaxed group-hover:text-gray-900 text-sm md:text-base">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
