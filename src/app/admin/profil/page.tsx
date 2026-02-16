import { getProfilKelurahan } from "@/src/app/actions/profil";
import FormProfil from "./FormProfil";

export default async function AdminProfilPage() {
  const data = await getProfilKelurahan();

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Profil Kelurahan</h1>
        <p className="text-gray-500">Kelola informasi utama, sejarah, dan data wilayah kelurahan.</p>
      </div>

      <FormProfil initialData={data} />
    </div>
  );
}