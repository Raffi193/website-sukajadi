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
    <section className="py-16 md:py-24 bg-whie overflow-hidden">
      <div className="container mx-auto px-4 md:px-16">
        
        {/* HEADER SECTION */}
        <div className="text-left mb-12 md:mb-20 space-y-3 max-w-4xl">
          <span className="text-blue-600 font-bold tracking-wider text-xs md:text-sm uppercase">
            Arah & Tujuan
          </span>
          <h2 className="text-3xl md:text-3xl font-semibold text-gray-800 font-poppins mt-2">
            Visi & Misi <span className="text-gray-800">Pemerintahan</span>
          </h2>
          <p className="text-gray-600 leading-relaxed font-sans max-w-2xl mt-2 text-medium">
            Komitmen kami dalam merancang masa depan kelurahan yang lebih baik,
            terarah, dan berorientasi pada kesejahteraan seluruh warga.
          </p>
          <div className="h-1.5 w-24 bg-blue-600 rounded-full mt-6"></div>
        </div>

        {/* KONTEN GRID */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          
          {/* KOLOM KIRI: VISI (Sticky Card) */}
          {/* 'top-24' membuat kartu ini menempel saat discroll sampai list misi habis */}
          <div className="relative md:sticky md:top-24">
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative group">
              
              {/* Dekorasi Background Icon */}
              <FaBullseye className="absolute -bottom-10 -right-10 text-white opacity-5 text-[12rem] md:text-[15rem] group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-bl-full"></div>

              <div className="relative z-10">
                <span className="bg-yellow-400 text-blue-950 font-bold px-4 py-1.5 rounded-full text-[10px] md:text-xs uppercase tracking-wider mb-8 inline-block shadow-lg">
                  Visi Kami
                </span>

                <FaQuoteLeft className="text-3xl md:text-4xl text-blue-300 mb-6 opacity-60" />

                <h2 className="text-2xl md:text-4xl font-bold font-poppins leading-snug mb-8">
                  "Terwujudnya Kelurahan Sukajadi yang Maju, Mandiri, dan
                  Sejahtera Berlandaskan Iman dan Taqwa."
                </h2>

                <div className="flex items-center gap-3">
                  <div className="h-1 w-16 bg-yellow-400 rounded-full"></div>
                  <span className="text-blue-200 text-sm italic">Periode 2024-2029</span>
                </div>
              </div>
            </div>
            
            {/* Dekorasi Dots di bawah kartu (Visual) */}
            <div className="hidden md:flex gap-2 mt-6 justify-center opacity-30">
               {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-blue-600"></div>
               ))}
            </div>
          </div>

          {/* KOLOM KANAN: MISI (List) */}
          <div className="space-y-8">
            <div className="mb-2">
              <h3 className="text-2xl font-bold text-gray-800 font-poppins flex items-center gap-3">
                Misi Strategis
                <span className="hidden md:block h-px flex-grow bg-gray-200 ml-4"></span>
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Langkah-langkah konkret yang kami tempuh untuk mencapai visi:
              </p>
            </div>

            <div className="space-y-4">
              {listMisi.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-5 md:p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-lg transition-all duration-300 group cursor-default"
                >
                  <div className="mt-1 flex-shrink-0">
                    <FaCheckCircle className="text-gray-300 group-hover:text-blue-600 text-xl md:text-2xl transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="text-blue-600 font-bold text-sm mb-1 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-2 group-hover:translate-y-0 duration-300 h-0 group-hover:h-auto">
                      Misi ke-{index + 1}
                    </h4>
                    <p className="text-gray-700 font-sans leading-relaxed group-hover:text-gray-900 text-sm md:text-base">
                      {item}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}