import { prisma } from "@/lib/prisma";
import { FaFilePdf, FaTrash, FaPlus, FaDownload } from "react-icons/fa";
import FormTambahDokumen from "./tambahDokumen"; // Komponen Client (lihat poin 4)
import TombolHapusDokumen from "./hapusDokumen"; // Komponen Client (lihat poin 5)

export default async function AdminDokumenPage() {
  const dokumen = await prisma.dokumenPublik.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pusat Unduhan</h1>
          <p className="text-gray-500">Kelola formulir dan dokumen persyaratan administrasi.</p>
        </div>
        {/* Trigger Modal/Form Tambah */}
        <FormTambahDokumen />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-700 font-semibold border-b">
            <tr>
              <th className="p-4">Nama Dokumen</th>
              <th className="p-4">Ukuran</th>
              <th className="p-4">Preview</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {dokumen.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <FaFilePdf size={20} />
                    </div>
                    <span className="font-medium text-gray-800">{doc.judul}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-500 font-mono text-xs">{doc.ukuran}</td>
                <td className="p-4">
                  <a 
                    href={doc.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <FaDownload size={12} /> Buka
                  </a>
                </td>
                <td className="p-4 text-center">
                  <TombolHapusDokumen id={doc.id} />
                </td>
              </tr>
            ))}
            {dokumen.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-400">
                  Belum ada dokumen yang diunggah.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}