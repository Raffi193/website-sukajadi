'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { KategoriPengumuman } from "@prisma/client"; // Import Enum dari Prisma

// --- CREATE ---
export async function createPengumuman(formData: FormData, dokumenUrl: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Cari User Database
  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) throw new Error("User not found");

  // Ambil Data Form
  const judul = formData.get("judul") as string;
  const isi = formData.get("isi") as string;
  const kategori = formData.get("kategori") as KategoriPengumuman;
  const tanggal = new Date(formData.get("tanggal") as string);

  // Buat Slug Unik
  const slug = judul.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") + "-" + Date.now();

  try {
    await prisma.pengumuman.create({
      data: {
        judul,
        slug,
        isi,
        kategori,
        tanggal,
        dokumenUrl: dokumenUrl || null, // Jika kosong, set null
        authorId: user.id,
        isPublished: true,
      },
    });

    revalidatePath("/admin/pengumuman");
    return { success: true };
  } catch (error) {
    console.error("Gagal buat pengumuman:", error);
    throw new Error("Gagal menyimpan pengumuman");
  }
}

// ... import yang sudah ada sebelumnya ...

// --- UPDATE ---
export async function updatePengumuman(id: string, formData: FormData, dokumenUrl: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Ambil Data Form
  const judul = formData.get("judul") as string;
  const isi = formData.get("isi") as string;
  const kategori = formData.get("kategori") as KategoriPengumuman;
  const tanggal = new Date(formData.get("tanggal") as string);

  // Update Slug (Opsional: jika ingin slug berubah mengikuti judul baru)
  const slug = judul.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") + "-" + Date.now();

  try {
    await prisma.pengumuman.update({
      where: { id },
      data: {
        judul,
        slug, // Hapus baris ini jika slug tidak ingin berubah
        isi,
        kategori,
        tanggal,
        dokumenUrl: dokumenUrl || null,
        // Author tidak perlu diupdate
      },
    });

    revalidatePath("/admin/pengumuman");
    return { success: true };
  } catch (error) {
    console.error("Gagal update pengumuman:", error);
    throw new Error("Gagal mengupdate pengumuman");
  }
}

// --- DELETE ---
export async function deletePengumuman(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    await prisma.pengumuman.delete({ where: { id } });
    revalidatePath("/admin/pengumuman");
  } catch (error) {
    console.error("Gagal hapus:", error);
    throw new Error("Gagal menghapus pengumuman");
  }
}