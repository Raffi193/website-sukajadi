"use client";

import { deleteGaleri } from "@/src/app/actions/galeri";
import { FaTrash } from "react-icons/fa";
import { useTransition } from "react";

export default function TombolHapusGaleri({ id, judul }: { id: string, judul: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Hapus galeri "${judul}"? Tindakan ini tidak bisa dibatalkan.`)) {
      startTransition(async () => {
        await deleteGaleri(id);
      });
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={isPending}
      className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition text-sm flex items-center gap-1"
    >
      <FaTrash size={14} /> Hapus
    </button>
  );
}