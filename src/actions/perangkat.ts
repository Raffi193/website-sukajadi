// src/app/actions/perangkat.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { redirect } from "next/navigation"; <--- HAPUS INI (Redirect dihandle Client)

export async function createPerangkat(prevState: any, formData: FormData) {
  const nama = formData.get("nama") as string;
  const nip = formData.get("nip") as string;
  const jabatan = formData.get("jabatan") as string;
  const jenisJabatan = formData.get("jenisJabatan") as any;
  const foto = formData.get("foto") as string; // Ini nanti berisi URL dari ImageUpload
  const telepon = formData.get("telepon") as string;
  const urutan = parseInt(formData.get("urutan") as string) || 0;

  try {
    // Validasi Sederhana
    if (!nama || !jabatan) {
        return { success: false, message: "Nama dan Jabatan wajib diisi!" };
    }

    await prisma.perangkatKelurahan.create({
      data: {
        nama,
        nip: nip || null, // Jika string kosong, simpan null agar tidak error unique constraint
        jabatan,
        jenisJabatan,
        foto: foto || null,
        telepon: telepon || null,
        urutan,
      },
    });

    revalidatePath("/admin/perangkat");
    return { success: true, message: "Perangkat berhasil ditambahkan!" };

  } catch (error: any) {
    console.error("Error Create Perangkat:", error);
    // Cek error unique NIP
    if (error.code === 'P2002') {
        return { success: false, message: "Gagal: NIP tersebut sudah terdaftar." };
    }
    return { success: false, message: "Terjadi kesalahan server saat menyimpan data." };
  }
}

export async function updatePerangkat(prevState: any, formData: FormData) {
  // Ambil ID dari hidden input form
  const id = formData.get("id") as string; 
  
  const nama = formData.get("nama") as string;
  const nip = formData.get("nip") as string;
  const jabatan = formData.get("jabatan") as string;
  const jenisJabatan = formData.get("jenisJabatan") as any;
  const foto = formData.get("foto") as string;
  const telepon = formData.get("telepon") as string;
  const urutan = parseInt(formData.get("urutan") as string) || 0;

  try {
    if (!id) {
        return { success: false, message: "ID Perangkat tidak ditemukan." };
    }

    if (!nama || !jabatan) {
        return { success: false, message: "Nama dan Jabatan wajib diisi!" };
    }

    await prisma.perangkatKelurahan.update({
      where: { id },
      data: {
        nama,
        nip: nip || null,
        jabatan,
        jenisJabatan,
        foto: foto || null,
        telepon: telepon || null,
        urutan,
      },
    });

    revalidatePath("/admin/perangkat");
    return { success: true, message: "Data perangkat berhasil diperbarui!" };

  } catch (error: any) {
    console.error("Error Update Perangkat:", error);
    if (error.code === 'P2002') {
        return { success: false, message: "Gagal: NIP tersebut sudah digunakan orang lain." };
    }
    return { success: false, message: "Terjadi kesalahan server saat update data." };
  }
}

export async function deletePerangkat(id: string) {
    try {
        await prisma.perangkatKelurahan.delete({ where: { id } });
        revalidatePath("/admin/perangkat");
        return { success: true, message: "Dihapus" };
    } catch (e) {
        return { success: false, message: "Gagal hapus" };
    }
}