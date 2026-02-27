import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import {
  Plus,
  Trash2,
  User,
  Phone,
  Briefcase,
  Hash,
  Users,
  Pencil,
} from "lucide-react";
import { deletePerangkat } from "@/src/actions/perangkat";

export default async function PerangkatPage() {
  const data = await prisma.perangkatKelurahan.findMany({
    orderBy: { urutan: "asc" },
  });

  const getStyle = (jenis: string) => {
    switch (jenis) {
      case "LURAH":
        return {
          badge: "bg-blue-100 text-blue-700 border-blue-200",
          banner: "bg-gradient-to-r from-blue-400 to-blue-600",
        };
      case "SEKRETARIS":
        return {
          badge: "bg-purple-100 text-purple-700 border-purple-200",
          banner: "bg-gradient-to-r from-blue-400 to-blue-600",
        };
      case "KASI":
        return {
          badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
          banner: "bg-gradient-to-r from-blue-400 to-blue-600",
        };
      case "STAFF":
        return {
          badge: "bg-slate-100 text-slate-700 border-slate-200",
          banner: "bg-gradient-to-r from-blue-400 to-blue-600",
        };
      default:
        return {
          badge: "bg-gray-100 text-gray-700 border-gray-200",
          banner: "bg-gradient-to-r from-blue-400 to-blue-600",
        };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 -m-6 p-8 font-sans">
      {/* HEADER TETAP SAMA */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Manajemen SDM
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Perangkat Kelurahan
          </h1>
          <p className="text-gray-500 text-sm md:text-base max-w-xl">
            Kelola struktur organisasi dan data personalia kelurahan.
          </p>
        </div>

        <Link href="/admin/perangkat/tambah">
          <Button className="bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 shadow-sm transition-all duration-300 rounded-full px-6 h-10 text-sm font-semibold flex items-center gap-2">
            <div className="bg-blue-600 text-white rounded-full p-0.5">
              <Plus className="w-3 h-3" />
            </div>
            Tambah Personel
          </Button>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto">
        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((item) => {
              const styles = getStyle(item.jenisJabatan);

              return (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col relative"
                >
                  {/* Banner Atas */}
                  <div className={`h-18 w-full ${styles.banner} relative`}>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                      {/* Tombol Edit */}
                      <Link href={`/admin/perangkat/${item.id}/edit`}>
                        <button
                          className="bg-white/20 hover:bg-white/40 text-white p-1.5 rounded-lg backdrop-blur-sm transition-colors"
                          title="Edit Data"
                        >
                          {/* Import ikon Pencil dari lucide-react */}
                          <Pencil className="w-4 h-4" />
                        </button>
                      </Link>

                      {/* Tombol Hapus */}
                      <form action={deletePerangkat.bind(null, item.id) as any}>
                        <button
                          className="bg-white/20 hover:bg-red-500 text-white p-1.5 rounded-lg backdrop-blur-sm transition-colors"
                          title="Hapus Data"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Avatar */}
                  <div className="px-5 relative flex justify-between items-end -mt-10 mb-3">
                    <div className="w-20 h-20 rounded-full border-[4px] border-white bg-white shadow-md overflow-hidden relative z-10">
                      {item.foto ? (
                        <img
                          src={item.foto}
                          alt={item.nama}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                          <User className="w-10 h-10" />
                        </div>
                      )}
                    </div>
                    <Badge
                      variant="outline"
                      className={`${styles.badge} mb-2 border-none font-bold text-[10px] px-2.5 py-0.5 uppercase tracking-wide shadow-sm`}
                    >
                      {item.jenisJabatan}
                    </Badge>
                  </div>

                  {/* Info Utama */}
                  <div className="px-5 pb-2">
                    <h3
                      className="font-bold text-gray-900 text-lg leading-snug truncate"
                      title={item.nama}
                    >
                      {item.nama}
                    </h3>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 font-medium mt-1">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span className="truncate">{item.jabatan}</span>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-gray-50 mx-5"></div>

                  {/* --- BAGIAN YANG DIPERBAIKI (STACK VERTIKAL) --- */}
                  <div className="p-5 pt-4 space-y-2 mt-auto">
                    {/* Box NIP (Full Width) */}
                    <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 flex flex-col justify-center">
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase mb-0.5">
                        <Hash className="w-3 h-3" /> NIP
                      </div>
                      <div className="text-xs font-mono text-slate-700 font-medium tracking-wide">
                        {item.nip || "-"}
                      </div>
                    </div>

                    {/* Box Kontak (Full Width) */}
                    <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 flex flex-col justify-center">
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase mb-0.5">
                        <Phone className="w-3 h-3" /> Kontak
                      </div>
                      <div className="text-xs font-sans text-slate-700 font-medium tracking-wide">
                        {item.telepon || "-"}
                      </div>
                    </div>
                  </div>
                  {/* --- SELESAI PERBAIKAN --- */}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <div className="bg-blue-50 p-4 rounded-full mb-4 animate-pulse">
              <Users className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Belum ada data</h3>
            <p className="text-gray-500 text-sm max-w-xs text-center mb-6">
              Silakan tambahkan perangkat kelurahan untuk memulai.
            </p>
            <Link href="/admin/perangkat/tambah">
              <Button>
                <Plus className="w-4 h-4 mr-2" /> Tambah Data
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
