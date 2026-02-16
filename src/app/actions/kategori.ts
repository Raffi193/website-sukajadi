// src/app/actions/kategori.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client"; // Import Prisma error type

// Definisikan tipe return agar TypeScript tidak bingung
export type KategoriState = {
  success: boolean;
  message: string;
} | null;

export async function createKategori(prevState: KategoriState, formData: FormData): Promise<KategoriState> {
  const nama = formData.get("nama") as string;

  if (!nama || nama.trim() === "") {
    return { success: false, message: "Nama kategori tidak boleh kosong" };
  }

  const slug = nama
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  try {
    await prisma.kategoriBerita.create({
      data: { nama, slug },
    });

    // Jika berhasil, revalidate path
    revalidatePath("/admin/kategori");
    
    
  } catch (error) {
    // Cek Error Prisma code P2002 (Unique Constraint Violation)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { success: false, message: "Gagal: Nama Kategori tersebut sudah ada!" };
      }
    }
    
    console.error("Database Error:", error);
    return { success: false, message: "Terjadi kesalahan sistem" };
  }

  // Redirect dilakukan di luar try-catch agar tidak dianggap error oleh Next.js
  // Namun, karena kita butuh kirim pesan sukses ke client, kita bisa return success dulu.
  // ATAU: Kita return success: true, lalu client yang melakukan redirect.
  // Untuk kasus ini, kita return success, nanti Client Component yang handle redirectnya.
  return { success: true, message: "Kategori berhasil ditambahkan!" };
}

export async function deleteKategori(id: string) {
  try {
    await prisma.kategoriBerita.delete({
      where: { id },
    });
    revalidatePath("/admin/kategori");
  } catch (error) {
    console.log("Error delete:", error);
  }
}