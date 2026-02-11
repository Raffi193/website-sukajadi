"use client";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaEdit,
  FaInfoCircle,
  FaCheckCircle,
  FaPaperclip,
  FaWhatsapp,
} from "react-icons/fa";

export default function ContactForm() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 font-poppins">
            Hubungi Kami
          </h2>
          <p className="text-gray-500 mt-2 font-sans">
            Silakan hubungi kami melalui saluran berikut atau kirim pesan
            langsung melalui formulir.
          </p>
          <div className="h-1 w-20 bg-blue-600 rounded-3xl mt-4"></div>
        </div>

        {/* BAGIAN 1: INFO KONTAK (Quick Info) */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center text-xl mb-4">
              <FaMapMarkerAlt />
            </div>
            <h4 className="font-bold text-gray-800 font-poppins">
              Alamat Kantor
            </h4>
            <p className="text-xs text-gray-500 mt-2">
              Jl. Pangeran Ayin No. 12, Sukarami, Palembang
            </p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center text-xl mb-4">
              <FaWhatsapp />
            </div>
            <h4 className="font-bold text-gray-800 font-poppins">WhatsApp</h4>
            <p className="text-xs text-gray-500 mt-2">0812-3456-7890</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center text-xl mb-4">
              <FaEnvelope />
            </div>
            <h4 className="font-bold text-gray-800 font-poppins">Email</h4>
            <p className="text-xs text-gray-500 mt-2">
              pengaduan@sukajadi.go.id
            </p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-3xl flex items-center justify-center text-xl mb-4">
              <FaClock />
            </div>
            <h4 className="font-bold text-gray-800 font-poppins">Jam Kerja</h4>
            <p className="text-xs text-gray-500 mt-2">
              Senin - Jumat: 08.00 - 16.00
            </p>
          </div>
        </div>

        {/* BAGIAN 2: LAYOUT PENGADUAN (Sesuai Gambar Referensi) */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* KOLOM KIRI: FORM PENGADUAN (Lebar 7/12) */}
          <div className="lg:col-span-7 bg-white p-8 rounded-lg xl:rounded-2xl shadow-md border-t-4 border-blue-400">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <FaEdit className="text-blue-600 text-xl" />
              <h3 className="text-xl font-bold text-blue-600 font-poppins">
                Form Pengaduan
              </h3>
            </div>

            <form className="space-y-5">
              {/* Nama Lengkap */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama anda"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition text-sm"
                />
              </div>

              {/* NIK */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">
                  NIK <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="16 digit nomor NIK"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition text-sm"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">
                  Email (Opsional)
                </label>
                <input
                  type="email"
                  placeholder="Masukkan email anda"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition text-sm"
                />
              </div>

              {/* Telepon */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">
                  Nomor Telepon <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Masukkan nomor telepon"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition text-sm"
                />
              </div>

              {/* Kategori */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">
                  Kategori Pengaduan <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition text-sm text-gray-600">
                  <option value="">Pilih Kategori</option>
                  <option value="administrasi">Layanan Administrasi</option>
                  <option value="infrastruktur">
                    Infrastruktur & Pembangunan
                  </option>
                  <option value="keamanan">Keamanan & Ketertiban</option>
                  <option value="sosial">Bantuan Sosial</option>
                </select>
              </div>

              {/* Isi Pengaduan */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">
                  Isi Pengaduan <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition text-sm"
                ></textarea>
              </div>

              {/* Lampiran */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">
                  Lampiran Dokumen (Opsional)
                </label>
                <div className="flex items-center gap-3 border border-gray-300 p-2 rounded-lg bg-gray-50">
                  <button
                    type="button"
                    className="bg-gray-700 text-white text-xs px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                  >
                    Pilih File
                  </button>
                  <span className="text-xs text-gray-500">
                    Tidak ada file yang dipilih
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  Format: JPG, PNG, PDF. Ukuran Maksimum: 2MB.
                </p>
              </div>

              {/* Tombol Kirim */}
              <button
                type="button"
                className="w-50 bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 rounded-full transition shadow-md mt-4"
              >
                Kirim Pengaduan
              </button>
            </form>
          </div>

          {/* KOLOM KANAN: INFORMASI & STATUS (Lebar 5/12) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Kartu Informasi */}
            <div className="bg-white p-8 rounded-lg xl:rounded-2xl shadow-md border-t-4 border-blue-400">
              <div className="flex items-center gap-3 mb-4">
                <FaInfoCircle className="text-blue-600 text-xl" />
                <h3 className="text-lg font-bold text-blue-600 font-poppins">
                  Informasi Pengaduan
                </h3>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed mb-6 text-justify">
                Layanan pengaduan ini merupakan sarana bagi masyarakat untuk
                menyampaikan keluhan, kritik, dan saran terkait penyelenggaraan
                pemerintahan dan pembangunan di Kelurahan Sukajadi.
              </p>

              {/* Box Proses (Background Biru Muda) */}
              <div className="bg-blue-50 p-4 rounded-lg-lg border border-blue-100 mb-6">
                <h4 className="text-sm font-bold text-blue-600 mb-2">
                  Proses Penanganan Pengaduan:
                </h4>
                <ol className="list-decimal list-inside text-xs text-gray-700 space-y-1.5 font-medium">
                  <li>Pengaduan diterima oleh administrasi desa</li>
                  <li>Divalidasi dan diverifikasi oleh tim verifikasi</li>
                  <li>Diteruskan ke unit terkait untuk ditindaklanjuti</li>
                  <li>Proses penyelesaian dan monitoring</li>
                  <li>Feedback diberikan kepada pelapor</li>
                </ol>
              </div>

              {/* Ketentuan */}
              <div>
                <h4 className="text-sm font-bold text-blue-600 mb-2">
                  Ketentuan:
                </h4>
                <ul className="list-disc list-inside text-xs text-gray-600 space-y-1.5">
                  <li>
                    Pengaduan harus disampaikan dengan bahasa yang sopan dan
                    jelas
                  </li>
                  <li>Lampirkan bukti pendukung jika memungkinkan</li>
                  <li>Pengaduan anonim tidak akan diproses</li>
                  <li>Waktu respon maksimal 7 hari kerja</li>
                </ul>
              </div>
            </div>

            {/* Kartu Cek Status */}
            <div className="bg-white p-8 rounded-lg xl:rounded-2xl shadow-md border-t-4 border-blue-400">
              {/* Title Tetap "Cek Status Pengaduan" */}
              <div className="flex items-center gap-3 mb-6">
                <FaCheckCircle className="text-blue-600 text-xl" />
                <h3 className="text-lg font-bold text-blue-600 font-poppins">
                  Cek Status Pengaduan
                </h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="text-sm text-gray-600 font-medium">
                    Masukkan Kode Status Pengaduan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: KPD-2025-00123"
                    className="w-full px-4 py-3 rounded-lg xl:rounded-2xl border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-200 outline-none transition text-sm"
                  />
                  <p className="text-[11px] text-gray-400 leading-snug">
                    Masukkan kode unik yang Anda dapatkan saat mengirim
                    pengaduan.
                  </p>
                </div>

                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-full transition shadow-md text-sm">
                  Cari Status
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
