"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Wajib import CSS-nya

export default function AosInit() {
  useEffect(() => {
    AOS.init({
      duration: 900, // Durasi animasi dalam milidetik
      once: true,    // Animasi hanya berjalan 1x saat di-scroll ke bawah (tidak mengulang saat scroll ke atas)
      offset: 70,    // Jarak dari bawah layar sebelum animasi dimulai
    });
  }, []);

  return null; // Komponen ini tidak merender UI apa pun
}