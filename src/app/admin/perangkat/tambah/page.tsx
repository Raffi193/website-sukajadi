import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { ArrowLeft } from "lucide-react";
// Import form client yang baru
import CreatePerangkatForm from "@/src/components/admin/perangkat/CreatePerangkatForm";

export default function TambahPerangkatPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      {/* --- HEADER MANTAP PARAHH --- */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 pb-8 border-b border-dashed border-gray-200">
        {/* Tombol Back Premium */}
        <Link href="/admin/perangkat">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full bg-white border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
          </Button>
        </Link>

        {/* Typography Modern */}
        <div className="space-y-1">
          <h1 className="text-3xl md:text-3xl font-extrabold tracking-tight text-gray-900">
            Tambah{" "}
            <span className="text-transparent bg-clip-text bg-blue-600">
              Perangkat
            </span>
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <p className="text-sm md:text-base font-medium">
              Lengkapi formulir di bawah untuk menambahkan personel baru
            </p>
          </div>
        </div>
      </div>

      {/* Panggil Form Client */}
      <CreatePerangkatForm />
    </div>
  );
}
