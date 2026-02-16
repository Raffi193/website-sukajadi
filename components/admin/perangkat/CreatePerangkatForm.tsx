"use client";

import { useState, useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createPerangkat } from "@/src/app/actions/perangkat";
import { ImageUpload } from "@/components/admin/berita/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save, User, Briefcase, Hash, Phone, FileText } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
          <Save className="mr-2 h-4 w-4" /> Simpan Data
        </>
      )}
    </Button>
  );
}

export default function CreatePerangkatForm() {
  const router = useRouter();
  const [state, formAction] = useActionState(createPerangkat, null);
  const [imageUrl, setImageUrl] = useState("");

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
      
      {/* --- KOLOM KIRI: UPLOAD FOTO (4 Kolom) --- */}
      <div className="lg:col-span-4 space-y-4">
        {/* Card Upload dengan Shadow Halus */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                Foto Profil
            </h3>
            
            <div className="bg-gray-50/50 p-2 rounded-xl border border-dashed border-gray-200">
                <ImageUpload 
                    value={imageUrl} 
                    onChange={setImageUrl} 
                />
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-xs rounded-lg leading-relaxed">
                <strong>Tips:</strong> Gunakan foto formal dengan latar belakang polos. Format JPG/PNG, maksimal 2MB.
            </div>
            
            <input type="hidden" name="foto" value={imageUrl} />
        </div>
      </div>

      {/* --- KOLOM KANAN: FORM INPUT (8 Kolom) --- */}
      <div className="lg:col-span-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nama */}
                <div className="space-y-2">
                  <Label htmlFor="nama" className="text-gray-700 font-medium">Nama Lengkap & Gelar</Label>
                  <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input id="nama" name="nama" placeholder="Contoh: H. Budi Santoso, S.Sos" required className="pl-9 bg-gray-50/50 border-gray-200 focus:bg-white transition-all" />
                  </div>
                </div>

                {/* NIP */}
                <div className="space-y-2">
                  <Label htmlFor="nip" className="text-gray-700 font-medium">NIP (Opsional)</Label>
                  <div className="relative">
                      <Hash className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input id="nip" name="nip" placeholder="19XXXXXXXXXXXX" className="pl-9 bg-gray-50/50 border-gray-200 focus:bg-white transition-all" />
                  </div>
                </div>

                {/* Jabatan */}
                <div className="space-y-2">
                  <Label htmlFor="jabatan" className="text-gray-700 font-medium">Jabatan</Label>
                  <div className="relative">
                      <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input id="jabatan" name="jabatan" placeholder="Contoh: Lurah Sukajadi" required className="pl-9 bg-gray-50/50 border-gray-200 focus:bg-white transition-all" />
                  </div>
                </div>

                {/* Jenis Jabatan */}
                <div className="space-y-2">
                  <Label htmlFor="jenisJabatan" className="text-gray-700 font-medium">Golongan Jabatan</Label>
                  <div className="relative">
                      <FileText className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <select 
                        id="jenisJabatan" 
                        name="jenisJabatan" 
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
                  <Label htmlFor="telepon" className="text-gray-700 font-medium">Nomor Telepon / WA</Label>
                  <div className="relative">
                      <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input id="telepon" name="telepon" placeholder="08XXXXXXXXXX" className="pl-9 bg-gray-50/50 border-gray-200 focus:bg-white transition-all" />
                  </div>
                </div>

                 {/* Urutan */}
                 <div className="space-y-2">
                  <Label htmlFor="urutan" className="text-gray-700 font-medium">Urutan Tampilan</Label>
                  <Input id="urutan" name="urutan" type="number" defaultValue="0" min="0" className="bg-gray-50/50 border-gray-200 focus:bg-white transition-all" />
                  <p className="text-[10px] text-gray-400 mt-1">Angka 0 akan tampil paling atas.</p>
                </div>
            </div>

            {/* Footer Action */}
            <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-400">
                    Pastikan data yang dimasukkan sudah benar.
                </p>
                <SubmitButton />
            </div>
        </div>
      </div>
    </form>
  );
}