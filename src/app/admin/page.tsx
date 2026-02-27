import { currentUser } from "@clerk/nextjs/server";
export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/src/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Separator } from "@/src/components/ui/separator";
import {
  Newspaper,
  Megaphone,
  Calendar,
  User,
  ArrowRight,
  Settings,
  LogOut,
  LayoutDashboard,
  FileText,
  Users,
} from "lucide-react";
import prisma from "@/lib/prisma";

export default async function AdminDashboard() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/sign-in");
  }

  // --- LOGIC: Auto-sync user (Tidak diubah, sesuai permintaan) ---
  let user = await prisma.user.findUnique({
    where: { clerkId: clerkUser.id },
  });

  if (!user) {
    try {
      user = await prisma.user.create({
        data: {
          clerkId: clerkUser.id,
          email: clerkUser.emailAddresses[0].emailAddress,
          name:
            `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
            "Admin",
          username: clerkUser.username || null,
          avatar: clerkUser.imageUrl || null,
        },
      });
      console.log("✅ User auto-synced to database:", user.id);
    } catch (error) {
      console.error("❌ Error creating user:", error);
    }
  }

  // --- LOGIC: Get statistics (Tidak diubah) ---
  const stats = await Promise.all([
    prisma.berita.count({ where: { isPublished: true } }),
    prisma.pengumuman.count({ where: { isPublished: true } }),
    prisma.agenda.count({ where: { isPublished: true } }),
  ]);

  // Mapping data untuk UI yang lebih dinamis
  const statCards = [
    {
      title: "Berita Terbit",
      value: stats[0],
      description: "Artikel aktif di website",
      icon: Newspaper,
      color: "text-blue-600",
      bg: "bg-blue-100",
      link: "/admin/berita",
    },
    {
      title: "Pengumuman Baru",
      value: stats[1],
      description: "Pengumuman yang terbitkan",
      icon: Megaphone,
      color: "text-blue-600",
      bg: "bg-blue-100",
      link: "/admin/pengumuman",
    },
    {
      title: "Agenda Aktif",
      value: stats[2],
      description: "Kegiatan mendatang",
      icon: Calendar,
      color: "text-blue-600",
      bg: "bg-blue-100",
      link: "/admin/agenda",
    },
  ];

  // Ucapan selamat datang berdasarkan waktu server (simple)
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Selamat Pagi" : hour < 18 ? "Selamat Siang" : "Selamat Malam";

  return (
    <div className="p-6 md:p-8 space-y-8 bg-gray-50/50 min-h-screen">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {greeting}, {clerkUser.firstName} 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Selamat datang di Panel Admin Website Kelurahan Sukajadi.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" passHref>
            <Button
              className="h-10 cursor-pointer rounded-r-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 bg-white border-gray-200"
              variant="outline"
              size="sm"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Lihat Website Utama
            </Button>
          </Link>
        </div>
      </div>

      <Separator />

      {/* --- STATS OVERVIEW --- */}
      <div className="grid gap-6 md:grid-cols-3">
        {statCards.map((stat, index) => (
          <Card
            key={index}
            className="border-none shadow-sm hover:shadow-md transition-all duration-200"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {stat.value}
              </div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between text-gray-500 hover:text-gray-900"
                asChild
              >
                <Link href={stat.link}>
                  Lihat Detail <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-7 lg:grid-cols-7">
        {/* --- MAIN CONTENT / QUICK ACTIONS (4 Cols) --- */}
        <Card className="col-span-4 md:col-span-4 shadow-sm border-none">
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
            <CardDescription>
              Jalan pintas untuk mengelola konten website.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 p-6">
            {/* 1. CARD BERITA (Biru) */}
            <Button
              variant="outline"
              className="w-full h-auto py-8 flex flex-col items-center justify-center gap-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 group"
              asChild
            >
              <Link href="/admin/berita/create">
                <div className="p-4 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="font-bold text-lg text-gray-800 group-hover:text-blue-700">
                    Berita
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    Tulis Berita Baru
                  </span>
                </div>
              </Link>
            </Button>

            {/* 2. CARD PENGUMUMAN (Oranye) */}
            <Button
              variant="outline"
              className="w-full h-auto py-8 flex flex-col items-center justify-center gap-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-orange-200 hover:bg-orange-50/30 transition-all duration-300 group"
              asChild
            >
              <Link href="/admin/pengumuman/tambah">
                <div className="p-4 rounded-full bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                  <Megaphone className="h-6 w-6" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="font-bold text-lg text-gray-800 group-hover:text-orange-700">
                    Pengumuman
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    Buat Info Publik
                  </span>
                </div>
              </Link>
            </Button>

            {/* 3. CARD AGENDA (Ungu) */}
            <Button
              variant="outline"
              className="w-full h-auto py-8 flex flex-col items-center justify-center gap-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-purple-200 hover:bg-purple-50/30 transition-all duration-300 group"
              asChild
            >
              <Link href="/admin/agenda/tambah">
                <div className="p-4 rounded-full bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                  <Calendar className="h-6 w-6" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="font-bold text-lg text-gray-800 group-hover:text-purple-700">
                    Agenda
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    Jadwal Kegiatan
                  </span>
                </div>
              </Link>
            </Button>

            {/* 4. CARD PERANGKAT (Hijau) */}
            <Button
              variant="outline"
              className="w-full h-auto py-8 flex flex-col items-center justify-center gap-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-300 group"
              asChild
            >
              <Link href="/admin/perangkat/tambah">
                <div className="p-4 rounded-full bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                  <Users className="h-6 w-6" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="font-bold text-lg text-gray-800 group-hover:text-emerald-700">
                    Perangkat
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    Tambah Staff
                  </span>
                </div>
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* --- PROFILE CARD (3 Cols) --- */}
        <Card className="col-span-3 md:col-span-3 shadow-sm border-none bg-white">
          <CardHeader>
            <CardTitle>Profil Administrator</CardTitle>
            <CardDescription>Status akun Anda saat ini</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg border border-gray-100">
              <Avatar className="h-24 w-24 border-4 border-white shadow-sm mb-4">
                <AvatarImage src={clerkUser.imageUrl} />
                <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                  {clerkUser.firstName?.[0]}
                </AvatarFallback>
              </Avatar>

              <h3 className="text-xl font-bold text-gray-900">
                {clerkUser.firstName} {clerkUser.lastName}
              </h3>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">Admin Role</Badge>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-sm p-2 hover:bg-gray-50 rounded">
                <span className="text-gray-500 flex items-center gap-2">
                  <User size={16} /> Username
                </span>
                <span className="font-medium">{clerkUser.username || "-"}</span>
              </div>
              <div className="flex items-center justify-between text-sm p-2 hover:bg-gray-50 rounded">
                <span className="text-gray-500 flex items-center gap-2">
                  <Calendar size={16} /> Bergabung
                </span>
                <span className="font-medium">
                  {new Date(clerkUser.createdAt).toLocaleDateString("id-ID", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
