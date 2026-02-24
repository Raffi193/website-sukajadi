"use client";

import { useState } from "react";
import { Berita, KategoriBerita, User } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  MoreHorizontal, // Lebih modern daripada MoreVertical
  Eye,
  Pencil,
  Trash2,
  FileText,
  ImageIcon,
  CalendarDays,
  Pin,
  Edit,
} from "lucide-react";
import { formatDate } from "@/lib/helpers";
import { deleteBerita } from "@/src/actions/berita";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type BeritaWithRelations = Berita & {
  kategori: KategoriBerita;
  author: Pick<User, "id" | "name" | "email">;
};

interface BeritaTableProps {
  berita: BeritaWithRelations[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function BeritaTable({ berita, pagination }: BeritaTableProps) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    const result = await deleteBerita(deleteId);

    if (result.success) {
      toast.success("Berita berhasil dihapus");
      router.refresh();
    } else {
      toast.error(result.error || "Gagal menghapus berita");
    }

    setIsDeleting(false);
    setDeleteId(null);
  };

  return (
    <>
      <div className="rounded-xl bg-white shadow-sm overflow-hidden">
        <Table>
          {/* Header dengan background halus dan padding lega */}
          <TableHeader className="bg-gray-50/80 border-b border-gray-100">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[100px] px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Cover
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Info Berita
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Kategori
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Status
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Statistik
              </TableHead>
              <TableHead className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {berita.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-48 text-center text-gray-500"
                >
                  Belum ada data berita.
                </TableCell>
              </TableRow>
            ) : (
              berita.map((item) => (
                <TableRow
                  key={item.id}
                  // Garis bawah halus (border-b), border-0 untuk baris terakhir
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50/60 transition-colors"
                >
                  {/* Kolom 1: Gambar (Padding vertikal diperbesar) */}
                  <TableCell className="px-6 py-4 align-middle">
                    <div className="relative h-12 w-20 overflow-hidden rounded-md border border-gray-100 bg-gray-50">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.judul}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-gray-300">
                          <ImageIcon className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                  </TableCell>

                  {/* Kolom 2: Judul */}
                  <TableCell className="px-6 py-4 align-middle">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 line-clamp-1 max-w-[250px]">
                          {item.judul}
                        </span>
                        {item.isPinned && (
                          <Pin className="h-3.5 w-3.5 fill-amber-400 text-amber-500 rotate-45 shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <CalendarDays className="h-3.5 w-3.5" />
                        <span>{formatDate(item.createdAt)}</span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Kolom 3: Kategori */}
                  <TableCell className="px-6 py-4 align-middle">
                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                      {item.kategori.nama}
                    </span>
                  </TableCell>

                  {/* Kolom 4: Status */}
                  <TableCell className="px-6 py-4 align-middle">
                    {item.isPublished ? (
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-600"></span>
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-yellow-600"></span>
                        Draft
                      </span>
                    )}
                  </TableCell>

                  {/* Kolom 5: Views */}
                  <TableCell className="px-6 py-4 align-middle">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Eye className="h-4 w-4" />
                      <span>{item.viewCount}</span>
                    </div>
                  </TableCell>

                  {/* Kolom 6: Aksi */}
                  <TableCell className="px-6 py-4 text-right align-middle">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-gray-900"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/admin/berita/${item.id}`}
                            className="cursor-pointer flex w-full items-center"
                          >
                            <Eye className="mr-2 h-4 w-4" /> Lihat
                          </Link>
                        </DropdownMenuItem>
                        {/* ------------------------- */}

                        <DropdownMenuItem asChild>
                          <Link
                            href={`/admin/berita/${item.id}/edit`}
                            className="cursor-pointer flex w-full items-center"
                          >
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setDeleteId(item.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4 text-red-600" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-4">
          <p className="text-sm text-gray-500">
            Halaman {pagination.page} dari {pagination.totalPages} (
            {pagination.total} total)
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page === 1}
              onClick={() => router.push(`?page=${pagination.page - 1}`)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page === pagination.totalPages}
              onClick={() => router.push(`?page=${pagination.page + 1}`)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Berita?</AlertDialogTitle>
            <AlertDialogDescription>
              Aksi ini tidak dapat dibatalkan. Berita akan dihapus permanen dari
              database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Menghapus..." : "Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
