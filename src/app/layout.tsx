import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from 'sonner'
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-primary",
});

export const metadata: Metadata = {
  title: {
    default: "Kelurahan Sukajadi", // Judul default jika halaman tidak punya judul khusus
    template: "%s | Kelurahan Sukajadi", // Format judul: "Nama Halaman | Kelurahan Sukajadi"
  },
  description: "Website Resmi Media Informasi Kelurahan Sukajadi",
  icons: {
    icon: "/logo.png", // Ganti dengan path logo Anda jika ada
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#3b82f6',
        },
      }}
    >
      <html lang="id">
        <body className={inter.className}>
          {children}
          <Toaster position="top-right" richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
