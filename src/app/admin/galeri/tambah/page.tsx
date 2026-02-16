import FormGaleri from "../FormGaleri";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function TambahGaleriPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/galeri" className="text-gray-500 hover:text-blue-600 flex items-center gap-2 mb-2 text-sm">
          <FaArrowLeft /> Kembali ke Daftar
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Tambah Galeri Baru</h1>
        <p className="text-gray-500">Unggah dokumentasi kegiatan desa untuk ditampilkan ke publik.</p>
      </div>

      <FormGaleri />
    </div>
  );
}