import {
  FaMapMarkedAlt,
  FaBuilding,
  FaUsers,
  FaGlobe,
  FaRulerCombined,
  FaLandmark,
  FaFileContract,
  FaHome,
} from "react-icons/fa";

// Definisikan tipe data props yang diharapkan (sesuai schema database)
type ProfilData = {
  namaKelurahan?: string | null;
  luasWilayah?: string | null;
  jumlahRW?: number | null;
  jumlahRT?: number | null;
  jumlahPenduduk?: number | null;
  jumlahKK?: number | null;
};

export default function IdentitasSection({ data }: { data: ProfilData | null }) {
  
  // Data gabungan: Statis + Dinamis (dari Database)
  const dataIdentitas = [
    {
      label: "Nama Kelurahan",
      value: data?.namaKelurahan || "Sukajadi", // Dinamis (opsional, default Sukajadi)
      sub: "Kode Wilayah: 16.07.xx.xxxx",
      icon: <FaLandmark />,
      color: "bg-blue-600",
    },
    {
      label: "Kecamatan",
      value: "Talang Kelapa", // Statis
      sub: "Kabupaten Banyuasin",
      icon: <FaMapMarkedAlt />,
      color: "bg-blue-600",
    },
    {
      label: "Provinsi",
      value: "Sumatera Selatan", // Statis
      sub: "Indonesia",
      icon: <FaGlobe />,
      color: "bg-blue-600",
    },
    {
      label: "Luas Wilayah",
      value: data?.luasWilayah || "-", // DINAMIS DARI DB
      sub: "Dataran Rendah",
      icon: <FaRulerCombined />,
      color: "bg-blue-600",
    },
    {
      label: "Jumlah RT / RW",
      // DINAMIS DARI DB (Menggabungkan RT dan RW)
      value: `${data?.jumlahRT || 0} RT / ${data?.jumlahRW || 0} RW`, 
      sub: "Administrasi Wilayah",
      icon: <FaMapMarkedAlt />,
      color: "bg-blue-600",
    },
    {
      label: "Tipologi",
      value: "Jasa & Perdagangan", // Statis
      sub: "Kawasan Pemukiman",
      icon: <FaBuilding />,
      color: "bg-blue-600",
    },
    {
      label: "Total Penduduk",
      // DINAMIS DARI DB + Format Angka (Ribuan)
      value: `${(data?.jumlahPenduduk || 0).toLocaleString("id-ID")} Jiwa`, 
      sub: "Data Kependudukan Terkini",
      icon: <FaUsers />,
      color: "bg-blue-600",
    },
    {
      label: "Kepala Keluarga",
      // DINAMIS DARI DB + Format Angka
      value: `${(data?.jumlahKK || 0).toLocaleString("id-ID")} KK`,
      sub: "Tercatat",
      icon: <FaHome />,
      color: "bg-blue-600",
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-16">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-blue-600 font-bold tracking-wider text-sm uppercase flex items-center gap-2">
              <FaFileContract /> Data Administratif
            </span>
            <h2 className="text-3xl md:text-3xl font-semibold text-gray-800 font-poppins mt-3">
              Identitas Wilayah
            </h2>
            <p className="text-gray-500 text-medium py-2">
              Informasi dasar mengenai kode wilayah, luas area, dan pembagian
              administratif Kelurahan Sukajadi, Kabupaten Banyuasin.
            </p>
            <div className="h-1 w-24 bg-blue-600 mt-4 rounded-full"></div>
          </div>
        </div>

        {/* Grid Data Professional */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dataIdentitas.map((item, index) => (
            <div
              key={index}
              className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 ${item.color} text-white rounded-xl flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform`}
                >
                  {item.icon}
                </div>
                <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                  Valid
                </span>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
                  {item.label}
                </p>
                <h4 className="text-xl font-bold text-gray-800 font-poppins mb-1">
                  {item.value}
                </h4>
                <p className="text-xs text-gray-500 font-medium">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}