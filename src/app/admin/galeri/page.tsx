import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { FaPlus, FaTrash, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import TombolHapusGaleri from "./TombolHapusGaleri"; // Kita buat ini sebentar lagi

export default async function AdminGaleriPage() {
  const galeriList = await prisma.galeri.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Galeri</h1>
          <p className="text-gray-500">Kelola foto dan dokumentasi kegiatan.</p>
        </div>
        <Link 
          href="/admin/galeri/tambah" 
          className="bg-blue-600 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-blue-700 shadow-md"
        >
          <FaPlus size={14} /> Tambah Galeri
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galeriList.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden group">
            {/* Thumbnail */}
            <div className="relative h-48 w-full bg-gray-100">
              {item.thumbnail ? (
                <Image 
                  src={item.thumbnail} 
                  alt={item.judul} 
                  fill 
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-300">No Image</div>
              )}
              
              {/* Status Badge */}
              <div className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-bold ${item.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                {item.isPublished ? 'Publik' : 'Draft'}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                <span className="flex items-center gap-1">
                  <FaCalendarAlt /> {new Date(item.tanggal).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                {item.lokasi && (
                  <span className="flex items-center gap-1 truncate max-w-[100px]">
                    <FaMapMarkerAlt /> {item.lokasi}
                  </span>
                )}
              </div>
              
              <h3 className="font-bold text-gray-800 mb-1 line-clamp-1">{item.judul}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mb-4">{item.deskripsi || "Tidak ada deskripsi"}</p>

              <div className="flex justify-end pt-3 border-t">
                 {/* Tombol Hapus (Client Component) */}
                 <TombolHapusGaleri id={item.id} judul={item.judul} />
              </div>
            </div>
          </div>
        ))}
        
        {galeriList.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            Belum ada galeri kegiatan yang ditambahkan.
          </div>
        )}
      </div>
    </div>
  );
}