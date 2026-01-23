import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Mengizinkan gambar dari Unsplash
      },
      // Jika nanti pakai domain lain (misal penyimpanan awan), tambahkan disini
    ],
  },
};



export default nextConfig;
