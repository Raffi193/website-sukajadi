// app/kontak/page.tsx
import TopBar from "@/src/components/layout/TopBar";
import Navbar from "@/src/components/layout/Navbar";
import HeroPages from "@/src/components/layout/Hero"; // Pastikan path ini sesuai
import Footer from "@/src/components/layout/Footer";
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaClock,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaBuilding,
  FaShieldAlt,
  FaAmbulance,
} from "react-icons/fa";

export default function HalamanKontak() {
  return (
    <main className="min-h-screen bg-gray-50">
      <TopBar />
      <Navbar />

      {/* 1. Hero Halaman Kontak */}
      <HeroPages
        title="Hubungi Kami"
        subtitle="Pusat informasi dan layanan masyarakat Kelurahan Sukajadi. Kami siap membantu kebutuhan administrasi Anda."
        image="/images/kantor.jpeg" // Pastikan gambar ada
      />

      <div className="container mx-auto px-4 md:px-8 lg:px-16 mt-30 -mt-10 relative z-10">
        {/* 2. Kartu Kontak Utama (Grid 4 Kolom) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Kartu Alamat */}
          <div className="bg-white p-6 rounded-xl shadow-lg   border-black hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
              <FaMapMarkerAlt size={24} />
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">
              Alamat Kantor
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Jl. Hm Asyik Aqil, Sukomoro, Kec. Talang Kelapa, Kab. Banyuasin
            </p>
          </div>

          {/* Kartu Telepon/WA */}
          <div className="bg-white p-6 rounded-xl shadow-lg   border-black  hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
              <FaWhatsapp size={24} />
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">
              Layanan Warga
            </h3>
            <p className="text-gray-600 text-sm mb-1">Telepon: (0711) 123456</p>
            <p className="text-gray-600 text-sm">WhatsApp: +62 812-3456-7890</p>
          </div>

          {/* Kartu Email */}
          <div className="bg-white p-6 rounded-xl shadow-lg   border-black  hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-4">
              <FaEnvelope size={24} />
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">
              Surat Elektronik
            </h3>
            <p className="text-gray-600 text-sm mb-1">admin@sukajadi.go.id</p>
            <p className="text-gray-600 text-sm">
              kelurahan.sukajadi@gmail.com
            </p>
          </div>

          {/* Kartu Sosmed */}
          <div className="bg-white p-6 rounded-xl shadow-lg  border-black hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
              <FaInstagram size={24} />
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">
              Media Sosial
            </h3>
            <div className="flex gap-3 mt-2">
              <Link
                href="#"
                className="p-2 bg-gray-100 rounded-full hover:bg-blue-600 hover:text-white transition"
              >
                <FaFacebookF />
              </Link>
              <Link
                href="#"
                className="p-2 bg-gray-100 rounded-full hover:bg-pink-600 hover:text-white transition"
              >
                <FaInstagram />
              </Link>
              <Link
                href="#"
                className="p-2 bg-gray-100 rounded-full hover:bg-red-600 hover:text-white transition"
              >
                <FaYoutube />
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Section Informasi Detail (Layout 2 Kolom) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Kolom Kiri: Jam Operasional & Jadwal */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-blue-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <FaClock size={100} />
              </div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaClock /> Jam Pelayanan
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-blue-700 pb-2">
                  <span>Senin - Kamis</span>
                  <span className="font-semibold">08.00 - 16.00 WIB</span>
                </div>
                <div className="flex justify-between border-b border-blue-700 pb-2">
                  <span>Jumat</span>
                  <span className="font-semibold">08.00 - 16.30 WIB</span>
                </div>
                <div className="flex justify-between border-b border-blue-700 pb-2">
                  <span>Istirahat</span>
                  <span className="font-semibold">12.00 - 13.00 WIB</span>
                </div>
                <div className="flex justify-between text-blue-200 pt-2">
                  <span>Sabtu - Minggu</span>
                  <span className="font-semibold text-red-300">Tutup</span>
                </div>
              </div>
              <p className="mt-6 text-xs text-blue-200 italic">
                *Untuk layanan mendesak di luar jam kerja, silakan hubungi nomor
                darurat wilayah.
              </p>
            </div>

            {/* Nomor Darurat */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaShieldAlt className="text-red-600" /> Nomor Darurat Wilayah
              </h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-gray-700 text-sm font-medium">
                    Bhabinkamtibmas
                  </span>
                  <a
                    href="tel:110"
                    className="text-red-600 font-bold hover:underline"
                  >
                    0812-XXXX-XXXX
                  </a>
                </li>
                <li className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-gray-700 text-sm font-medium">
                    Babinsa TNI
                  </span>
                  <a
                    href="tel:113"
                    className="text-orange-600 font-bold hover:underline"
                  >
                    0813-XXXX-XXXX
                  </a>
                </li>
                <li className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700 text-sm font-medium">
                    Ambulans Desa
                  </span>
                  <a
                    href="tel:118"
                    className="text-blue-600 font-bold hover:underline"
                  >
                    0811-XXXX-XXXX
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Kolom Kanan: Kontak Unit Kerja */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 h-full">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 font-poppins">
                  Unit Layanan Kelurahan
                </h3>
                <p className="text-gray-500 mt-2">
                  Silakan hubungi unit terkait sesuai dengan kebutuhan
                  administrasi Anda untuk pelayanan yang lebih cepat.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Unit 1 */}
                <div className="flex gap-4 items-start p-4 rounded-lg hover:bg-gray-50 transition">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                    <FaBuilding />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      Seksi Pemerintahan
                    </h4>
                    <p className="text-xs text-gray-500 mb-2">
                      KTP, KK, Surat Pindah, Pertanahan
                    </p>
                    <a
                      href="https://wa.me/6281234567890"
                      className="text-sm text-green-600 font-semibold hover:underline flex items-center gap-1"
                    >
                      <FaWhatsapp /> Chat WhatsApp
                    </a>
                  </div>
                </div>

                {/* Unit 2 */}
                <div className="flex gap-4 items-start p-4 rounded-lg hover:bg-gray-50 transition">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                    <FaBuilding />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      Seksi Pembangunan
                    </h4>
                    <p className="text-xs text-gray-500 mb-2">
                      Izin Usaha, Pembangunan, Lingkungan
                    </p>
                    <a
                      href="https://wa.me/6281234567890"
                      className="text-sm text-green-600 font-semibold hover:underline flex items-center gap-1"
                    >
                      <FaWhatsapp /> Chat WhatsApp
                    </a>
                  </div>
                </div>

                {/* Unit 3 */}
                <div className="flex gap-4 items-start p-4 rounded-lg hover:bg-gray-50 transition">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                    <FaBuilding />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Seksi Kessos</h4>
                    <p className="text-xs text-gray-500 mb-2">
                      Bantuan Sosial, Kesehatan, Pendidikan
                    </p>
                    <a
                      href="https://wa.me/6281234567890"
                      className="text-sm text-green-600 font-semibold hover:underline flex items-center gap-1"
                    >
                      <FaWhatsapp /> Chat WhatsApp
                    </a>
                  </div>
                </div>

                {/* Unit 4 */}
                <div className="flex gap-4 items-start p-4 rounded-lg hover:bg-gray-50 transition">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                    <FaBuilding />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Layanan Umum</h4>
                    <p className="text-xs text-gray-500 mb-2">
                      Legalisir, Surat Keterangan, dll
                    </p>
                    <a
                      href="https://wa.me/6281234567890"
                      className="text-sm text-green-600 font-semibold hover:underline flex items-center gap-1"
                    >
                      <FaWhatsapp /> Chat WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Banner CTA */}
              <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-lg">Punya Pertanyaan Lain?</h4>
                  <p className="text-blue-100 text-sm">
                    Tim kami siap membantu menjawab pertanyaan Anda melalui
                    WhatsApp.
                  </p>
                </div>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-100 transition shadow-md whitespace-nowrap"
                >
                  Hubungi Admin
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Peta Lokasi (Full Width) */}
      <section className="bg-white py-12 border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-16 text-center mb-8">
          <p className="text-xl md:text-2xl font-semibold text-gray-800 font-poppins mb-2">
            Lokasi Kantor
          </p>
          <p className="text-gray-500">
            Temukan lokasi kantor kami melalui peta digital
          </p>
          <div className="h-1 w-20 bg-blue-600 rounded-full mx-auto mt-4"></div>
        </div>

        <div className="container mx-auto px-4 md:px-16 mb-30">
          <div className="w-full aspect-[7/9] md:aspect-[21/9] bg-gray-200 rounded-2xl overflow-hidden shadow-xl border-4 border-white relative z-0">
            {/* Google Maps Embed */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.6632410935244!2d104.65292217435308!3d-2.9128995970634928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b0cac53f936b9%3A0x2997769e28f68579!2sKantor%20Lurah%20Sukajadi!5e0!3m2!1sid!2sid!4v1771296040965!5m2!1sid!2sid" // Pastikan link embed ini benar atau gunakan placeholder
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Lokasi Kelurahan Sukajadi"
              className="hover:grayscale-0 transition duration-500"
            ></iframe>
          </div>

          <div className="text-center mt-6">
            <a
              href="https://maps.google.com/?q=Kantor+Lurah+Sukajadi"
              target="_blank"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition mt-4"
            >
              <FaMapMarkerAlt /> Buka di Google Maps
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
