import { getKategoriBerita } from "@/src/actions/berita";
import { BeritaForm } from "@/components/admin/berita/BeritaForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function CreateBeritaPage() {
  const kategoriResult = await getKategoriBerita();

  if (!kategoriResult.success) {
    return <div>Error loading kategori</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/berita">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
        </Link>
      </div>

      {/* Form */}
      <BeritaForm kategoris={kategoriResult.data} />
    </div>
  );
}
