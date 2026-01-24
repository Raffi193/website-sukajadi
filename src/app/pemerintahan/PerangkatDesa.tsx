import Image from 'next/image';
import { FaUserTie, FaIdBadge } from "react-icons/fa";

// Data Dummy
const teamMembers = [
  {
    name: "H. Ahmad Fauzi, S.IP, M.Si",
    role: "Lurah Sukajadi",
    nip: "19800101 200501 1 001",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
    isLeader: true 
  },
  {
    name: "Siti Aminah, S.Sos",
    role: "Sekretaris Lurah",
    nip: "19850202 201001 2 002",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    isLeader: false
  },
  {
    name: "Budi Santoso, SE",
    role: "Kasi Pemerintahan",
    nip: "19900303 201501 1 003",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
    isLeader: false
  },
  {
    name: "Ratna Dewi, S.Kom",
    role: "Kasi Pelayanan Umum",
    nip: "19920404 201801 2 004",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    isLeader: false
  },
  {
    name: "Dedi Kurniawan",
    role: "Kasi Pembangunan",
    nip: "19880505 201201 1 005",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    isLeader: false
  },
  {
    name: "Eko Prasetyo",
    role: "Staf Administrasi",
    nip: "Non-ASN",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    isLeader: false
  },
  {
    name: "Indah Permata",
    role: "Staf Keuangan",
    nip: "Non-ASN",
    image: "https://images.unsplash.com/photo-1598550874175-4d7112ee750c?q=80&w=800&auto=format&fit=crop",
    isLeader: false
  },
  {
    name: "Bambang Irawan",
    role: "Babinsa",
    nip: "TNI AD",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    isLeader: false
  },
];

export default function PerangkatGrid() {
  const leader = teamMembers.find(m => m.isLeader);
  const staff = teamMembers.filter(m => !m.isLeader);

  // Komponen Kartu yang seragam
  const MemberCard = ({ member }: { member: typeof teamMembers[0] }) => (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col hover:-translate-y-1 h-full">
      
      {/* Foto Portrait (Ukuran Kecil & Pas) */}
      <div className="relative aspect-[3/3] w-full overflow-hidden bg-gray-200">
        <Image 
          src={member.image} 
          alt={member.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Overlay Label */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <p className="text-white text-xs font-medium border-l-2 border-yellow-400 pl-2">
            {member.isLeader ? "Pimpinan Wilayah" : "Siap Melayani"}
          </p>
        </div>
      </div>

      {/* Info Detail */}
      <div className="p-4 flex-grow flex flex-col justify-between text-center">
        <div>
          <h3 className="font-bold text-gray-800 font-poppins text-base mb-1 group-hover:text-blue-600 transition-colors">
            {member.name}
          </h3>
          <p className="text-blue-600 font-medium text-xs mb-2 flex items-center justify-center gap-1">
            <FaUserTie size={10} /> {member.role}
          </p>
        </div>
        
        <div className="pt-2 border-t border-gray-50 flex justify-center">
            <p className="text-[10px] text-gray-400 flex items-center gap-1 bg-gray-50 py-1 px-2 rounded w-fit">
              <FaIdBadge /> {member.nip}
            </p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-18 mb-25 bg-white">
      <div className="container mx-auto px-4 md:px-16">
        
        {/* Judul Section */}
        <div className="mb-12 border-l-4 border-blue-600 pl-4">
          <h2 className="text-3xl font-bold text-gray-900 font-poppins">Profil Aparatur</h2>
          <p className="text-gray-500 mt-1 font-sans">
            Perangkat Pemerintahan Kelurahan Sukajadi
          </p>
        </div>

        <div className="flex flex-col gap-10">
          
          {/* 1. KARTU LURAH (Tengah & Ukuran Sama) */}
          {leader && (
            <div className="flex justify-center">
              {/* Kita batasi lebarnya agar sama dengan kartu di grid bawah (max-w-xs / w-64) */}
              <div className="w-full max-w-[260px]">
                <MemberCard member={leader} />
              </div>
            </div>
          )}

          {/* 2. GRID STAF (Ukuran Sama) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {staff.map((member, index) => (
              // Wrapper div agar ukurannya konsisten
              <div key={index} className="w-full"> 
                 <MemberCard member={member} />
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}