'use server'

import { revalidatePath } from 'next/cache'
import { z } from "zod"
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { generateSlug } from '@/lib/helpers'

// Types
export type BeritaFormData = {
  judul: string
  slug?: string
  konten: string
  excerpt?: string
  thumbnail?: string
  kategoriId: string
  isPublished: boolean
  isPinned?: boolean
}

// GET: List berita dengan pagination dan filter
export async function getBerita(params?: {
  page?: number
  limit?: number
  kategoriId?: string
  search?: string
  isPublished?: boolean
}) {
  try {
    const { page = 1, limit = 10, kategoriId, search, isPublished } = params || {}
    const skip = (page - 1) * limit

    const where: any = {}

    if (kategoriId) where.kategoriId = kategoriId
    if (isPublished !== undefined) where.isPublished = isPublished
    if (search) {
      where.OR = [
        { judul: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [berita, total] = await Promise.all([
      prisma.berita.findMany({
        where,
        include: {
          kategori: true,
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: [
          { isPinned: 'desc' },
          { createdAt: 'desc' }
        ],
        skip,
        take: limit,
      }),
      prisma.berita.count({ where }),
    ])

    return {
      success: true,
      data: berita,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }
  } catch (error) {
    console.error('Error fetching berita:', error)
    return {
      success: false,
      error: 'Gagal mengambil data berita',
      data: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
      },
    }
  }
}

// GET: Single berita by ID atau slug
export async function getBeritaById(idOrSlug: string) {
  try {
    const berita = await prisma.berita.findFirst({
      where: {
        OR: [
          { id: idOrSlug },
          { slug: idOrSlug },
        ],
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
    })

    if (!berita) {
      return {
        success: false,
        error: 'Berita tidak ditemukan',
      }
    }

    // Increment view count
    await prisma.berita.update({
      where: { id: berita.id },
      data: { viewCount: { increment: 1 } },
    })

    return {
      success: true,
      data: berita,
    }
  } catch (error) {
    console.error('Error fetching berita:', error)
    return {
      success: false,
      error: 'Gagal mengambil data berita',
    }
  }
}

// CREATE: Buat berita baru
export async function createBerita(data: BeritaFormData) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return {
        success: false,
        error: 'Unauthorized',
      }
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      return {
        success: false,
        error: 'User tidak ditemukan',
      }
    }

    // Generate slug dari judul jika tidak ada
    const slug = data.slug || generateSlug(data.judul)

    // Check apakah slug sudah ada
    const existingBerita = await prisma.berita.findUnique({
      where: { slug },
    })

    if (existingBerita) {
      return {
        success: false,
        error: 'Slug sudah digunakan',
      }
    }

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
      include: {
        kategori: true,
        author: true,
      },
    })

    revalidatePath('/admin/berita')
    revalidatePath('/berita')
    revalidatePath('/')

    return {
      success: true,
      data: berita,
      message: 'Berita berhasil dibuat',
    }
  } catch (error) {
    console.error('Error creating berita:', error)
    return {
      success: false,
      error: 'Gagal membuat berita',
    }
  }
}

// UPDATE: Update berita
export async function updateBerita(id: string, data: BeritaFormData) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return {
        success: false,
        error: 'Unauthorized',
      }
    }

    // Check apakah berita ada
    const existingBerita = await prisma.berita.findUnique({
      where: { id },
    })

    if (!existingBerita) {
      return {
        success: false,
        error: 'Berita tidak ditemukan',
      }
    }

    // Generate slug baru jika judul berubah
    const slug = data.slug || generateSlug(data.judul)

    // Check slug conflict (kecuali untuk berita yang sama)
    if (slug !== existingBerita.slug) {
      const slugExists = await prisma.berita.findUnique({
        where: { slug },
      })

      if (slugExists) {
        return {
          success: false,
          error: 'Slug sudah digunakan',
        }
      }
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
        publishedAt: data.isPublished && !existingBerita.isPublished 
          ? new Date() 
          : existingBerita.publishedAt,
      },
      include: {
        kategori: true,
        author: true,
      },
    })

    revalidatePath('/admin/berita')
    revalidatePath('/berita')
    revalidatePath(`/berita/${berita.slug}`)
    revalidatePath('/')

    return {
      success: true,
      data: berita,
      message: 'Berita berhasil diupdate',
    }
  } catch (error) {
    console.error('Error updating berita:', error)
    return {
      success: false,
      error: 'Gagal mengupdate berita',
    }
  }
}

// DELETE: Hapus berita
export async function deleteBerita(id: string) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return {
        success: false,
        error: 'Unauthorized',
      }
    }

    await prisma.berita.delete({
      where: { id },
    })

    revalidatePath('/admin/berita')
    revalidatePath('/berita')
    revalidatePath('/')

    return {
      success: true,
      message: 'Berita berhasil dihapus',
    }
  } catch (error) {
    console.error('Error deleting berita:', error)
    return {
      success: false,
      error: 'Gagal menghapus berita',
    }
  }
}

// HELPER: Get all kategori untuk dropdown
export async function getKategoriBerita() {
  try {
    const kategori = await prisma.kategoriBerita.findMany({
      orderBy: { urutan: 'asc' },
    })

    return {
      success: true,
      data: kategori,
    }
  } catch (error) {
    console.error('Error fetching kategori:', error)
    return {
      success: false,
      error: 'Gagal mengambil kategori',
      data: [],
    }
  }
}