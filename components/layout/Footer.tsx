import Link from 'next/link';
import { 
  FaFacebook, 
  FaInstagram, 
  FaYoutube, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaChevronRight 
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10 font-sans">
      <div className="container mx-auto px-4 md:px-16">
        
        {/* Top Section: Grid 4 Kolom */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Kolom 1: Identitas & Sosmed */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               {/* Ganti dengan Logo Desa nanti */}
               <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-xl">
                 L
               </div>
               <div>
                 <h3 className="font-bold text-lg leading-none font-poppins">Kelurahan Sukajadi</h3>
                 <p className="text-xs text-gray-400">Kota Palembang</p>
               </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Website resmi Pemerintah Kelurahan Sukajadi. Media komunikasi dan transparansi publik untuk mewujudkan pemerintahan yang akuntabel.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors text-white">
                <FaFacebook />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors text-white">
                <FaInstagram />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors text-white">
                <FaYoutube />
              </Link>
            </div>
          </div>

          {/* Kolom 2: Jelajahi (Quick Links) */}
          <div>
            <h4 className="font-bold text-lg mb-6 font-poppins border-l-4 border-blue-600 pl-3">Jelajahi</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/pemerintahan" className="hover:text-blue-500 transition flex items-center gap-2">
                  <FaChevronRight size={10} className="text-blue-600"/> Visi & Misi
                </Link>
              </li>
              <li>
                <Link href="/pemerintahan" className="hover:text-blue-500 transition flex items-center gap-2">
                  <FaChevronRight size={10} className="text-blue-600"/> Struktur Organisasi
                </Link>
              </li>
              <li>
                <Link href="/berita" className="hover:text-blue-500 transition flex items-center gap-2">
                  <FaChevronRight size={10} className="text-blue-600"/> Kabar Desa
                </Link>
              </li>
              <li>
                <Link href="/administrasiKependudukan" className="hover:text-blue-500 transition flex items-center gap-2">
                  <FaChevronRight size={10} className="text-blue-600"/> Layanan Publik
                </Link>
              </li>
              <li>
                <Link href="/gridInformasi/gridGaleri" className="hover:text-blue-500 transition flex items-center gap-2">
                  <FaChevronRight size={10} className="text-blue-600"/> Galeri Kegiatan
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kontak Kami */}
          <div>
            <h4 className="font-bold text-lg mb-6 font-poppins border-l-4 border-blue-600 pl-3">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-blue-600 mt-1 flex-shrink-0" />
                <span>
                  Jl. Hm Asyik Aqil, Sukomoro, Kec Talang Kelapa, Kabupaten Banyuasin,
                  Sumatera Selatan
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-blue-600 flex-shrink-0" />
                <span>(0711) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-blue-600 flex-shrink-0" />
                <span>admin@sukajadi.go.id</span>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Jam Pelayanan */}
          <div>
            <h4 className="font-bold text-lg mb-6 font-poppins border-l-4 border-blue-600 pl-3">Jam Pelayanan</h4>
            <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between text-gray-300 border-b border-gray-700 pb-2">
                  <span className="flex items-center gap-2"><FaClock className="text-blue-500"/> Senin - Kamis</span>
                  <span className="font-bold">08:00 - 16:00</span>
                </li>
                <li className="flex justify-between text-gray-300 border-b border-gray-700 pb-2">
                  <span className="flex items-center gap-2"><FaClock className="text-blue-500"/> Jumat</span>
                  <span className="font-bold">08:00 - 16:30</span>
                </li>
                <li className="flex justify-between text-gray-400 pt-1">
                  <span className="flex items-center gap-2 text-red-400"><FaClock/> Sabtu - Minggu</span>
                  <span className="text-red-400 font-bold">Libur</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="border-t border-gray-800 pt-8 mt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Pemerintah Kelurahan Sukajadi. Hak Cipta Dilindungi.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-white transition">Syarat & Ketentuan</Link>
            <Link href="#" className="hover:text-white transition">Peta Situs</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}