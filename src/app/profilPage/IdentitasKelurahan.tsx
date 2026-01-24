import { FaMapMarkedAlt, FaIdCard, FaBuilding, FaUsers, FaGlobe } from "react-icons/fa";

export default function IdentitasSection() {
  const dataIdentitas = [
    { label: "Nama Kelurahan", value: "Sukajadi", icon: <FaBuilding /> },
    { label: "Kecamatan", value: "Sukarami", icon: <FaMapMarkedAlt /> },
    { label: "Kota/Kabupaten", value: "Palembang", icon: <FaGlobe /> },
    { label: "Kota/Kabupaten", value: "Palembang", icon: <FaGlobe /> },
    { label: "Kota/Kabupaten", value: "Palembang", icon: <FaGlobe /> },
    { label: "Kota/Kabupaten", value: "Palembang", icon: <FaGlobe /> },
    { label: "Kota/Kabupaten", value: "Palembang", icon: <FaGlobe /> },
    { label: "Kota/Kabupaten", value: "Palembang", icon: <FaGlobe /> },
    { label: "Kota/Kabupaten", value: "Palembang", icon: <FaGlobe /> },
    { label: "Kode Kemendagri", value: "16.71.07.1004", icon: <FaIdCard /> },
    { label: "Tipologi", value: "Jasa & Perdagangan", icon: <FaBuilding /> },
    { label: "Jumlah RW/RT", value: "09 RW / 45 RT", icon: <FaUsers /> },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-16">
        
        {/* Section Title */}
        <div className="text-left mb-12">
          <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">Data Wilayah</span>
          <h2 className="text-3xl font-bold text-gray-900 font-poppins mt-2">Identitas Kelurahan</h2>
          <div className="h-1 w-20 bg-blue-600 mt-4 rounded-full"></div>
        </div>

        {/* Grid Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dataIdentitas.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xl shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500 font-sans">{item.label}</p>
                <h4 className="text-lg font-bold text-gray-800 font-poppins">{item.value}</h4>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}