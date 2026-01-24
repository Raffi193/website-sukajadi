// components/BeritaList.tsx
import Image from "next/image";
import Link from "next/link";
import { FaCalendar, FaArrowRight } from "react-icons/fa";

// Data Dummy
const beritaData = [
  {
    id: 1,
    judul: "Penyaluran Bantuan Langsung Tunai (BLT) Tahap 3",
    tanggal: "21 Jan 2026",
    kategori: "Pemerintahan",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1000",
    excerpt:
      "Pemerintah Kelurahan Sukajadi kembali menyalurkan bantuan kepada warga...",
  },
  {
    id: 2,
    judul: "Kerja Bakti Masal Membersihkan Saluran Air",
    tanggal: "18 Jan 2026",
    kategori: "Kegiatan Warga",
    image:
      "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=1000",
    excerpt:
      "Antusiasme warga RT 01 sampai RT 05 dalam kegiatan jumat bersih...",
  },
  {
    id: 3,
    judul: "Jadwal Pelayanan Posyandu Balita & Lansia",
    tanggal: "15 Jan 2026",
    kategori: "Kesehatan",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000",
    excerpt: "Informasi jadwal terbaru pelaksanaan Posyandu di setiap RW...",
  },
  {
    id: 4,
    judul: "Pelatihan Digital Marketing untuk UMKM",
    tanggal: "10 Jan 2026",
    kategori: "Ekonomi",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000",
    excerpt: "Mendorong pelaku usaha mikro untuk <em>Go Digital</em>...",
  },
  // ... tambahkan data lainnya ...
];

interface DaftarBeritaProps {
  limit?: number; // Opsional: untuk membatasi jumlah berita (misal di Home cuma 3)
}

export default function DaftarBerita({ limit }: DaftarBeritaProps) {
  // Jika ada limit, potong datanya. Jika tidak, tampilkan semua.
  const displayedData = limit ? beritaData.slice(0, limit) : beritaData;

  return (
    <section data-aos="fade-up" className="py-18 mb-18 bg-gray-50 container">
      <div className="container">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-800">Kabar Sukajadi</h2>
            <p className="text-gray-600">
              Ikuti perkembangan terbaru dan kegiatan di wilayah kami.
            </p>
            <div className="h-1 w-20 bg-blue-600 rounded-full mt-2"></div>
          </div>
          <Link
            href="/berita"
            className="group flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition">
            Lihat Semua Berita
            <FaArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
      <div className="container grid md:grid-cols-3 gap-8">
        {displayedData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100"
          >
            {/* Gambar */}
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

            {/* Konten */}
            <div className="p-6">
              <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                <FaCalendar size={14} />
                <span>{item.tanggal}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                <Link href={`/berita/${item.id}`}>{item.judul}</Link>
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {item.excerpt}
              </p>
              <Link
                href={`/berita/${item.id}`}
                className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1"
              >
                Baca Selengkapnya <FaArrowRight size={12} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
