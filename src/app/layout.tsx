import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from 'sonner'
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-primary",
});

export const metadata = {
  title: 'Admin Panel Kelurahan',
  description: 'Sistem Manajemen Kelurahan',
}

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
