"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { KategoriBerita } from "@prisma/client";
import { createBerita, updateBerita } from "@/src/app/actions/berita";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Icons & Utils
import {
  Loader2,
  Save,
  ArrowLeft,
  RefreshCw,
  Globe,
  Pin,
  FileText,
  Layout,
  ImageIcon,
} from "lucide-react";
import { toast } from "sonner";

// Custom Components
import { ImageUpload } from "@/components/admin/berita/ImageUpload";
import { TiptapEditor } from "@/components/admin/berita/RichTextEditor";

// --- Schema Definition ---
const beritaSchema = z.object({
  judul: z
    .string()
    .min(10, "Judul terlalu pendek (min. 10 karakter)")
    .max(200, "Judul terlalu panjang (maks. 200 karakter)"),
  slug: z
    .string()
    .min(5, "Slug minimal 5 karakter")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung",
    ),
  konten: z
    .string()
    .min(50, "Konten berita terlalu sedikit (min. 50 karakter)"),
  excerpt: z.string().max(300, "Ringkasan maksimal 300 karakter").optional(),
  thumbnail: z.string().optional(),
  kategoriId: z.string().min(1, "Wajib memilih kategori"),
  isPublished: z.boolean().optional(),
  isPinned: z.boolean().optional(),
});

type BeritaFormValues = z.infer<typeof beritaSchema>;

interface BeritaFormProps {
  kategoris: KategoriBerita[];
  initialData?: BeritaFormValues & { id: string };
}

export function BeritaForm({ kategoris, initialData }: BeritaFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Judul halaman & Deskripsi
  const pageTitle = initialData ? "Edit Artikel" : "Tulis Artikel Baru";
  const pageDesc = initialData
    ? "Perbarui informasi konten berita."
    : "Buat konten berita baru untuk website.";

  const form = useForm<BeritaFormValues>({
    resolver: zodResolver(beritaSchema),
    mode: "onChange",
    defaultValues: initialData || {
      judul: "",
      slug: "",
      konten: "",
      excerpt: "",
      thumbnail: "",
      kategoriId: "",
      isPublished: false,
      isPinned: false,
    },
  });

  const generateSlug = (value: string) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    form.setValue("judul", newTitle);
    if (!initialData && !form.getFieldState("slug").isDirty) {
      form.setValue("slug", generateSlug(newTitle), { shouldValidate: true });
    }
  };

  const onSubmit = async (data: BeritaFormValues) => {
    setIsSubmitting(true);
    try {
      const result = initialData
        ? await updateBerita(initialData.id, {
            ...data,
            isPublished: data.isPublished ?? false,
            isPinned: data.isPinned ?? false,
          })
        : await createBerita({
            ...data,
            isPublished: data.isPublished ?? false,
            isPinned: data.isPinned ?? false,
          });

      if (result.success) {
        toast.success("Berhasil update berita!", {
          description: "Siap input berita berikutnya!",
        });

        if (!initialData) {
          // Reset form jadi kosong lagi
          form.reset({
            judul: "",  
            slug: "",
            konten: "",
            thumbnail: "",
            // ... default values lainnya
          });

          // Paksa scroll ke paling atas agar nyaman input lagi
          window.scrollTo({ top: 0, behavior: 'smooth' });
          
        }

        router.refresh();
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan sistem");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            {pageTitle}
          </h1>
          <p className="text-sm text-gray-500 mt-1">{pageDesc}</p>
        </div>
        {/*  */}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* --- CARD 1: KONTEN UTAMA --- */}
          <Card className="border-none shadow-sm ring-1 ring-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-blue-600" />
                Konten Berita
              </CardTitle>
              <CardDescription>
                Isi judul, slug url, dan konten utama artikel.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Judul */}
              <FormField
                control={form.control}
                name="judul"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Judul Artikel
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contoh: Kegiatan Bakti Sosial 2024..."
                        className="text-lg p-6 font-medium"
                        {...field}
                        onChange={handleTitleChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Slug */}
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Permalink
                    </FormLabel>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-400 text-sm">
                            /berita/
                          </span>
                        </div>
                        <FormControl>
                          <Input
                            placeholder="judul-artikel-anda"
                            className="pl-16 bg-gray-50/50 text-gray-600"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const title = form.getValues("judul");
                          if (title)
                            form.setValue("slug", generateSlug(title), {
                              shouldValidate: true,
                            });
                        }}
                        className="text-gray-500 hover:text-blue-600"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormDescription className="text-xs">
                      URL SEO Friendly (otomatis digenerate dari judul).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              {/* Editor */}
              <FormField
                control={form.control}
                name="konten"
                render={({ field }) => (
                  <FormItem>
                    
                    <FormControl>
                      <div className="min-h-[400px]">
                        <TiptapEditor
                          content={field.value}
                          onChange={field.onChange}
                          placeholder="Mulai menulis berita Anda..."
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Excerpt */}
              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Ringkasan (Opsional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ringkasan singkat untuk preview di halaman depan..."
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* --- CARD 2: PENGATURAN & PUBLIKASI --- */}
          <Card className="border-none shadow-sm ring-1 ring-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Layout className="h-5 w-5 text-indigo-600" />
                Pengaturan & Publikasi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Kolom Kiri: Kategori */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="kategoriId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Kategori
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white">
                              <SelectValue placeholder="Pilih Kategori" />
                            </SelectTrigger>
                          </FormControl>
                          {/* FIX: bg-white & z-index tinggi */}
                          <SelectContent className="bg-white dark:bg-slate-950 z-[100] shadow-xl border-gray-200">
                            {kategoris.map((item) => (
                              <SelectItem
                                key={item.id}
                                value={item.id}
                                className="cursor-pointer"
                              >
                                {item.nama}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Kolom Kanan: Switches */}
                <div className="space-y-4">
                  {/* Switch Publish */}
                  <FormField
                    control={form.control}
                    name="isPublished"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-gray-50/50">
                        <div className="space-y-0.5">
                          <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <Globe className="h-3.5 w-3.5" /> Publish
                          </FormLabel>
                          <div className="text-xs">
                            {field.value ? (
                              <span className="text-green-600 font-medium">
                                Tayang di website
                              </span>
                            ) : (
                              <span className="text-gray-500">
                                Hanya tersimpan sebagai draft
                              </span>
                            )}
                          </div>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Switch Pin */}
                  <FormField
                    control={form.control}
                    name="isPinned"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-gray-50/50">
                        <div className="space-y-0.5">
                          <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <Pin className="h-3.5 w-3.5" /> Sematkan
                          </FormLabel>
                          <div className="text-xs text-gray-500">
                            Tampilkan di posisi atas
                          </div>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* --- CARD 3: MEDIA --- */}
          <Card className="border-none shadow-sm ring-1 ring-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ImageIcon className="h-5 w-5 text-pink-600" />
                Media Gambar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium mb-2 block">
                      Thumbnail / Cover
                    </FormLabel>
                    <FormControl>
                      <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300">
                        <ImageUpload
                          value={field.value}
                          onChange={(url) => field.onChange(url)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex items-center gap-3">
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="min-w-[140px] shadow-lg shadow-blue-500/20 bg-blue-600 hover:bg-blue-700 transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Simpan Berita
              </>
            )}
          </Button>
        </div>

          
        </form>
      </Form>
    </div>
  );
}
