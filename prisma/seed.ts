import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Buat Kategori Berita
  console.log('Creating kategori berita...')
  
  const kategoris = [
    {
      nama: 'Pemerintahan',
      slug: 'pemerintahan',
      deskripsi: 'Berita seputar pemerintahan kelurahan',
      urutan: 1,
    },
    {
      nama: 'Kegiatan Warga',
      slug: 'kegiatan-warga',
      deskripsi: 'Kegiatan dan gotong royong warga',
      urutan: 2,
    },
    {
      nama: 'Kesehatan',
      slug: 'kesehatan',
      deskripsi: 'Informasi kesehatan dan posyandu',
      urutan: 3,
    },
    {
      nama: 'Ekonomi',
      slug: 'ekonomi',
      deskripsi: 'UMKM dan ekonomi warga',
      urutan: 4,
    },
    {
      nama: 'Pembangunan',
      slug: 'pembangunan',
      deskripsi: 'Pembangunan infrastruktur kelurahan',
      urutan: 5,
    },
    {
      nama: 'Sosial',
      slug: 'sosial',
      deskripsi: 'Kegiatan sosial kemasyarakatan',
      urutan: 6,
    },
  ]

  for (const kategori of kategoris) {
    await prisma.kategoriBerita.upsert({
      where: { slug: kategori.slug },
      update: {},
      create: kategori,
    })
  }

  console.log('✅ Kategori berita created')

  // Buat Profil Kelurahan (jika belum ada)
  console.log('Creating profil kelurahan...')
  
  await prisma.profilKelurahan.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      namaKelurahan: 'Kelurahan Sukajadi',
      kodePos: '30263',
      alamat: 'Jl. Raya Sukajadi No. 123',
      nomorTelepon: '021-1234567',
      email: 'info@kelurahan-sukajadi.go.id',
      visiMisi: 'Mewujudkan kelurahan yang maju, sejahtera, dan berbudaya',
      sejarah: 'Kelurahan Sukajadi didirikan pada tahun...',
      luasWilayah: '2.5 km²',
      jumlahRW: 10,
      jumlahRT: 50,
      jumlahPenduduk: 15000,
      jumlahKK: 4000,
    },
  })

  console.log('✅ Profil kelurahan created')

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })