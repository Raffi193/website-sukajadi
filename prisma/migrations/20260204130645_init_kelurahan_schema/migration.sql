-- CreateEnum
CREATE TYPE "JenisPengumuman" AS ENUM ('UMUM', 'PENTING', 'DARURAT', 'LAYANAN', 'ACARA');

-- CreateEnum
CREATE TYPE "PrioritasPengumuman" AS ENUM ('RENDAH', 'NORMAL', 'TINGGI', 'URGENT');

-- CreateEnum
CREATE TYPE "JenisAgenda" AS ENUM ('KEGIATAN', 'RAPAT', 'SOSIALISASI', 'PELAYANAN', 'LAINNYA');

-- CreateEnum
CREATE TYPE "JenisJabatan" AS ENUM ('LURAH', 'SEKRETARIS', 'KASI', 'STAFF', 'LAINNYA');

-- CreateEnum
CREATE TYPE "KategoriDokumen" AS ENUM ('PERATURAN', 'SK_LURAH', 'LAPORAN', 'FORMULIR', 'PROSEDUR', 'LAINNYA');

-- CreateEnum
CREATE TYPE "KategoriPengaduan" AS ENUM ('INFRASTRUKTUR', 'KEBERSIHAN', 'KEAMANAN', 'ADMINISTRASI', 'PELAYANAN', 'SOSIAL', 'LAINNYA');

-- CreateEnum
CREATE TYPE "StatusPengaduan" AS ENUM ('PENDING', 'DIPROSES', 'SELESAI', 'DITOLAK');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "berita" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "excerpt" TEXT,
    "thumbnail" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "authorId" TEXT NOT NULL,
    "kategoriId" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "berita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kategori_berita" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "deskripsi" TEXT,
    "icon" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kategori_berita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profil_kelurahan" (
    "id" TEXT NOT NULL,
    "namaKelurahan" TEXT NOT NULL,
    "kodePos" TEXT,
    "alamat" TEXT NOT NULL,
    "nomorTelepon" TEXT,
    "email" TEXT,
    "website" TEXT,
    "sejarah" TEXT,
    "visiMisi" TEXT,
    "luasWilayah" TEXT,
    "batasUtara" TEXT,
    "batasSelatan" TEXT,
    "batasTimur" TEXT,
    "batasBarat" TEXT,
    "jumlahRW" INTEGER,
    "jumlahRT" INTEGER,
    "jumlahPenduduk" INTEGER,
    "jumlahKK" INTEGER,
    "facebook" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "youtube" TEXT,
    "logo" TEXT,
    "gambarKantor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profil_kelurahan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pengumuman" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "jenis" "JenisPengumuman" NOT NULL DEFAULT 'UMUM',
    "prioritas" "PrioritasPengumuman" NOT NULL DEFAULT 'NORMAL',
    "file" TEXT,
    "thumbnail" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,
    "tanggalMulai" TIMESTAMP(3),
    "tanggalAkhir" TIMESTAMP(3),
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pengumuman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agenda" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "lokasi" TEXT NOT NULL,
    "tanggalMulai" TIMESTAMP(3) NOT NULL,
    "tanggalSelesai" TIMESTAMP(3),
    "waktuMulai" TEXT,
    "waktuSelesai" TEXT,
    "jenis" "JenisAgenda" NOT NULL DEFAULT 'KEGIATAN',
    "penyelenggara" TEXT,
    "thumbnail" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agenda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "galeri" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "deskripsi" TEXT,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "lokasi" TEXT,
    "thumbnail" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "galeri_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foto_galeri" (
    "id" TEXT NOT NULL,
    "galeriId" TEXT NOT NULL,
    "namaFile" TEXT NOT NULL,
    "urlFile" TEXT NOT NULL,
    "caption" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "foto_galeri_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perangkat_kelurahan" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "nip" TEXT,
    "jabatan" TEXT NOT NULL,
    "jenisJabatan" "JenisJabatan" NOT NULL DEFAULT 'STAFF',
    "foto" TEXT,
    "telepon" TEXT,
    "email" TEXT,
    "pendidikan" TEXT,
    "alamat" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "mulaiJabatan" TIMESTAMP(3),
    "akhirJabatan" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "perangkat_kelurahan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dokumen_publik" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "deskripsi" TEXT,
    "kategori" "KategoriDokumen" NOT NULL,
    "namaFile" TEXT NOT NULL,
    "urlFile" TEXT NOT NULL,
    "ukuranFile" INTEGER,
    "tipeFile" TEXT,
    "thumbnail" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dokumen_publik_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pengaduan" (
    "id" TEXT NOT NULL,
    "nomorPengaduan" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "nik" TEXT,
    "email" TEXT,
    "telepon" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "isiPengaduan" TEXT NOT NULL,
    "kategori" "KategoriPengaduan" NOT NULL,
    "lampiran" TEXT,
    "status" "StatusPengaduan" NOT NULL DEFAULT 'PENDING',
    "tanggapan" TEXT,
    "penanggungJawab" TEXT,
    "tanggalTanggap" TIMESTAMP(3),
    "tanggalSelesai" TIMESTAMP(3),
    "isAnonim" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pengaduan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "deskripsi" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "berita_slug_key" ON "berita"("slug");

-- CreateIndex
CREATE INDEX "berita_slug_idx" ON "berita"("slug");

-- CreateIndex
CREATE INDEX "berita_kategoriId_idx" ON "berita"("kategoriId");

-- CreateIndex
CREATE INDEX "berita_publishedAt_idx" ON "berita"("publishedAt");

-- CreateIndex
CREATE UNIQUE INDEX "kategori_berita_slug_key" ON "kategori_berita"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "pengumuman_slug_key" ON "pengumuman"("slug");

-- CreateIndex
CREATE INDEX "pengumuman_slug_idx" ON "pengumuman"("slug");

-- CreateIndex
CREATE INDEX "pengumuman_jenis_idx" ON "pengumuman"("jenis");

-- CreateIndex
CREATE UNIQUE INDEX "agenda_slug_key" ON "agenda"("slug");

-- CreateIndex
CREATE INDEX "agenda_slug_idx" ON "agenda"("slug");

-- CreateIndex
CREATE INDEX "agenda_tanggalMulai_idx" ON "agenda"("tanggalMulai");

-- CreateIndex
CREATE UNIQUE INDEX "galeri_slug_key" ON "galeri"("slug");

-- CreateIndex
CREATE INDEX "galeri_slug_idx" ON "galeri"("slug");

-- CreateIndex
CREATE INDEX "galeri_tanggal_idx" ON "galeri"("tanggal");

-- CreateIndex
CREATE INDEX "foto_galeri_galeriId_idx" ON "foto_galeri"("galeriId");

-- CreateIndex
CREATE UNIQUE INDEX "perangkat_kelurahan_nip_key" ON "perangkat_kelurahan"("nip");

-- CreateIndex
CREATE INDEX "perangkat_kelurahan_jabatan_idx" ON "perangkat_kelurahan"("jabatan");

-- CreateIndex
CREATE UNIQUE INDEX "dokumen_publik_slug_key" ON "dokumen_publik"("slug");

-- CreateIndex
CREATE INDEX "dokumen_publik_slug_idx" ON "dokumen_publik"("slug");

-- CreateIndex
CREATE INDEX "dokumen_publik_kategori_idx" ON "dokumen_publik"("kategori");

-- CreateIndex
CREATE UNIQUE INDEX "pengaduan_nomorPengaduan_key" ON "pengaduan"("nomorPengaduan");

-- CreateIndex
CREATE INDEX "pengaduan_nomorPengaduan_idx" ON "pengaduan"("nomorPengaduan");

-- CreateIndex
CREATE INDEX "pengaduan_status_idx" ON "pengaduan"("status");

-- CreateIndex
CREATE INDEX "pengaduan_kategori_idx" ON "pengaduan"("kategori");

-- CreateIndex
CREATE UNIQUE INDEX "settings_key_key" ON "settings"("key");

-- AddForeignKey
ALTER TABLE "berita" ADD CONSTRAINT "berita_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "berita" ADD CONSTRAINT "berita_kategoriId_fkey" FOREIGN KEY ("kategoriId") REFERENCES "kategori_berita"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengumuman" ADD CONSTRAINT "pengumuman_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agenda" ADD CONSTRAINT "agenda_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "galeri" ADD CONSTRAINT "galeri_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foto_galeri" ADD CONSTRAINT "foto_galeri_galeriId_fkey" FOREIGN KEY ("galeriId") REFERENCES "galeri"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dokumen_publik" ADD CONSTRAINT "dokumen_publik_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
