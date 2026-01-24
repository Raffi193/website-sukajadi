import Image from 'next/image';

export default function SejarahSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Kolom Gambar */}
          <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl group">
             {/* Ganti dengan foto jadul/kantor desa */}
            <Image 
              src="/images/kantorLurah.png"
              alt="Sejarah Kelurahan Sukajadi"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-sm font-medium opacity-90">Didirikan pada tahun</p>
              <h3 className="text-3xl font-bold">1985</h3>
            </div>
          </div>

          {/* Kolom Teks Sejarah */}
          <div className="space-y-6">
            <div>
              <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">Jejak Sejarah</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-poppins mt-2">
                Sejarah Pembentukan <br/> <span className="text-blue-600">Kelurahan Sukajadi</span>
              </h2>
            </div>
            
            <div className="prose prose-lg text-gray-600 font-sans leading-relaxed text-justify">
              <p>
                Kelurahan Sukajadi pada awalnya merupakan bagian dari wilayah Marga Talang Kelapa. Seiring dengan pertumbuhan penduduk dan pemekaran wilayah Kota Palembang pada tahun 1980-an, kebutuhan akan administrasi pemerintahan yang lebih dekat dengan masyarakat menjadi mendesak.
              </p>
              <p>
                Secara resmi, Kelurahan Sukajadi berdiri pada tahun 1985 berdasarkan Peraturan Daerah Kota Palembang Nomor 12 Tahun 1985. Nama "Sukajadi" diambil dari harapan para sesepuh desa agar wilayah ini menjadi tempat yang "Suka" (Disukai/Dicintai) dan "Jadi" (Makmur/Berhasil).
              </p>
              <p>
                Kini, Kelurahan Sukajadi telah bertransformasi menjadi kawasan strategis yang menopang perekonomian Kecamatan Sukarami dengan berbagai fasilitas publik yang modern namun tetap mempertahankan kearifan lokal budaya Palembang.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}