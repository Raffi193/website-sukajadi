import Image from 'next/image';
import Link from 'next/link';
// 👇 Import dari react-icons/fa
import { FaMapMarkedAlt, FaHistory, FaStore, FaImages, FaArrowRight } from "react-icons/fa";

const exploreItems = [
  {
    title: "Profil Wilayah",
    desc: "Letak geografis, batas wilayah, dan peta digital kelurahan.",
    icon: <FaMapMarkedAlt size={24} />, // Ikon Peta
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop", 
    href: "/profil/wilayah"
  },
  {
    title: "Sejarah Desa",
    desc: "Asal usul dan perjalanan sejarah terbentuknya Kelurahan Sukajadi.",
    icon: <FaHistory size={24} />, // Ikon Sejarah
    image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=800&auto=format&fit=crop", 
    href: "/profil/sejarah"
  },
  {
    title: "Potensi UMKM",
    desc: "Produk unggulan dan kerajinan tangan karya warga lokal.",
    icon: <FaStore size={24} />, // Ikon Toko/UMKM
    image: "https://images.unsplash.com/photo-1472851294608-41531029f9e5?q=80&w=800&auto=format&fit=crop", 
    href: "/potensi/umkm"
  },
  {
    title: "Galeri Kegiatan",
    desc: "Dokumentasi visual kegiatan pemerintahan dan kemasyarakatan.",
    icon: <FaImages size={24} />, // Ikon Galeri
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop", 
    href: "/galeri"
  },
];

export default function Jelajahi() {
  return (
    <section data-aos="fade-up" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-16">
        
        {/* Header Section */}
        <div className=" max-w-2xl mb-16 space-y-3">
          <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">Destinasi & Informasi</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 font-poppins">
            Jelajahi Kelurahan <span className="text-blue-600">Sukajadi</span>
          </h2>
          <p className="text-gray-500 leading-relaxed font-sans">
            Kenali lebih dekat potensi wilayah, sejarah, dan kearifan lokal yang ada di lingkungan kami.
          </p>
          <div className="h-1 w-20 bg-blue-600 rounded-full mt-4"></div>
        </div>

        {/* Grid Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {exploreItems.map((item, index) => (
            <Link 
              key={index} 
              href={item.href}
              className="group relative h-[320px] w-full overflow-hidden rounded-xl cursor-pointer shadow-lg"
            >
              {/* Background Image dengan Efek Zoom */}
              <Image 
                src={item.image} 
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Konten Text */}
              <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                
                {/* Icon Circle */}
                <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4 shadow-lg group-hover:bg-yellow-500 transition-colors">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-2 font-poppins">
                  {item.title}
                </h3>
                <p className="text-gray-200 text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {item.desc}
                </p>

                <div className="flex items-center gap-2 text-white text-sm font-semibold tracking-wide">
                  Selengkapnya <FaArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}