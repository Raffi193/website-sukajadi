import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { ArrowLeft, Layers, PenTool } from "lucide-react";
// Import form client
import CreateKategoriForm from "@/src/components/admin/kategori/CreateKategoriForm";

export default function TambahKategoriPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 -m-6 p-8 font-sans flex flex-col items-center justify-center md:justify-start pt-10 md:pt-20">
      <div className="w-full max-w-2xl space-y-8">
        {/* --- HEADER NAVIGATION (MANTAP STYLE) --- */}
        <div className="flex items-center gap-6">
          {/* Tombol Back Premium */}
          <Link href="/admin/kategori">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full bg-white border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300 group"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>

          {/* Judul & Breadcrumb */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
              Master Data
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Buat{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-600">
                Kategori Baru
              </span>
            </h1>
          </div>
        </div>

        {/* --- CARD FORM CONTAINER --- */}
        <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden relative">
          {/* Hiasan Header Card */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-indigo-500 to-gray-500"></div>

          <div className="p-8">
            {/* Sub-Header Kecil di dalam Card */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-50">
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                <PenTool className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Formulir Kategori
                </h2>
                <p className="text-sm text-gray-500">
                  Isi detail label kategori di bawah ini.
                </p>
              </div>
            </div>

            {/* Form Component */}
            <CreateKategoriForm />
          </div>

          {/* Footer Card Info */}
          <div className="bg-gray-50/50 p-4 text-center">
            <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
              <Layers className="w-3 h-3" />
              Data akan otomatis tersimpan ke database sistem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
