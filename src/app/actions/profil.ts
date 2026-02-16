'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

// --- GET PROFIL ---
export async function getProfilKelurahan() {
  // Ambil data pertama (karena profil desa cuma satu)
  const profil = await prisma.profilKelurahan.findFirst();
  return profil;
}

// --- UPDATE / CREATE PROFIL ---
export async function updateProfilKelurahan(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Ambil semua data dari form
  const rawData: any = {};
  formData.forEach((value, key) => {
    // Konversi angka jika perlu
    if (['jumlahRW', 'jumlahRT', 'jumlahPenduduk', 'jumlahKK'].includes(key)) {
      rawData[key] = value ? parseInt(value.toString()) : 0;
    } else {
      rawData[key] = value;
    }
  });

  try {
    // Cek apakah data sudah ada
    const existing = await prisma.profilKelurahan.findFirst();

    if (existing) {
      // UPDATE
      await prisma.profilKelurahan.update({
        where: { id: existing.id },
        data: rawData,
      });
    } else {
      // CREATE BARU
      await prisma.profilKelurahan.create({
        data: rawData,
      });
    }

    revalidatePath("/profil"); // Refresh halaman public
    revalidatePath("/admin/profil"); // Refresh halaman admin
    return { success: true };
  } catch (error) {
    console.error("Gagal update profil:", error);
    throw new Error("Gagal menyimpan data profil.");
  }
}