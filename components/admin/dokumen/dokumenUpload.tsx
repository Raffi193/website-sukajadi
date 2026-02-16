"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileText, X, Upload, Loader2, Paperclip } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

interface DocumentUploadProps {
  value?: string;
  onChange: (url: string) => void;
  disabled?: boolean;
  folder?: string; // Opsional: bisa set folder spesifik, misal "pengumuman"
}

export function DocumentUpload({ value, onChange, disabled, folder = "documents" }: DocumentUploadProps) {
  const [fileUrl, setFileUrl] = useState<string>(value || "");
  const [fileName, setFileName] = useState<string>(""); // Untuk menampilkan nama file
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const originalFile = e.target.files?.[0];
    if (!originalFile) return;

    // Validasi Ukuran (Misal Max 10MB)
    if (originalFile.size > 10 * 1024 * 1024) {
      toast.error("Ukuran file terlalu besar (Maks 10MB)");
      return;
    }

    setIsUploading(true);
    setFileName(originalFile.name); // Simpan nama file untuk UI

    try {
      // 1. Upload File Langsung (Tanpa Kompresi)
      // Nama file unik: timestamp-namaasli (dibersihkan spasi)
      const sanitizedName = originalFile.name.replace(/[^a-zA-Z0-9.]/g, "_");
      const filePath = `${folder}/${Date.now()}-${sanitizedName}`;

      const { error } = await supabase.storage
        .from("public_sukajadi") // Pastikan bucket ini Public
        .upload(filePath, originalFile);

      if (error) throw error;

      // 2. Ambil Public URL
      const { data: publicUrlData } = supabase.storage
        .from("public_sukajadi")
        .getPublicUrl(filePath);

      const finalUrl = publicUrlData.publicUrl;

      setFileUrl(finalUrl);
      onChange(finalUrl);
      toast.success("Dokumen berhasil diupload");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Gagal upload dokumen");
      setFileName(""); // Reset jika gagal
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemove = () => {
    setFileUrl("");
    setFileName("");
    onChange("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // --- TAMPILAN UI ---
  return (
    <div className="w-full">
      {fileUrl ? (
        // Tampilan Jika File Sudah Ada (Preview Icon)
        <div className="relative flex items-center p-4 bg-blue-50 border border-blue-200 rounded-xl group">
          <div className="p-3 bg-white rounded-lg shadow-sm mr-4 text-blue-600">
            <FileText size={32} />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-blue-900 truncate">
              {fileName || "Dokumen Terlampir"}
            </p>
            <a 
              href={fileUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-blue-500 hover:underline flex items-center gap-1 mt-1"
            >
              <Paperclip size={10} /> Lihat / Download File
            </a>
          </div>
          
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="h-8 w-8 ml-2 shadow-sm"
            onClick={handleRemove}
            disabled={disabled}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        // Tampilan Input Upload
        <div
          onClick={() => !disabled && fileInputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200
            ${disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "border-gray-300 hover:border-blue-500 hover:bg-blue-50/30 bg-gray-50/50"}
          `}
        >
          <div className="p-3 bg-white rounded-full shadow-sm mb-3">
            <Upload className="h-6 w-6 text-gray-400" />
          </div>
          <div className="space-y-1 mb-2">
            <p className="text-sm font-semibold text-gray-700">
              {isUploading ? "Sedang Mengupload..." : "Upload Dokumen Pengumuman"}
            </p>
            <p className="text-xs text-gray-500">
              PDF, DOCX, atau Excel (Maks 10MB)
            </p>
          </div>
          {isUploading && <Loader2 className="h-5 w-5 animate-spin text-blue-600 mt-2" />}
        </div>
      )}

      {/* Input File Hidden */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.xls,.xlsx" // Batasi tipe file di sini
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled || isUploading}
      />
    </div>
  );
}