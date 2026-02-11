"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { KategoriBerita } from "@prisma/client"

// UI Components
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

// Icons
import { Search, Filter, X, SlidersHorizontal } from "lucide-react"

interface BeritaFiltersProps {
  kategoris: KategoriBerita[]
}

export function BeritaFilters({ kategoris }: BeritaFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // State lokal untuk input agar responsif saat mengetik
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "")

  // Sync state jika URL berubah (misal tombol back ditekan)
  useEffect(() => {
    setSearchValue(searchParams.get("search") || "")
  }, [searchParams])

  // --- LOGIC: Debounced Search (Auto-search saat mengetik) ---
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (term) {
      params.set("search", term)
    } else {
      params.delete("search")
    }
    params.set("page", "1") // Reset ke halaman 1 setiap kali search berubah
    
    router.replace(`?${params.toString()}`)
  }, 300) // Delay 300ms

  // --- LOGIC: Wrapper untuk handle input change ---
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value) // Update UI instan
    handleSearch(value)   // Update URL delay
  }

  // --- LOGIC: Kategori Filter ---
  const handleKategoriChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== "all") {
      params.set("kategori", value)
    } else {
      params.delete("kategori")
    }
    params.set("page", "1")
    router.replace(`?${params.toString()}`)
  }

  // --- LOGIC: Reset Semua Filter ---
  const clearFilters = () => {
    setSearchValue("")
    router.push("/admin/berita") // Reset URL bersih
  }

  // Cek apakah ada filter yang aktif
  const isFiltered = searchParams.has("search") || searchParams.has("kategori")

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      
      {/* 1. SEARCH BAR (Flexible Width) */}
      <div className="relative flex-1 group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
        <Input
          placeholder="Cari judul berita..."
          value={searchValue}
          onChange={onInputChange}
          className="pl-10 pr-10 bg-white border-gray-200 shadow-sm focus-visible:ring-blue-500 transition-all hover:border-blue-400"
        />
        {/* Tombol Clear Search (X) di dalam Input */}
        {searchValue && (
          <button
            onClick={() => {
              setSearchValue("")
              handleSearch("")
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* 2. KATEGORI DROPDOWN (Fixed Width on Desktop) */}
      <div className="w-full sm:w-[220px]">
        <Select
          value={searchParams.get("kategori") || "all"}
          onValueChange={handleKategoriChange}
        >
          <SelectTrigger className="bg-white border-gray-200 shadow-sm hover:border-blue-400 transition-all text-gray-700">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <SelectValue placeholder="Semua Kategori" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="cursor-pointer">
              Semua Kategori
            </SelectItem>
            {kategoris.map((kategori) => (
              <SelectItem key={kategori.id} value={kategori.id} className="cursor-pointer">
                {kategori.nama}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 3. RESET BUTTON (Hanya muncul jika ada filter) */}
      {isFiltered && (
        <Button 
          variant="ghost" 
          onClick={clearFilters}
          className="px-3 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
          title="Hapus semua filter"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Reset
        </Button>
      )}
    </div>
  )
}