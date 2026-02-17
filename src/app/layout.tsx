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
  metadataBase: new URL("https://sukajadi.com"),

  title: {
    default: "Website Resmi Kelurahan Sukajadi",
    template: "%s | Website Kelurahan Sukajadi",
  },

  description:
    "Website resmi Kelurahan Sukajadi sebagai media informasi, berita, pengumuman, dan layanan masyarakat",

  keywords: [
    "Kelurahan Sukajadi",
    "Website Resmi Kelurahan",
    "Berita Kelurahan Sukajadi",
    "Informasi Desa Sukajadi",
  ],

  authors: [{ name: "Kelurahan Sukajadi" }],

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Website Resmi Kelurahan Sukajadi",
    description:
      "Media informasi resmi Kelurahan Sukajadi untuk masyarakat",
    url: "https://sukajadi.com",
    siteName: "Website Kelurahan Sukajadi",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Website Kelurahan Sukajadi",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Website Resmi Kelurahan Sukajadi",
    description:
      "Media informasi resmi Kelurahan Sukajadi untuk masyarakat.",
    images: ["/logo.png"],
  },

  icons: {
    icon: "/logo.png",
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
