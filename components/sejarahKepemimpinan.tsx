import React from 'react';

type Leader = {
  no: number;
  nama: string;
  jabatan: string;
  periode: string;
  isActive?: boolean;
};

const leaders: Leader[] = [
  { no: 1, nama: "H. Musa Rohim", jabatan: "Pasirah", periode: "1952-1990" },
  { no: 2, nama: "Drs. Slamet Priyanto", jabatan: "Kades", periode: "1990-1994" },
  { no: 3, nama: "Tjik Agus Solihin, BA", jabatan: "Lurah", periode: "1994-1999" },
  { no: 4, nama: "Musni Wijaya, S.Sos", jabatan: "Lurah", periode: "1999-2001" },
  { no: 5, nama: "Sayusin Sarbi, SH", jabatan: "Lurah", periode: "2001-2005" },
  { no: 6, nama: "Meizar, S.Sos", jabatan: "Lurah", periode: "2005-2009" },
  { no: 7, nama: "Drs. Oktavianus, R.AM", jabatan: "Lurah", periode: "2009-2013" },
  { no: 8, nama: "H. Syaiful Anwar, SH", jabatan: "Lurah", periode: "2013-2017" },
  { no: 9, nama: "Haliman Tori, S.Ag", jabatan: "Lurah", periode: "2017-2023" },
  { no: 10, nama: "Rusdy Bahalwan, S.Sos. M.Si", jabatan: "Lurah", periode: "2023-Sekarang", isActive: true },
];

export default function SejarahKepemimpinan() {
  return (
    <section className="mb-16 md:mb-24 lg:mb-8 bg-white py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        {/* HEADER SECTION - Responsif */}
        <div className="mb-12">
          <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">
            Pemerintahan
          </span>
          <h2 className="text-3xl md:text-3xl font-semibold text-gray-800 font-poppins mt-2">
            Sejarah & Urutan Kepemimpinan
          </h2>
          <p className="text-gray-500 text-sm mt-2 sm:text-base max-w-2xl mx-auto md:mx-0 mb-4 md:mb-4 leading-relaxed">
            Daftar urutan Pasirah, Kepala Desa, dan Lurah yang telah mendedikasikan diri memimpin wilayah Kelurahan Sukajadi dari masa ke masa.
          </p>
          <div className="h-1 w-20 bg-blue-600 mt-4 rounded-full"></div>
        </div>

        {/* MOBILE VIEW - Card Layout (Hidden on MD and up) */}
        <div className="block lg:hidden space-y-4">
          {leaders.map((leader) => (
            <div
              key={leader.no}
              className={`bg-white border rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md ${
                leader.isActive 
                  ? "border-blue-300 ring-2 ring-blue-100" 
                  : "border-gray-200"
              }`}
            >
              <div className={`p-4 sm:p-5 ${leader.isActive ? 'bg-blue-50/50' : ''}`}>
                {/* Header Card dengan Nomor dan Badge Aktif */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    {/* Avatar Icon */}
                    <div className={`p-2.5 rounded-lg shrink-0 ${
                      leader.isActive 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    
                    {/* Nama */}
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-base sm:text-lg leading-tight ${
                        leader.isActive ? 'text-blue-700' : 'text-gray-800'
                      }`}>
                        {leader.nama}
                      </p>
                      {leader.isActive && (
                        <span className="inline-flex items-center gap-1 text-xs text-blue-600 font-medium mt-1">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
                          Sedang Menjabat
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Nomor Urut */}
                  <div className="text-2xl font-bold text-gray-300 ml-2">
                    #{leader.no}
                  </div>
                </div>

                {/* Info Jabatan & Periode */}
                <div className="space-y-2.5 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Jabatan</span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      leader.jabatan === 'Pasirah' ? 'bg-amber-100 text-amber-700' :
                      leader.jabatan === 'Kades' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {leader.jabatan}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Periode</span>
                    <div className="flex items-center text-gray-700 font-medium bg-gray-50 px-3 py-1.5 rounded-lg text-xs border border-gray-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {leader.periode}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP VIEW - Table Layout (Hidden below LG) */}
        <div className="hidden lg:block bg-white border border-gray-100 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="py-4 lg:py-5 px-4 lg:px-6 font-semibold text-gray-700 text-xs lg:text-sm uppercase tracking-wider w-16 lg:w-20 text-center">
                    No
                  </th>
                  <th className="py-4 lg:py-5 px-4 lg:px-6 font-semibold text-gray-700 text-xs lg:text-sm uppercase tracking-wider">
                    Nama Pejabat
                  </th>
                  <th className="py-4 lg:py-5 px-4 lg:px-6 font-semibold text-gray-700 text-xs lg:text-sm uppercase tracking-wider">
                    Jabatan
                  </th>
                  <th className="py-4 lg:py-5 px-4 lg:px-6 font-semibold text-gray-700 text-xs lg:text-sm uppercase tracking-wider">
                    Periode Menjabat
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leaders.map((leader) => (
                  <tr 
                    key={leader.no} 
                    className={`hover:bg-blue-50/30 transition-colors duration-200 ${
                      leader.isActive ? "bg-blue-50/40" : ""
                    }`}
                  >
                    <td className="py-4 lg:py-5 px-4 lg:px-6 text-center font-medium text-gray-400 text-sm lg:text-base">
                      {leader.no}
                    </td>
                    <td className="py-4 lg:py-5 px-4 lg:px-6">
                      <div className="flex items-center gap-3">
                        {/* Ikon User */}
                        <div className={`p-2 rounded-lg shrink-0 ${
                          leader.isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                        }`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <p className={`font-bold text-sm lg:text-base ${
                            leader.isActive ? 'text-blue-700' : 'text-gray-800'
                          }`}>
                            {leader.nama}
                          </p>
                          {leader.isActive && (
                            <span className="inline-flex items-center gap-1 text-xs text-blue-600 font-medium mt-0.5">
                              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
                              Sedang Menjabat
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 lg:py-5 px-4 lg:px-6">
                      {/* Badge Jabatan */}
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        leader.jabatan === 'Pasirah' ? 'bg-amber-100 text-amber-700' :
                        leader.jabatan === 'Kades' ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {leader.jabatan}
                      </span>
                    </td>
                    <td className="py-4 lg:py-5 px-4 lg:px-6">
                      <div className="flex items-center text-gray-600 font-medium bg-gray-50 px-3 py-1.5 rounded-lg w-fit text-xs lg:text-sm border border-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {leader.periode}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 md:mt-8 p-4 md:p-5 bg-blue-50 rounded-xl border border-blue-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              <span className="font-semibold text-blue-700">Catatan:</span> Kelurahan Sukajadi telah mengalami transformasi kepemimpinan dari era Pasirah (1952) hingga sistem Kelurahan modern saat ini dengan total <span className="font-semibold text-gray-800">{leaders.length} periode kepemimpinan</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}