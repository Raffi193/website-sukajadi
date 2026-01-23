import Link from 'next/link';
import { FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMap } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white pt-16 pb-8 container">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Identitas */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
               <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold">Logo</div>
               <h3 className="font-bold text-lg uppercase leading-tight">Kelurahan<br/>Sukajadi</h3>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed">
              Website resmi Pemerintah Kelurahan Sukajadi. Media komunikasi dan transparansi informasi publik.
            </p>
            <div className="flex gap-4 pt-4">
               <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-blue-600 transition cursor-pointer">
                  <FaInstagram size={16}/>
               </div>
               <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-blue-600 transition cursor-pointer">
                  <FaYoutube size={16}/>
               </div>
            </div>
          </div>

          {/* Pintasan */}
          <div>
            <h4 className="font-bold text-lg mb-6">Pintasan</h4>
            <ul className="space-y-3 text-blue-100 text-sm">
              <li><Link href="#" className="hover:text-white transition inline-block">Profil Wilayah</Link></li>
              <li><Link href="#" className="hover:text-white transition inline-block">Visi & Misi</Link></li>
              <li><Link href="#" className="hover:text-white transition inline-block">Struktur Organisasi</Link></li>
            </ul>
          </div>

          {/* Tautan */}
          <div>
            <h4 className="font-bold text-lg mb-6">Tautan Terkait</h4>
            <ul className="space-y-3 text-blue-100 text-sm">
              <li><Link href="#" className="hover:text-white transition inline-block">Situs Kota Palembang</Link></li>
              <li><Link href="#" className="hover:text-white transition inline-block">Layanan Kemendagri</Link></li>
              <li><Link href="#" className="hover:text-white transition inline-block">Pengaduan Masyarakat</Link></li>
            </ul>
          </div>

           {/* Kontak */}
           <div>
            <h4 className="font-bold text-lg mb-6">Hubungi Kami</h4>
            <ul className="space-y-4 text-blue-100 text-sm">
              <li className="flex gap-3 items-start">
                <FaPhone size={18} className="shrink-0 mt-1" />
                <span>0812-3456-7890</span>
              </li>
              <li className="flex gap-3 items-start">
                <FaEnvelope size={18} className="shrink-0 mt-1" />
                <span>kelurahan@sukajadi.go.id</span>
              </li>
              <li className="flex gap-3 items-start">
                <FaMap size={18} className="shrink-0 mt-1" />
                <span>Jl. Raya Sukajadi No. 123, Palembang</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-500 pt-8 text-center text-blue-200 text-sm">
          <p>&copy; {new Date().getFullYear()} Pemerintah Kelurahan Sukajadi</p>
        </div>
      </div>
    </footer>
  );
}