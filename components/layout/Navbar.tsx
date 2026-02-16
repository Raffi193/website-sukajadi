"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Profil", href: "/profilPage" }, // Hapus hasDropdown jika tidak dipakai
    { name: "Pemerintahan", href: "/pemerintahan" },
    {
      name: "Layanan",
      href: "#",
      subItems: [
        {
          name: "Administrasi Kependudukan",
          href: "/administrasiKependudukan",
        },
        {
          name: "Layanan Pengaduan Masyarakat",
          href: "https://www.lapor.go.id/",
        },
        { name: "Bantuan Sosial", href: "/BantuanSosial" },
      ],
    },
    {
      name: "Berita",
      href: "/berita",
      subItems: [
        { name: "Berita Terbaru", href: "/berita" },
        { name: "Pengumuman", href: "/pengumuman" },
        { name: "Agenda", href: "/agenda" },
      ],
    },
    {
      name: "Kontak",
      href: "/kontak",
    },
  ];

  const isActive = (href: string, subItems?: { href: string }[]) => {
    if (pathname === href) return true;
    if (subItems) {
      return subItems.some((sub) => pathname === sub.href);
    }
    return false;
  };

  const toggleMobileSubmenu = (name: string) => {
    setMobileSubmenu(mobileSubmenu === name ? null : name);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 relative shrink-0">
            <div className="absolute inset-0 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm group-hover:bg-blue-600 transition-colors">
              Logo
            </div>
          </div>
          <div className="leading-tight min-w-0">
            <h1 className="text-xs sm:text-sm font-bold text-blue-500 uppercase font-poppins truncate group-hover:text-blue-600 transition-colors">
              Pemerintah Kelurahan Sukajadi
            </h1>
            <p className="text-[10px] sm:text-xs text-gray-600 font-sans truncate">
              Kabupaten Banyuasin, Sumatera Selatan
            </p>
          </div>
        </Link>

        {/* --- DESKTOP MENU --- */}
        <div className="hidden lg:flex gap-6 xl:gap-8 items-center font-medium text-gray-700">
          {navLinks.map((link, idx) => {
            const active = isActive(link.href, link.subItems);

            return (
              <div key={idx} className="relative group">
                <Link
                  href={link.href}
                  // Tambahkan prefetch={true} (opsional, karena default true)
                  prefetch={true}
                  className={`flex items-center gap-1 transition py-2 font-sans relative ${
                    active
                      ? "text-blue-600 font-semibold"
                      : "hover:text-blue-600"
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></span>
                  )}
                  {link.subItems && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${
                        active ? "text-blue-600" : ""
                      } group-hover:rotate-180`}
                    />
                  )}
                </Link>

                {/* DROPDOWN MENU */}
                {link.subItems && (
                  <div className="absolute top-full left-0 mt-0 w-64 bg-white shadow-xl rounded-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="py-2">
                      {link.subItems.map((sub, subIdx) => {
                        const subActive = pathname === sub.href;
                        // Cek jika link eksternal (https)
                        const isExternal = sub.href.startsWith("http");

                        return (
                          <Link
                            key={subIdx}
                            href={sub.href}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                            className={`block px-4 py-2.5 text-sm transition font-sans relative ${
                              subActive
                                ? "bg-blue-50 text-blue-600 font-semibold"
                                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                            }`}
                          >
                            {sub.name}
                            {subActive && (
                              <span className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r"></span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-gray-700 hover:text-blue-600 transition p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- MOBILE MENU --- */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t absolute w-full h-screen left-0 top-full overflow-y-auto pb-32 shadow-lg animate-fade-in-down">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link, idx) => {
              const active = isActive(link.href, link.subItems);

              return (
                <div
                  key={idx}
                  className="border-b border-gray-50 last:border-0"
                >
                  {!link.subItems ? (
                    <Link
                      href={link.href}
                      className={`block py-3 px-2 font-medium font-sans transition rounded-lg relative ${
                        active
                          ? "text-blue-600 font-semibold bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="flex items-center justify-between">
                        {link.name}
                        {active && (
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                        )}
                      </span>
                      {active && (
                        <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-600 rounded-full"></span>
                      )}
                    </Link>
                  ) : (
                    <div>
                      <button
                        onClick={() => toggleMobileSubmenu(link.name)}
                        className={`w-full flex justify-between items-center py-3 px-2 font-medium font-sans transition rounded-lg ${
                          active
                            ? "text-blue-600 font-semibold bg-blue-50"
                            : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-300 ${
                            mobileSubmenu === link.name
                              ? "rotate-180 text-blue-600"
                              : active
                                ? "text-blue-600"
                                : "text-gray-400"
                          }`}
                        />
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          mobileSubmenu === link.name
                            ? "max-h-96 opacity-100 mb-3"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="bg-gray-50 rounded-lg p-2 flex flex-col gap-1 ml-2 mt-2">
                          {link.subItems.map((sub, subIdx) => {
                            const subActive = pathname === sub.href;
                            const isExternal = sub.href.startsWith("http");

                            return (
                              <Link
                                key={subIdx}
                                href={sub.href}
                                target={isExternal ? "_blank" : undefined}
                                rel={
                                  isExternal ? "noopener noreferrer" : undefined
                                }
                                className={`flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg transition font-sans relative ${
                                  subActive
                                    ? "text-blue-600 font-semibold bg-white shadow-sm"
                                    : "text-gray-600 hover:text-blue-600 hover:bg-white"
                                }`}
                                onClick={() => setIsOpen(false)}
                              >
                                {subActive ? (
                                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0"></div>
                                ) : (
                                  <ChevronRight
                                    size={14}
                                    className="text-blue-300 shrink-0"
                                  />
                                )}
                                {sub.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
