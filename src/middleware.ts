import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define public routes (routes yang bisa diakses tanpa login)
const isPublicRoute = createRouteMatcher([
  '/', 
  '/sign-in(.*)',
  // '/sign-up(.*)',
  
  // --- MENU PROFIL ---
  '/profilPage(.*)', // Sesuai dengan href di Navbar Anda
  '/profil(.*)',     // Antisipasi jika Anda pakai /profil juga

  // --- MENU PEMERINTAHAN ---
  '/pemerintahan(.*)',

  // --- MENU LAYANAN ---
  '/administrasiKependudukan(.*)',
  '/BantuanSosial(.*)',
  
  // --- MENU BERITA ---
  '/berita(.*)',
  '/pengumuman(.*)',
  '/agenda(.*)',
  '/gridiInformasi(.*)',
  '/gridGaleri(.*)',
  '/gridPotensi(.*)',
  '/gridSejarah(.*)',
  '/gridWilayah(.*)',

  // --- MENU KONTAK ---
  '/kontak(.*)',

  // --- API & WEBHOOKS ---
  '/api/webhooks(.*)',
  '/api/uploadthing(.*)'
])

export default clerkMiddleware(async (auth, req) => {
  // Protect all non-public routes
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}