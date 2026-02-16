"use client";

import { useState, useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { updatePerangkat } from "@/src/app/actions/perangkat"; 
import { ImageUpload } from "@/components/admin/berita/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save, User, Briefcase, Hash, Phone, FileText } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface EditPerangkatFormProps {
  initialData: {
    id: string;
    nama: string;
    nip: string | null;
    jabatan: string;
    jenisJabatan: string;
    foto: string | null;
    telepon: string | null;
    urutan: number;
  };
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto px-8 transition-all shadow-lg shadow-blue-600/20" 
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menyimpan...
        </>
      ) : (
        <>
          <Save className="mr-2 h-4 w-4" /> Simpan Perubahan
        </>
      )}
    </Button>
  );
}

export default function EditPerangkatForm({ initialData }: EditPerangkatFormProps) {
  const router = useRouter();
  
  // PERBAIKAN: Gunakan action langsung tanpa bind
  const [state, formAction] = useActionState(updatePerangkat, null);
  
  const [imageUrl, setImageUrl] = useState(initialData.foto || "");

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      router.push("/admin/perangkat");
    } else if (state?.success === false) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* PERBAIKAN: Kirim ID lewat Hidden Input */}
      <input type="hidden" name="id" value={initialData.id} />

      {/* --- KOLOM KIRI: UPLOAD FOTO --- */}
      <div className="lg:col-span-4 space-y-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                Foto Profil
            </h3>
            
            <div className="bg-gray-50/50 p-2 rounded-xl border border-dashed border-gray-200">
                <ImageUpload 
                    value={imageUrl} 
                    onChange={setImageUrl} 
                    //onRemove={() => setImageUrl("")} 
                />
            </div>
            
            <input type="hidden" name="foto" value={imageUrl} />
        </div>
      </div>

      {/* --- KOLOM KANAN: FORM INPUT --- */}
      <div className="lg:col-span-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nama */}
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Lengkap & Gelar</Label>
                  <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input id="nama" name="nama" defaultValue={initialData.nama} required className="pl-9 bg-gray-50/50 border-gray-200 focus:bg-white transition-all" />
                  </div>
                </div>

                {/* NIP */}
                <div className="space-y-2">
                  <Label htmlFor="nip">NIP (Opsional)</Label>
                  <div className="relative">
                      <Hash className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input id="nip" name="nip" defaultValue={initialData.nip || ""} className="pl-9 bg-gray-50/50 border-gray-200 focus:bg-white transition-all" />
                  </div>
                </div>

                {/* Jabatan */}
                <div className="space-y-2">
                  <Label htmlFor="jabatan">Jabatan</Label>
                  <div className="relative">
                      <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input id="jabatan" name="jabatan" defaultValue={initialData.jabatan} required className="pl-9 bg-gray-50/50 border-gray-200 focus:bg-white transition-all" />
                  </div>
                </div>

                {/* Jenis Jabatan */}
                <div className="space-y-2">
                  <Label htmlFor="jenisJabatan">Golongan Jabatan</Label>
                  <div className="relative">
                      <FileText className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <select 
                        id="jenisJabatan" 
                        name="jenisJabatan" 
                        defaultValue={initialData.jenisJabatan}
                        className="flex h-10 w-full rounded-md border border-gray-200 bg-gray-50/50 px-3 py-2 pl-9 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:bg-white transition-all"
                      >
                        <option value="LURAH">Lurah / Kepala Desa</option>
                        <option value="SEKRETARIS">Sekretaris</option>
                        <option value="KASI">Kasi / Kaur</option>
                        <option value="STAFF">Staff / Pelaksana</option>
                        <option value="LAINNYA">Lainnya</option>
                      </select>
                  </div>
                </div>

                {/* Telepon */}
                <div className="space-y-2">
                  <Label htmlFor="telepon">Nomor Telepon / WA</Label>
                  <div className="relative">
                      <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input id="telepon" name="telepon" defaultValue={initialData.telepon || ""} className="pl-9 bg-gray-50/50 border-gray-200 focus:bg-white transition-all" />
                  </div>
                </div>

                 {/* Urutan */}
                 <div className="space-y-2">
                  <Label htmlFor="urutan">Urutan Tampilan</Label>
                  <Input id="urutan" name="urutan" type="number" defaultValue={initialData.urutan} min="0" className="bg-gray-50/50 border-gray-200 focus:bg-white transition-all" />
                </div>
            </div>

            {/* Footer Action */}
            <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-400">
                   Perubahan akan langsung tampil di website.
                </p>
                <SubmitButton />
            </div>
        </div>
      </div>
    </form>
  );
}