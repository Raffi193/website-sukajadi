'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Profil', href: '#', hasDropdown: true },
    { name: 'Pemerintahan', href: '#' },
    { name: 'Layanan', href: '#' },
    { name: 'Berita', href: '#' },
    { name: 'Kontak', href: '#' },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 relative">
             <div className="absolute inset-0 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">L</div>
          </div>
          <div className="leading-tight">
            <h1 className="text-lg font-bold text-blue-800 uppercase">Kelurahan Sukajadi</h1>
            <p className="text-xs text-gray-600">Kota Palembang, Sumatera Selatan</p>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center font-medium text-gray-700">
          {navLinks.map((link, idx) => (
            <Link 
              key={idx} 
              href={link.href} 
              className="flex items-center gap-1 hover:text-blue-600 transition group"
            >
              {link.name}
              {link.hasDropdown && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300"/>}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t p-4 flex flex-col gap-4 shadow-lg absolute w-full">
          {navLinks.map((link, idx) => (
            <Link key={idx} href={link.href} className="text-gray-700 hover:text-blue-600 font-medium">
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}