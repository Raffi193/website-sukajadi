import { currentUser } from "@clerk/nextjs/server"
export const dynamic = 'force-dynamic'
import { redirect } from "next/navigation"
import Link from "next/link"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Newspaper, 
  Megaphone, 
  Calendar, 
  User, 
  ArrowRight, 
  Settings, 
  LogOut,
  LayoutDashboard,
  FileText
} from "lucide-react"
import prisma from "@/lib/prisma"

export default async function AdminDashboard() {
  const clerkUser = await currentUser()

  if (!clerkUser) {
    redirect("/sign-in")
  }

  // --- LOGIC: Auto-sync user (Tidak diubah, sesuai permintaan) ---
  let user = await prisma.user.findUnique({
    where: { clerkId: clerkUser.id }
  })

  if (!user) {
    try {
      user = await prisma.user.create({
        data: {
          clerkId: clerkUser.id,
          email: clerkUser.emailAddresses[0].emailAddress,
          name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'Admin',
          username: clerkUser.username || null,
          avatar: clerkUser.imageUrl || null,
        }
      })
      console.log("✅ User auto-synced to database:", user.id)
    } catch (error) {
      console.error("❌ Error creating user:", error)
    }
  }

  // --- LOGIC: Get statistics (Tidak diubah) ---
  const stats = await Promise.all([
    prisma.berita.count({ where: { isPublished: true } }),
    prisma.pengaduan.count({ where: { status: 'PENDING' } }),
    prisma.agenda.count({ where: { isPublished: true } })
  ])

  // Mapping data untuk UI yang lebih dinamis
  const statCards = [
    {
      title: "Berita Terbit",
      value: stats[0],
      description: "Artikel aktif di website",
      icon: Newspaper,
      color: "text-blue-600",
      bg: "bg-blue-100",
      link: "/admin/berita"
    },
    {
      title: "Pengaduan Baru",
      value: stats[1],
      description: "Menunggu tindak lanjut",
      icon: Megaphone,
      color: stats[1] > 0 ? "text-red-600" : "text-green-600",
      bg: stats[1] > 0 ? "bg-red-100" : "bg-green-100",
      link: "/admin/pengaduan"
    },
    {
      title: "Agenda Aktif",
      value: stats[2],
      description: "Kegiatan mendatang",
      icon: Calendar,
      color: "text-purple-600",
      bg: "bg-purple-100",
      link: "/admin/agenda"
    }
  ]

  // Ucapan selamat datang berdasarkan waktu server (simple)
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Selamat Pagi" : hour < 18 ? "Selamat Siang" : "Selamat Malam"

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
           <Button variant="outline" size="sm">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Lihat Website Utama
           </Button>
        </div>
      </div>

      <Separator />

      {/* --- STATS OVERVIEW --- */}
      <div className="grid gap-6 md:grid-cols-3">
        {statCards.map((stat, index) => (
          <Card key={index} className="border-none shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
            <CardFooter className="pt-0">
               <Button variant="ghost" size="sm" className="w-full justify-between text-gray-500 hover:text-gray-900" asChild>
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
            <CardDescription>Jalan pintas untuk mengelola konten website.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
             <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all" asChild>
                <Link href="/admin/berita/create">
                  <FileText className="h-6 w-6" />
                  <span>Tulis Berita Baru</span>
                </Link>
             </Button>
             <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all" asChild>
                <Link href="/admin/pengaduan">
                  <Megaphone className="h-6 w-6" />
                  <span>Cek Pengaduan Masuk</span>
                </Link>
             </Button>
             <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50 transition-all" asChild>
                <Link href="/admin/agenda/create">
                  <Calendar className="h-6 w-6" />
                  <span>Buat Agenda Baru</span>
                </Link>
             </Button>
             <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 hover:border-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all" asChild>
                <Link href="/admin/settings">
                  <Settings className="h-6 w-6" />
                  <span>Pengaturan Web</span>
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
              <p className="text-sm text-gray-500 mb-2">
                {clerkUser.emailAddresses[0]?.emailAddress}
              </p>
              
              <div className="flex gap-2 mt-2">
                {user ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">
                    Database Synced ✓
                  </Badge>
                ) : (
                  <Badge variant="destructive">Not Synced</Badge>
                )}
                <Badge variant="outline">Admin Role</Badge>
              </div>
            </div>
            
            <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between text-sm p-2 hover:bg-gray-50 rounded">
                    <span className="text-gray-500 flex items-center gap-2"><User size={16}/> Username</span>
                    <span className="font-medium">{clerkUser.username || "-"}</span>
                </div>
                <div className="flex items-center justify-between text-sm p-2 hover:bg-gray-50 rounded">
                    <span className="text-gray-500 flex items-center gap-2"><Calendar size={16}/> Bergabung</span>
                    <span className="font-medium">
                        {new Date(clerkUser.createdAt).toLocaleDateString("id-ID", {
                            month: 'long', year: 'numeric'
                        })}
                    </span>
                </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}