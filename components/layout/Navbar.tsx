"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // State baru untuk melacak submenu mana yang dibuka di HP
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Profil", href: "./profilPage", hasDropdown: true },
    { name: "Pemerintahan", href: "./pemerintahan" },
    {
      name: "Layanan",
      href: "#",
      subItems: [
        { name: "Administrasi Kependudukan", href: "/layanan/administrasi" },
        { name: "Surat Keterangan", href: "/layanan/surat" },
        { name: "Layanan Pengaduan Masyarakat", href: "/layanan/pengaduan" },
        { name: "Bantuan Sosial", href: "/layanan/bansos" },
      ],
    },
    { name: "Berita", href: "./berita" },
    { name: "Kontak", href: "#" },
  ];
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fungsi Toggle untuk Mobile Submenu
  const toggleMobileSubmenu = (name: string) => {
    if (mobileSubmenu === name) {
      setMobileSubmenu(null); // Tutup jika sudah terbuka
    } else {
      setMobileSubmenu(name); // Buka menu yang diklik
    }
  };

  return (
    <nav
      className={`container sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2" : "bg-white py-4"}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 relative">
            <div className="absolute inset-0 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              Logo
            </div>
          </div>
          <div className="leading-tight">
            <h1 className="text-sm font-bold text-blue-500 uppercase font-poppins">
              Pemerintah Kelurahan Sukajadi
            </h1>
            <p className="text-xs text-gray-600 font-sans">Kabupaten Banyuasin, Sumatera Selatan</p>
          </div>
        </div>

        {/* --- DESKTOP MENU --- */}
        <div className="hidden md:flex gap-8 items-center font-medium text-gray-700">
          {navLinks.map((link, idx) => (
            <div key={idx} className="relative group">
              {/* Link Utama */}
              <Link
                href={link.href}
                className="flex items-center gap-1 hover:text-blue-600 transition py-2 font-sans"
              >
                {link.name}
                {/* Jika punya subItems, tampilkan panah */}
                {link.subItems && (
                  <ChevronDown
                    size={14}
                    className="group-hover:rotate-180 transition-transform duration-300"
                  />
                )}
              </Link>

              {/* DROPDOWN LOGIC (Hanya muncul jika punya subItems) */}
              {link.subItems && (
                <div className="absolute top-full left-0 mt-0 w-56 bg-white shadow-xl rounded-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="py-2">
                    {link.subItems.map((sub, subIdx) => (
                      <Link
                        key={subIdx}
                        href={sub.href}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition font-sans"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

   {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700 hover:text-blue-600 transition">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* --- MOBILE MENU (ACCORDION) --- */}
      {isOpen && (
        <div className="md:hidden bg-white border-t absolute w-full h-screen left-0 top-full overflow-y-auto pb-32 shadow-lg animate-fade-in-down">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            
            {navLinks.map((link, idx) => (
              <div key={idx} className="border-b border-gray-50 last:border-0">
                
                {/* 1. Jika TIDAK punya submenu, render link biasa */}
                {!link.subItems ? (
                  <Link 
                    href={link.href} 
                    className="block py-3 text-gray-700 hover:text-blue-600 font-medium font-sans"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  /* 2. Jika PUNYA submenu, render tombol Accordion */
                  <div>
                    <button 
                      onClick={() => toggleMobileSubmenu(link.name)}
                      className="w-full flex justify-between items-center py-3 text-gray-700 hover:text-blue-600 font-medium font-sans group"
                    >
                      {link.name}
                      {/* Ikon panah berputar jika aktif */}
                      <ChevronDown 
                        size={18} 
                        className={`text-gray-400 transition-transform duration-300 ${mobileSubmenu === link.name ? 'rotate-180 text-blue-600' : ''}`}
                      />
                    </button>
                    
                    {/* Area Submenu (Hanya muncul jika state == nama menu) */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileSubmenu === link.name ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                      <div className="bg-gray-50 rounded-lg p-2 flex flex-col gap-1 ml-2">
                        {link.subItems.map((sub, subIdx) => (
                          <Link 
                            key={subIdx} 
                            href={sub.href}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition font-sans"
                            onClick={() => setIsOpen(false)}
                          >
                             <ChevronRight size={14} className="text-blue-300" />
                             {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

          </div>
        </div>
      )}
    </nav>
  );
}