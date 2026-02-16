"use client";

// 1. UBAH IMPORT: useActionState dari "react", useFormStatus tetap dari "react-dom"
import { useActionState, useEffect } from "react"; 
import { useFormStatus } from "react-dom";
import { createKategori } from "@/src/app/actions/kategori";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Komponen Tombol Submit agar bisa loading
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menyimpan...
        </>
      ) : (
        <>
          <Save className="mr-2 h-4 w-4" /> Simpan Kategori
        </>
      )}
    </Button>
  );
}

export default function CreateKategoriForm() {
  const router = useRouter();
  
  // 2. GANTI HOOK: useFormState -> useActionState
  const [state, formAction] = useActionState(createKategori, null);

  // Efek untuk memantau perubahan State (Sukses/Gagal)
  useEffect(() => {
    if (state) {
      if (state.success) {
        toast.success(state.message); // Notifikasi Sukses
        // Redirect manual setelah sukses agar user sempat lihat notifikasi
        setTimeout(() => {
            router.push("/admin/kategori");
        }, 1000);
      } else {
        toast.error(state.message); // Notifikasi Gagal (Sudah ada)
      }
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nama">Nama Kategori</Label>
        <Input
          id="nama"
          name="nama"
          placeholder="Contoh: Pemerintahan, Kesehatan..."
          required
        />
        <p className="text-xs text-gray-500">
          Slug URL akan dibuat otomatis. Pastikan nama belum pernah dipakai.
        </p>
      </div>

      <div className="flex justify-end pt-4">
        <SubmitButton />
      </div>
    </form>
  );
}