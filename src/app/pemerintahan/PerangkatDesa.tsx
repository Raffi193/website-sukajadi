import { prisma } from "@/lib/prisma";
import { FaUserTie, FaIdBadge, FaUser } from "react-icons/fa";
import Image from "next/image";

export default async function PerangkatGrid() {
  const allData = await prisma.perangkatKelurahan.findMany({
    orderBy: { urutan: "asc" },
  });

  const leader = allData.find((m) => m.jenisJabatan === "LURAH");
  const staff = allData.filter((m) => m.jenisJabatan !== "LURAH");

  // --- KOMPONEN KARTU ---
  const MemberCard = ({ member }: { member: (typeof allData)[0] }) => (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full w-full relative">
      {/* Foto: Rasio 3:4 */}
      <div className="relative w-full aspect-[3/4] bg-gray-100 flex items-center justify-center overflow-hidden">
        {member.foto ? (
          <Image
            src={member.foto}
            alt={member.nama}
            fill
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <FaUser className="text-gray-300 text-3xl opacity-50" />
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col items-center text-center flex-grow gap-1">
        <div className="mb-1 w-full">
          <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2">
            {member.nama}
          </h3>
          <p className="text-blue-600 text-[10px] font-bold uppercase mt-1 flex items-center justify-center gap-1">
            <FaUserTie className="w-2.5 h-2.5" />
            {member.jabatan}
          </p>
        </div>

        <div className="mt-auto w-full">
          <div className="bg-slate-50 border border-slate-100 rounded py-1 px-2 flex justify-center items-center gap-1.5 mx-auto w-fit">
            <FaIdBadge className="text-gray-400 w-2.5 h-2.5" />
            <span className="text-[9px] text-gray-500 font-mono font-medium">
              {member.nip || "-"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    // PERBAIKAN DI SINI: Tambahkan 'relative z-10'
    // Ini memastikan section ini punya layer sendiri dan berada di bawah Tupoksi (yang z-20)
    <section className="py-20 bg-white relative z-10">
      <div className="container mx-auto px-4 md:px-16">
        {/* Header Section (Gaya Baru) */}
        <div className="mb-12">
          <span className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2 block">
            PERSONEL & STAFF
          </span>
          <h2 className="text-3xl md:text-3xl font-extrabold text-gray-900 font-poppins mb-3">
            Profil <span className="text-blue-600">Aparatur</span>
          </h2>
          <p className="text-gray-500 text-medium max-w-2xl leading-relaxed">
            Daftar lengkap pejabat struktural dan staf pelaksana yang bertugas
            melayani masyarakat Kelurahan Sukajadi.
          </p>
          {/* Garis Aksen Biru */}
          <div className="w-16 h-1.5 bg-blue-600 mt-4 rounded-full"></div>
        </div>

        <div className="flex flex-col gap-8 items-center">
          {/* LURAH */}
          {leader && (
            <div className="w-full max-w-[200px] relative z-0">
              <MemberCard member={leader} />
            </div>
          )}

          {/* STAFF */}
          {staff.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-4xl relative z-0">
              {staff.map((member) => (
                <div key={member.id} className="w-full max-w-[200px] mx-auto">
                  <MemberCard member={member} />
                </div>
              ))}
            </div>
          ) : (
            !leader && (
              <div className="text-gray-400 text-sm italic">Data kosong.</div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
