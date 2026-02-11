"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon, X, Upload, Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [preview, setPreview] = useState<string>(value || "");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- FUNGSI KOMPRESI GAMBAR ---
  const compressImage = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = document.createElement("img");
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Atur ukuran maksimal (misal lebar 1000px)
          const MAX_WIDTH = 1000;
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;

          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Convert ke Blob (Format WebP, kualitas 80%)
          canvas.toBlob(
            (blob) => {
              if (blob) resolve(blob);
              else reject(new Error("Gagal kompresi"));
            },
            "image/webp",
            0.8, // Kualitas 80%
          );
        };
      };
      reader.onerror = (error) => reject(error);
    });
  };
  // ------------------------------

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const originalFile = e.target.files?.[0];
    if (!originalFile) return;

    // Validasi Tipe
    if (!originalFile.type.startsWith("image/")) {
      toast.error("File harus berupa gambar");
      return;
    }

    setIsUploading(true);

    try {
      // 1. Lakukan Kompresi
      const compressedBlob = await compressImage(originalFile);

      // Buat file baru dari blob hasil kompresi
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.webp`;
      const filePath = `thumbnails/${fileName}`;
      const compressedFile = new File([compressedBlob], fileName, {
        type: "image/webp",
      });

      // 2. Upload File Kecil ke Supabase
      const { error } = await supabase.storage
        .from("public_sukajadi")
        .upload(filePath, compressedFile);

      if (error) throw error;

      // 3. Ambil URL
      const { data: publicUrlData } = supabase.storage
        .from("public_sukajadi")
        .getPublicUrl(filePath);

      const finalUrl = publicUrlData.publicUrl;

      setPreview(finalUrl);
      onChange(finalUrl);
      toast.success("Gambar berhasil diupload (Size Optimized)");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Gagal upload gambar");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemove = () => {
    // Opsional: Anda bisa menambahkan logika hapus file dari bucket di sini juga
    setPreview("");
    onChange("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ... (Sisa Return JSX sama seperti sebelumnya) ...
  return (
    // ... Copy JSX dari jawaban sebelumnya ...
    <div className="space-y-4 w-full">
      {preview ? (
        <div className="relative w-full aspect-video md:h-64 rounded-xl overflow-hidden border border-gray-200 shadow-sm group">
          <img
            src={preview}
            alt="Thumbnail Preview"
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="shadow-md h-8 w-8"
              onClick={handleRemove}
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => !disabled && fileInputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200
            ${disabled ? "opacity-50 cursor-not-allowed bg-gray-50 border-gray-200" : "border-gray-300 hover:border-blue-500 hover:bg-blue-50/50 bg-gray-50/30"}
          `}
        >
          <div className="p-4 bg-white rounded-full shadow-sm mb-4">
            <ImageIcon className="h-8 w-8 text-gray-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-gray-700">
              {isUploading
                ? "Mengompres & Upload..."
                : "Klik untuk upload thumbnail"}
            </p>
            <p className="text-xs text-gray-500">
              Otomatis dikompres ke WebP (Hemat Kuota)
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-6"
            disabled={disabled || isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Proses...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" /> Pilih File
              </>
            )}
          </Button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled || isUploading}
      />
    </div>
  );
}
