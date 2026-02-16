'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

// --- CREATE GALERI ---
export async function createGaleri(formData: FormData, thumbnailUrl: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Cari User ID internal database (jika menggunakan Clerk)
  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) throw new Error("User not found");

  const judul = formData.get("judul") as string;
  const deskripsi = formData.get("deskripsi") as string;
  const lokasi = formData.get("lokasi") as string;
  const tanggal = new Date(formData.get("tanggal") as string);
  const isPublished = formData.get("isPublished") === "on";

  // Buat Slug Unik
  const slug = judul.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") + "-" + Date.now();

  try {
    await prisma.galeri.create({
      data: {
        judul,
        slug,
        deskripsi,
        lokasi,
        tanggal,
        thumbnail: thumbnailUrl,
        isPublished,
        authorId: user.id,
      },
    });

    revalidatePath("/admin/galeri");
    return { success: true };
  } catch (error) {
    console.error("Gagal buat galeri:", error);
    throw new Error("Gagal menyimpan galeri");
  }
}

// --- DELETE GALERI ---
export async function deleteGaleri(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    await prisma.galeri.delete({ where: { id } });
    revalidatePath("/admin/galeri");
    return { success: true };
  } catch (error) {
    console.error("Gagal hapus:", error);
    throw new Error("Gagal menghapus galeri");
  }
}