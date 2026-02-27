import Image from 'next/image';

export default function SejarahSection() {
  return (
    <section data-aos="fade-up" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Kolom Gambar */}
          <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl group">
             {/* Ganti dengan foto jadul/kantor desa */}
            <Image 
              src="/images/kantorlurah.jpeg"
              alt="Sejarah Kelurahan Sukajadi"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay Gradient */}
            <div className="absolute"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-medium font-medium opacity-90 text-yellow-400">Terbentuk pada tahun</p>
              <h3 className="text-4xl font-bold text-yellow-400">1994</h3>
            </div>
          </div>

          {/* Kolom Teks Sejarah */}
          <div className="space-y-6">
            <div>
              <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">Jejak Sejarah</span>
              <h2 className="text-3xl md:text-3xl font-semibold text-gray-800 font-poppins mt-3">
                Sejarah Pembentukan <br/> <span className="text-gray-800">Kelurahan Sukajadi</span>
              </h2>
              <div className="h-1 w-24 bg-blue-600 mt-4 rounded-full"></div>
            </div>
            
            
            <div className="prose prose-lg text-gray-600 font-sans leading-relaxed text-justify">
              <p>
               Kelurahan Sukajadi awalnya adalah sebuah Desa yang termasuk dalam Kecamatan Talang Kelapa Kabupaten Musi Banyuasin (MUBA) dan naik statusnya menjadi Kelurahan pada Tahun 1994. Setelah otonomi daerah Tahun 2002. Kabupaten Musi Banyuasin (MUBA) mengalami pemekaran pada Tahun 2002 menjadi Kabupaten Banyuasin, karena berbatasan dengan Kotamadya Palembang, Kelurahan Sukajadi mengalami pertumbuhan penduduk yang sangat pesat, yang akhirnya Kelurahan Sukajadi turut mengalami pemekaran pada Tahun 2007 menjadi 2 Kelurahan yaitu Kelurahan Sukajadi dan kelurahan Tanah Mas dan sejak Tahun 2022 terjadi Pemekaran kembali Kelurahan Sukajadi menjadi 2 (dua) yaitu Kelurahan Sukajadi dan Kelurahan Sukajadi Timur hingga sekarang.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    
  );
}