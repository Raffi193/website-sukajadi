import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';

// Data Dummy (Nanti bisa diganti dengan database/API)
const beritaTerbaru = [
  {
    id: 1,
    judul: "Penyaluran Bantuan Langsung Tunai (BLT) Tahap 3",
    tanggal: "21 Jan 2026",
    kategori: "Pemerintahan",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1000",
    excerpt: "Pemerintah Kelurahan Sukajadi kembali menyalurkan bantuan kepada warga yang membutuhkan sesuai data terpadu."
  },
  {
    id: 2,
    judul: "Kerja Bakti Masal Membersihkan Saluran Air",
    tanggal: "18 Jan 2026",
    kategori: "Kegiatan Warga",
    image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=1000",
    excerpt: "Antusiasme warga RT 01 sampai RT 05 dalam kegiatan jumat bersih untuk mencegah banjir."
  },
  {
    id: 3,
    judul: "Jadwal Pelayanan Posyandu Balita & Lansia",
    tanggal: "15 Jan 2026",
    kategori: "Kesehatan",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000",
    excerpt: "Informasi jadwal terbaru pelaksanaan Posyandu di setiap RW untuk bulan Februari 2026."
  }
];

export default function Berita() {
  return (
    <section data-aos="fade-up" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-800">Kabar Sukajadi</h2>
            <p className="text-gray-600">Ikuti perkembangan terbaru dan kegiatan di wilayah kami.</p>
            <div className="h-1 w-20 bg-blue-600 rounded-full mt-2"></div>
          </div>
          <Link href="/berita" className="group flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition">
            Lihat Semua Berita 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
          </Link>
        </div>

        {/* Grid Berita */}
        <div className="grid md:grid-cols-3 gap-8">
          {beritaTerbaru.map((item) => (
            <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100">
              {/* Gambar Berita */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.judul}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                  {item.kategori}
                </div>
              </div>
              
              {/* Konten Berita */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                  <Calendar size={14} />
                  <span>{item.tanggal}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  <Link href={`/berita/${item.id}`}>{item.judul}</Link>
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {item.excerpt}
                </p>
                <Link href={`/berita/${item.id}`} className="text-sm font-semibold text-blue-600 hover:underline">
                  Baca Selengkapnya
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}