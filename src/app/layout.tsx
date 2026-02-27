import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Metadata } from "next";
import AosInit from "../components/AosInit";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-primary",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sukajadi.com"),
  title: {
    default: "Website Resmi Kelurahan Sukajadi",
    template: "%s | Kelurahan Sukajadi",
  },
  description:
    "Website resmi Kelurahan Sukajadi yang menyediakan informasi berita, layanan administrasi, agenda kegiatan, dan profil wilayah.",
  keywords: [
    "Kelurahan Sukajadi",
    "Pemerintah Sukajadi",
    "Berita Sukajadi",
    "Layanan Administrasi Sukajadi",
  ],
  authors: [{ name: "Kelurahan Sukajadi" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://sukajadi.com",
    siteName: "Kelurahan Sukajadi",
    title: "Website Resmi Kelurahan Sukajadi",
    description: "Media informasi resmi Kelurahan Sukajadi untuk masyarakat.",
  },
  robots: {
    index: true,
    follow: true,
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
          colorPrimary: "#3b82f6",
        },
      }}
    >
      <html lang="id">
        <body className={inter.className}>
          <AosInit />
          {children}
          <Toaster position="top-right" richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
