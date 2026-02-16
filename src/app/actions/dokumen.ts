'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

// Kita terima 3 argumen: formData, dokumenUrl, dan dokumenSize
export async function createDokumen(formData: FormData, dokumenUrl: string, dokumenSize: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const judul = formData.get("judul") as string;

  if (!judul || !dokumenUrl) {
    throw new Error("Judul dan File wajib diisi");
  }

  try {
    await prisma.dokumenPublik.create({
      data: {
        judul,
        url: dokumenUrl, // Simpan URL dari parameter
        path: dokumenUrl, // Simpan Path dari parameter
        ukuran: dokumenSize, // Simpan Ukuran dari parameter
      },
    });

    revalidatePath("/admin/layanan");
    revalidatePath("/layanan");
    return { success: true };
  } catch (error: any) {
    console.error("Gagal buat dokumen:", error);
    return { error: error.message || "Gagal menyimpan dokumen" };
  }
}

export async function deleteDokumen(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    await prisma.dokumenPublik.delete({ where: { id } });
    revalidatePath("/admin/layanan");
    revalidatePath("/layanan");
    return { success: true };
  } catch (error) {
    return { error: "Gagal menghapus dokumen" };
  }
}