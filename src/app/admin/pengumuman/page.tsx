import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deletePengumuman } from "@/src/app/actions/pengumuman"; // Import
import { FaPlus, FaTrash, FaFilePdf, FaTag, FaEdit } from "react-icons/fa";

export const dynamic = "force-dynamic";

export default async function AdminPengumumanPage() {
  const pengumumanList = await prisma.pengumuman.findMany({
    orderBy: { tanggal: "desc" },
    include: { author: true },
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Manajemen Pengumuman
          </h1>
          <p className="text-sm text-gray-500">
            Kelola informasi publik dan file dokumen.
          </p>
        </div>
        <Link
          href="/admin/pengumuman/tambah"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition shadow-sm"
        >
          <FaPlus /> Tambah Pengumuman
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-gray-700">Judul & Isi</th>
              <th className="p-4 font-semibold text-gray-700">Kategori</th>
              <th className="p-4 font-semibold text-gray-700">Tanggal</th>
              <th className="p-4 font-semibold text-gray-700">Dokumen</th>
              <th className="p-4 font-semibold text-gray-700 text-right">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pengumumanList.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition">
                <td className="p-4 max-w-sm">
                  <div className="font-bold text-gray-800 truncate">
                    {item.judul}
                  </div>
                  <div className="text-xs text-gray-500 line-clamp-1">
                    {item.isi}
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-semibold border ${
                      item.kategori === "PELAYANAN"
                        ? "bg-blue-50 text-blue-600 border-blue-200"
                        : item.kategori === "SOSIALISASI"
                          ? "bg-orange-50 text-orange-600 border-orange-200"
                          : item.kategori === "HIMBAUAN"
                            ? "bg-yellow-50 text-yellow-600 border-yellow-200"
                            : "bg-gray-50 text-gray-600 border-gray-200"
                    }`}
                  >
                    {item.kategori.replace("_", " ")}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-600">
                  {new Date(item.tanggal).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="p-4">
                  {item.dokumenUrl ? (
                    <a
                      href={item.dokumenUrl}
                      target="_blank"
                      className="text-blue-600 hover:underline flex items-center gap-1 text-sm"
                    >
                      <FaFilePdf /> Lihat File
                    </a>
                  ) : (
                    <span className="text-gray-400 text-xs">- Tidak ada -</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                  <Link
                    href={`/admin/pengumuman/${item.id}/edit`}
                    className="text-blue-500 hover:text-blue-700 p-2 rounded-md hover:bg-blue-50 transition"
                  >
                    <FaEdit />
                  </Link>

                  <form
                    action={async () => {
                      "use server";
                      await deletePengumuman(item.id);
                    }}
                  >
                    <button className="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-50 transition">
                      <FaTrash />
                    </button>
                  </form>
                  </div>
                </td>
              </tr>
            ))}
            {pengumumanList.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  Belum ada pengumuman.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
