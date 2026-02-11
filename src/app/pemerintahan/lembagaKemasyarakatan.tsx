import { FaUsers, FaHandsHelping, FaChild, FaShieldAlt } from "react-icons/fa";

const mitraData = [
  {
    nama: "LPMK",
    singkatan: "Lembaga Pemberdayaan Masyarakat",
    desc: "Mitra strategis dalam perencanaan dan pelaksanaan pembangunan partisipatif.",
    icon: <FaUsers />,
    colorClass: "bg-blue-600",
    borderClass: "group-hover:border-blue-600" // Tambahan untuk efek border
  },
  {
    nama: "TP-PKK",
    singkatan: "Tim Penggerak PKK",
    desc: "Gerakan pemberdayaan keluarga untuk mewujudkan keluarga sehat dan sejahtera.",
    icon: <FaHandsHelping />,
    colorClass: "bg-pink-500",
    borderClass: "group-hover:border-pink-500"
  },
  {
    nama: "Karang Taruna",
    singkatan: "Muda Berkarya",
    desc: "Wadah pengembangan generasi muda yang kreatif, inovatif, dan berjiwa sosial.",
    icon: <FaChild />,
    colorClass: "bg-orange-500",
    borderClass: "group-hover:border-orange-500"
  },
  {
    nama: "Linmas",
    singkatan: "Perlindungan Masyarakat",
    desc: "Satuan pendukung keamanan, ketenteraman, dan penanggulangan bencana.",
    icon: <FaShieldAlt />,
    colorClass: "bg-green-600",
    borderClass: "group-hover:border-green-600"
  }
];

export default function LembagaMitra() {
  return (
    <section className="container py-12 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-10 md:mb-16 md:text-left mx-auto md:mx-0">
          <span className="text-blue-600 font-bold tracking-wider text-xs md:text-sm uppercase">
            Sinergi Membangun
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 font-poppins mt-2 leading-tight">
            Lembaga <span className="text-blue-600">Kemasyarakatan</span>
          </h2>
          <p className="text-gray-500 mt-4 font-sans text-sm md:text-base leading-relaxed">
            Bersinergi bersama mitra kerja pemerintah untuk mewujudkan pembangunan 
            yang inklusif, partisipatif, dan berkelanjutan.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mitraData.map((mitra, index) => (
            <div 
              key={index} 
              className={`
                group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl 
                border-b-4 border-transparent ${mitra.borderClass}
                transition-all duration-300 hover:-translate-y-2
                flex flex-col h-full
              `}
            >
              
              {/* Icon Circle */}
              <div className={`
                w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center 
                text-white text-xl md:text-2xl mb-5 shadow-md 
                transition-transform group-hover:scale-110 duration-300
                ${mitra.colorClass}
              `}>
                {mitra.icon}
              </div>

              {/* Text Content */}
              <div className="flex-grow">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 font-poppins mb-1 group-hover:text-blue-600 transition-colors">
                  {mitra.nama}
                </h3>
                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
                  {mitra.singkatan}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {mitra.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}