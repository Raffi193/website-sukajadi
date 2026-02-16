import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FaPlus, FaCalendarAlt, FaMapMarkerAlt, FaTrash } from "react-icons/fa";
import { deleteAgenda } from "@/src/app/actions/agenda"; // Import action delete tadi

export default async function AdminAgendaPage() {
  const agendas = await prisma.agenda.findMany({
    orderBy: { tanggalMulai: 'desc' },
    include: { author: true }
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Agenda</h1>
        <Link 
          href="/admin/agenda/tambah" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <FaPlus /> Tambah Agenda
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-gray-700">Agenda</th>
              <th className="p-4 font-semibold text-gray-700">Waktu & Lokasi</th>
              <th className="p-4 font-semibold text-gray-700">Jenis</th>
              <th className="p-4 font-semibold text-gray-700 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {agendas.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="font-bold text-gray-800">{item.judul}</div>
                  <div className="text-xs text-gray-500">Oleh: {item.penyelenggara || "Kelurahan"}</div>
                </td>
                <td className="p-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2 mb-1">
                    <FaCalendarAlt className="text-blue-500" /> 
                    {new Date(item.tanggalMulai).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500" /> {item.lokasi}
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-semibold">
                    {item.jenis}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <form action={async () => {
                    "use server";
                    await deleteAgenda(item.id);
                  }}>
                    <button className="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-50 transition">
                      <FaTrash />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {agendas.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">Belum ada agenda.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}