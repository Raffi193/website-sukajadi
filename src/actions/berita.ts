"use server";

import { unstable_cache, revalidatePath, revalidateTag, updateTag } from "next/cache";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateSlug } from "@/lib/helpers";

// Types
export type BeritaFormData = {
  judul: string;
  slug?: string;
  konten: string;
  excerpt?: string;
  thumbnail?: string;
  kategoriId: string;
  isPublished: boolean;
  isPinned?: boolean;
};

async function fetchBeritaFromDb(params?: {
  page?: number;
  limit?: number;
  kategoriId?: string;
  search?: string;
  isPublished?: boolean;
}) {
  try {
    const {
      page = 1,
      limit = 10,
      kategoriId,
      search,
      isPublished,
    } = params || {};
    const skip = (page - 1) * limit;

    const where: any = {};

    if (kategoriId) where.kategoriId = kategoriId;
    if (isPublished !== undefined) where.isPublished = isPublished;
    if (search) {
      where.OR = [
        { judul: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
      ];
    }

    const [berita, total] = await Promise.all([
      prisma.berita.findMany({
        where,
        // PERBAIKAN: Gunakan select untuk mencegah load 'konten' yang berat di halaman list
        select: {
          id: true,
          judul: true,
          slug: true,
          excerpt: true,
          thumbnail: true,
          isPublished: true,
          isPinned: true,
          createdAt: true,
          publishedAt: true,
          viewCount: true,
          kategori: true,
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
        skip,
        take: limit,
      }),
      prisma.berita.count({ where }),
    ]);

    return {
      success: true,
      data: berita,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Error fetching berita:", error);
    return {
      success: false,
      error: "Gagal mengambil data berita",
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
    };
  }
}

async function fetchBeritaByIdFromDb(idOrSlug: string) {
  try {
    const berita = await prisma.berita.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: {
        kategori: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });

    if (!berita) {
      return { success: false, error: "Berita tidak ditemukan" };
    }

    // PERBAIKAN: Logika increment view count dihilangkan dari fungsi fetching ini
    // agar kompatibel dengan sistem cache dan tidak memblokir koneksi database.

    return {
      success: true,
      data: berita,
    };
  } catch (error) {
    console.error("Error fetching berita detail:", error);
    return { success: false, error: "Gagal mengambil data berita" };
  }
}

// ----------------------------------------------------------------------
// FUNGSI BARU: Untuk menambah view count yang dipanggil secara terpisah
// ----------------------------------------------------------------------
export async function incrementViewCount(id: string) {
  try {
    await prisma.berita.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
      select: { id: true } // Return sekecil mungkin agar cepat
    });
  } catch (error) {
    console.error("Gagal update view count:", error);
  }
}

// ----------------------------------------------------------------------
// EXPORTED CACHED FUNCTIONS
// ----------------------------------------------------------------------

export const getBerita = unstable_cache(
  async (params?: any) => fetchBeritaFromDb(params),
  ["berita-list-cache"],
  { revalidate: 60, tags: ["berita"] }
);

export const getBeritaById = unstable_cache(
  async (idOrSlug: string) => fetchBeritaByIdFromDb(idOrSlug),
  ["berita-detail-cache"], 
  { revalidate: 60, tags: ["berita"] }
);

// ----------------------------------------------------------------------
// MUTATIONS (Create, Update, Delete)
// ----------------------------------------------------------------------

export async function createBerita(data: BeritaFormData) {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) return { success: false, error: "User tidak ditemukan" };

    const slug = data.slug || generateSlug(data.judul);
    const existingBerita = await prisma.berita.findUnique({ where: { slug } });
    
    if (existingBerita) return { success: false, error: "Slug sudah digunakan" };

    const berita = await prisma.berita.create({
      data: {
        judul: data.judul,
        slug,
        konten: data.konten,
        excerpt: data.excerpt || data.konten.substring(0, 150),
        thumbnail: data.thumbnail,
        kategoriId: data.kategoriId,
        authorId: user.id,
        isPublished: data.isPublished,
        isPinned: data.isPinned || false,
        publishedAt: data.isPublished ? new Date() : null,
      },
    });

    // PERBAIKAN: Gunakan revalidateTag untuk menghapus unstable_cache secara langsung
    updateTag("berita");
    revalidatePath("/admin/berita");
    revalidatePath("/berita");
    revalidatePath("/");

    return { success: true, data: berita, message: "Berita berhasil dibuat" };
  } catch (error) {
    console.error("Error creating berita:", error);
    return { success: false, error: "Gagal membuat berita" };
  }
}

export async function updateBerita(id: string, data: BeritaFormData) {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    const existingBerita = await prisma.berita.findUnique({ where: { id } });
    if (!existingBerita) return { success: false, error: "Berita tidak ditemukan" };

    const slug = data.slug || generateSlug(data.judul);

    if (slug !== existingBerita.slug) {
      const slugExists = await prisma.berita.findUnique({ where: { slug } });
      if (slugExists) return { success: false, error: "Slug sudah digunakan" };
    }

    const berita = await prisma.berita.update({
      where: { id },
      data: {
        judul: data.judul,
        slug,
        konten: data.konten,
        excerpt: data.excerpt || data.konten.substring(0, 150),
        thumbnail: data.thumbnail,
        kategoriId: data.kategoriId,
        isPublished: data.isPublished,
        isPinned: data.isPinned || false,
        publishedAt: data.isPublished && !existingBerita.isPublished ? new Date() : existingBerita.publishedAt,
      },
    });

    // PERBAIKAN
    updateTag("berita");
    revalidatePath("/admin/berita");
    revalidatePath("/berita");
    revalidatePath(`/berita/${berita.slug}`);
    revalidatePath("/");

    return { success: true, data: berita, message: "Berita berhasil diupdate" };
  } catch (error) {
    console.error("Error updating berita:", error);
    return { success: false, error: "Gagal mengupdate berita" };
  }
}

export async function deleteBerita(id: string) {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    await prisma.berita.delete({ where: { id } });

    // PERBAIKAN
    updateTag("berita");
    revalidatePath("/admin/berita");
    revalidatePath("/berita");
    revalidatePath("/");

    return { success: true, message: "Berita berhasil dihapus" };
  } catch (error) {
    console.error("Error deleting berita:", error);
    return { success: false, error: "Gagal menghapus berita" };
  }
}

export async function getKategoriBerita() {
  try {
    const kategori = await prisma.kategoriBerita.findMany({
      orderBy: { urutan: "asc" },
    });

    return {
      success: true,
      data: kategori,
    };
  } catch (error) {
    console.error("Error fetching kategori:", error);
    return {
      success: false,
      error: "Gagal mengambil kategori",
      data: [],
    };
  }
}