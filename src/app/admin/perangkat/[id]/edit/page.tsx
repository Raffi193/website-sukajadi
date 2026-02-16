import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserCog, Pencil } from "lucide-react";
import EditPerangkatForm from "@/components/admin/perangkat/EditPerangkatForm";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPerangkatPage({ params }: EditPageProps) {
  const { id } = await params;

  // Ambil data dari database
  const perangkat = await prisma.perangkatKelurahan.findUnique({
    where: { id },
  });

  if (!perangkat) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50/50 -m-6 p-8 font-sans flex flex-col items-center justify-center md:justify-start pt-10 md:pt-20">
      <div className="w-full max-w-5xl space-y-8">
        
        {/* --- HEADER NAVIGATION --- */}
        <div className="flex items-center gap-6">
          <Link href="/admin/perangkat">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-12 w-12 rounded-full bg-white border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300 group"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-800 font-bold text-xs uppercase tracking-widest">
               <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
               Edit Data
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Perbarui <span className="text-transparent bg-clip-text bg-indigo-800">Personel</span>
            </h1>
          </div>
        </div>

        {/* --- CARD CONTAINER --- */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden relative">
          {/* Header Strip Warna */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-700"></div>

          <div className="p-8">
             <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-50">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                   <UserCog className="w-5 h-5" />
                </div>
                <div>
                   <h2 className="text-lg font-bold text-gray-900">Formulir Edit</h2>
                   <p className="text-sm text-gray-500">Sesuaikan data personel di bawah ini.</p>
                </div>
             </div>

             {/* Render Form dengan Data Awal */}
             <EditPerangkatForm initialData={perangkat} />
          </div>
        </div>

      </div>
    </div>
  );
}