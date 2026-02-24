'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// HAPUS import redirect ini, kita tidak pakai di server action lagi
// import { redirect } from "next/navigation"; 
import { JenisAgenda } from "@prisma/client";
import { auth } from "@clerk/nextjs/server"; 

export async function createAgenda(formData: FormData, thumbnailUrl: string) {
  
  // 1. Cek User Login via Clerk
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new Error("Unauthorized: Anda harus login untuk menambah agenda.");
  }

  // 2. Cari User di Database
  const user = await prisma.user.findUnique({
    where: { clerkId: clerkId },
  });

  if (!user) {
    throw new Error("User tidak ditemukan di database sistem.");
  }

  // 3. Ambil Data Form
  const judul = formData.get("judul") as string;
  const deskripsi = formData.get("deskripsi") as string;
  const lokasi = formData.get("lokasi") as string;
  const tanggalMulai = new Date(formData.get("tanggalMulai") as string);
  
  const tanggalSelesaiRaw = formData.get("tanggalSelesai");
  const tanggalSelesai = tanggalSelesaiRaw ? new Date(tanggalSelesaiRaw as string) : null;
  
  const waktuMulai = formData.get("waktuMulai") as string;
  const waktuSelesai = formData.get("waktuSelesai") as string;
  const penyelenggara = formData.get("penyelenggara") as string;
  const jenis = formData.get("jenis") as JenisAgenda;

  // 4. Buat Slug
  const slug = judul.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") + "-" + Date.now();

  try {
    await prisma.agenda.create({
      data: {
        judul,
        slug,
        deskripsi,
        lokasi,
        tanggalMulai,
        tanggalSelesai,
        waktuMulai,
        waktuSelesai,
        jenis,
        penyelenggara,
        thumbnail: thumbnailUrl,
        authorId: user.id, 
        isPublished: true,
      },
    });
  } catch (error) {
    console.error("Gagal membuat agenda:", error);
    throw new Error("Gagal menyimpan agenda");
  }

  // Refresh cache halaman admin dan home
  revalidatePath("/admin/agenda");
  revalidatePath("/");

  // --- PERBAIKAN DI SINI ---
  // Jangan gunakan redirect() di sini karena akan dianggap error oleh try/catch di frontend
  return { success: true };
}

// --- DELETE ---
// (Bagian delete tidak perlu diubah jika tidak menggunakan redirect)
export async function deleteAgenda(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    await prisma.agenda.delete({ where: { id } });
    revalidatePath("/admin/agenda");
    revalidatePath("/");
  } catch (error) {
    console.error("Gagal hapus:", error);
    throw new Error("Gagal menghapus agenda");
  }
}