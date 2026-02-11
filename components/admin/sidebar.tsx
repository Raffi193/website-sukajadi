"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  FileText, 
  Megaphone, 
  Calendar, 
  Images, 
  Users, 
  FileDown,
  MessageSquare,
  Settings,
  ChevronRight,
  LogOut
} from "lucide-react"
import { cn } from "@/lib/utils" // Pastikan ada, atau hapus cn dan pakai template literal biasa

const menuGroups = [
  {
    label: "Utama",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    ]
  },
  {
    label: "Manajemen Konten",
    items: [
      { icon: FileText, label: "Berita", href: "/admin/berita" },
      { icon: Megaphone, label: "Pengumuman", href: "/admin/pengumuman" },
      { icon: Calendar, label: "Agenda", href: "/admin/agenda" },
      { icon: Images, label: "Galeri", href: "/admin/galeri" },
    ]
  },
  {
    label: "Administrasi",
    items: [
      { icon: Users, label: "Perangkat Desa", href: "/admin/perangkat" },
      { icon: FileDown, label: "Dokumen Publik", href: "/admin/dokumen" },
      { icon: MessageSquare, label: "Pengaduan", href: "/admin/pengaduan" },
    ]
  },
  {
    label: "Sistem",
    items: [
      { icon: Settings, label: "Pengaturan", href: "/admin/settings" },
    ]
  }
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-72 bg-white border-r border-gray-200 flex flex-col h-screen fixed inset-y-0 z-50">
      {/* Header Sidebar */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <div className="flex flex-col">
          <span className="font-bold text-xl text-gray-900 tracking-tight">
            Admin<span className="text-blue-600">Panel</span>
          </span>
          <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">
            Kelurahan Sukajadi
          </span>
        </div>
      </div>

      {/* Menu List */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
        {menuGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <h3 className="mb-2 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {group.label}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      group flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                      ${isActive 
                        ? "bg-blue-50 text-blue-700" 
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon 
                        className={`h-4 w-4 ${isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"}`} 
                      />
                      {item.label}
                    </div>
                    {isActive && <ChevronRight className="h-4 w-4 text-blue-600" />}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Sidebar (Optional Info) */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <p className="text-xs text-center text-gray-400">
          &copy; 2026 Kelurahan Sukajadi
        </p>
      </div>
    </aside>
  )
}