"use client";

import { useState } from "react";
import { updateProfilKelurahan } from "@/src/actions/profil";
import { createClient } from "@supabase/supabase-js";
import {
  FaSave,
  FaBuilding,
  FaHistory,
  FaMapMarkedAlt,
  FaUsers,
  FaGlobe,
  FaImage,
  FaSpinner,
  FaCheckCircle,
  FaExclamationCircle,
  FaUpload,
  FaTimes,
  FaCamera,
} from "react-icons/fa";

// Init Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

// Tab Navigasi
const tabs = [
  { id: "identitas", label: "Identitas", icon: <FaBuilding />, color: "blue" },
  {
    id: "sejarah",
    label: "Sejarah & Visi",
    icon: <FaHistory />,
    color: "purple",
  },
  { id: "wilayah", label: "Wilayah", icon: <FaMapMarkedAlt />, color: "green" },
  { id: "demografi", label: "Demografi", icon: <FaUsers />, color: "orange" },
  { id: "media", label: "Media & Sosmed", icon: <FaGlobe />, color: "pink" },
];

export default function FormProfil({ initialData }: { initialData: any }) {
  const [activeTab, setActiveTab] = useState("identitas");
  const [isLoading, setIsLoading] = useState(false);

  // State Gambar
  const [logoUrl, setLogoUrl] = useState(initialData?.logo || "");
  const [kantorUrl, setKantorUrl] = useState(initialData?.gambarKantor || "");
  const [logoUploading, setLogoUploading] = useState(false);
  const [kantorUploading, setKantorUploading] = useState(false);

  // Toast State
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ show: true, message: msg, type });
    setTimeout(
      () => setToast({ show: false, message: "", type: "success" }),
      4000,
    );
  };

  // Fungsi Kompresi Gambar
  const compressImage = async (
    file: File,
    maxWidth: number = 1920,
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = document.createElement("img");
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const scaleSize = img.width > maxWidth ? maxWidth / img.width : 1;
          canvas.width = scaleSize < 1 ? maxWidth : img.width;
          canvas.height = img.height * scaleSize;

          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(
            (blob) => {
              if (blob) resolve(blob);
              else reject(new Error("Gagal kompresi"));
            },
            "image/webp",
            0.92,
          );
        };
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle Upload Gambar dengan Kompresi
  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "logo" | "kantor",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("File harus berupa gambar", "error");
      return;
    }

    const setUploading =
      type === "logo" ? setLogoUploading : setKantorUploading;
    const setUrl = type === "logo" ? setLogoUrl : setKantorUrl;

    try {
      setUploading(true);

      // Kompresi gambar
      const compressedBlob = await compressImage(
        file,
        type === "logo" ? 1000 : 1920,
      );
      const fileName = `profil/${type}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.webp`;
      const compressedFile = new File([compressedBlob], fileName, {
        type: "image/webp",
      });

      const { error } = await supabase.storage
        .from("public_sukajadi")
        .upload(fileName, compressedFile);

      if (error) throw error;

      const { data } = supabase.storage
        .from("public_sukajadi")
        .getPublicUrl(fileName);

      setUrl(data.publicUrl);
      showToast(
        `${type === "logo" ? "Logo" : "Foto kantor"} berhasil diupload`,
        "success",
      );
    } catch (err) {
      console.error("Upload error:", err);
      showToast("Gagal upload gambar", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (type: "logo" | "kantor") => {
    if (type === "logo") setLogoUrl("");
    else setKantorUrl("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append("logo", logoUrl);
    formData.append("gambarKantor", kantorUrl);

    try {
      await updateProfilKelurahan(formData);
      showToast("Profil Kelurahan berhasil diperbarui!", "success");
    } catch (error) {
      console.error("Submit error:", error);
      showToast("❌ Terjadi kesalahan saat menyimpan", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Toast Notification - Modern Style */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-5">
          <div
            className={`flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl backdrop-blur-sm border-2 min-w-[320px] ${
              toast.type === "success"
                ? "bg-green-50/95 text-green-800 border-green-300"
                : "bg-red-50/95 text-red-800 border-red-300"
            }`}
          >
            <div
              className={`p-2 rounded-full ${toast.type === "success" ? "bg-green-100" : "bg-red-100"}`}
            >
              {toast.type === "success" ? (
                <FaCheckCircle className="text-green-600" size={20} />
              ) : (
                <FaExclamationCircle className="text-red-600" size={20} />
              )}
            </div>
            <span className="font-medium text-sm flex-1">{toast.message}</span>
            <button
              onClick={() => setToast({ ...toast, show: false })}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <FaTimes size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Tabs Header - Modern Gradient */}
      <div className="flex overflow-x-auto border-b bg-gradient-to-r from-gray-50 to-gray-100 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap transition-all duration-300 border-b-3 relative group ${
              activeTab === tab.id
                ? "border-blue-600 text-blue-600 bg-white shadow-sm"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-white/50"
            }`}
          >
            <span
              className={`transition-transform group-hover:scale-110 ${activeTab === tab.id ? "scale-110" : ""}`}
            >
              {tab.icon}
            </span>
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 lg:p-10">
        {/* --- TAB 1: IDENTITAS --- */}
        <div
          className={activeTab === "identitas" ? "block space-y-6" : "hidden"}
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                Nama Kelurahan
              </label>
              <input
                type="text"
                name="namaKelurahan"
                defaultValue={initialData?.namaKelurahan}
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all group-hover:border-gray-300"
                placeholder="Kelurahan Sukajadi"
                required
              />
            </div>
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                Kode Pos
              </label>
              <input
                type="text"
                name="kodePos"
                defaultValue={initialData?.kodePos}
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all group-hover:border-gray-300"
                placeholder="30xxx"
              />
            </div>
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                Email Resmi
              </label>
              <input
                type="email"
                name="email"
                defaultValue={initialData?.email}
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all group-hover:border-gray-300"
                placeholder="sukajadi@example.com"
              />
            </div>
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                Nomor Telepon
              </label>
              <input
                type="text"
                name="nomorTelepon"
                defaultValue={initialData?.nomorTelepon}
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all group-hover:border-gray-300"
                placeholder="(0711) xxx-xxxx"
              />
            </div>
            <div className="md:col-span-2 group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                Alamat Lengkap
              </label>
              <textarea
                name="alamat"
                rows={3}
                defaultValue={initialData?.alamat}
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none group-hover:border-gray-300"
                placeholder="Masukkan alamat lengkap kantor kelurahan..."
                required
              ></textarea>
            </div>
            <div className="md:col-span-2 group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                Website
              </label>
              <input
                type="text"
                name="website"
                defaultValue={initialData?.website}
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all group-hover:border-gray-300"
                placeholder="https://sukajadi.banyuasinkab.go.id"
              />
            </div>
          </div>
        </div>

        {/* --- TAB 2: SEJARAH & VISI --- */}
        <div className={activeTab === "sejarah" ? "block space-y-6" : "hidden"}>
          <div className="group">
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-purple-600 rounded-full"></span>
              Sejarah Singkat
            </label>
            <textarea
              name="sejarah"
              rows={8}
              defaultValue={initialData?.sejarah}
              className="w-full border-2 border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none group-hover:border-gray-300"
              placeholder="Tuliskan sejarah singkat kelurahan..."
            ></textarea>
          </div>
          <div className="group">
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-purple-600 rounded-full"></span>
              Visi & Misi
            </label>
            <textarea
              name="visiMisi"
              rows={8}
              defaultValue={initialData?.visiMisi}
              className="w-full border-2 border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none group-hover:border-gray-300"
              placeholder="Tuliskan visi dan misi kelurahan..."
            ></textarea>
          </div>
        </div>

        {/* --- TAB 3: WILAYAH --- */}
        <div className={activeTab === "wilayah" ? "block space-y-6" : "hidden"}>
          <div className="group">
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-green-600 rounded-full"></span>
              Luas Wilayah
            </label>
            <input
              type="text"
              name="luasWilayah"
              defaultValue={initialData?.luasWilayah}
              className="w-full border-2 border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all group-hover:border-gray-300"
              placeholder="Contoh: 517.2 Ha"
            />
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-100">
            <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2">
              <FaMapMarkedAlt /> Batas Wilayah
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {["Utara", "Selatan", "Timur", "Barat"].map((direction) => (
                <div key={direction} className="group">
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                    Batas {direction}
                  </label>
                  <input
                    type="text"
                    name={`batas${direction}`}
                    defaultValue={initialData?.[`batas${direction}`]}
                    className="w-full border-2 border-white bg-white p-2.5 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-sm group-hover:border-green-200"
                    placeholder={`Kelurahan/Desa sebelah ${direction.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-blue-50 p-5 rounded-xl border-2 border-blue-100">
              <label className="block text-sm font-bold text-blue-800 mb-3 flex items-center gap-2">
                <FaBuilding /> Jumlah RW
              </label>
              <input
                type="number"
                name="jumlahRW"
                defaultValue={initialData?.jumlahRW}
                className="w-full text-center text-2xl font-bold border-2 border-blue-200 bg-white p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="bg-indigo-50 p-5 rounded-xl border-2 border-indigo-100">
              <label className="block text-sm font-bold text-indigo-800 mb-3 flex items-center gap-2">
                <FaBuilding /> Jumlah RT
              </label>
              <input
                type="number"
                name="jumlahRT"
                defaultValue={initialData?.jumlahRT}
                className="w-full text-center text-2xl font-bold border-2 border-indigo-200 bg-white p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* --- TAB 4: DEMOGRAFI --- */}
        <div
          className={activeTab === "demografi" ? "block space-y-6" : "hidden"}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-2xl border-2 border-orange-100 text-center group hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FaUsers size={32} className="text-white" />
              </div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Jumlah Penduduk
              </label>
              <input
                type="number"
                name="jumlahPenduduk"
                defaultValue={initialData?.jumlahPenduduk}
                className="w-full text-center font-bold text-3xl border-2 border-orange-200 bg-white p-4 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="0"
              />
              <p className="text-xs text-gray-500 mt-2">Jiwa</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-green-100 text-center group hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FaBuilding size={32} className="text-white" />
              </div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Jumlah Kepala Keluarga
              </label>
              <input
                type="number"
                name="jumlahKK"
                defaultValue={initialData?.jumlahKK}
                className="w-full text-center font-bold text-3xl border-2 border-green-200 bg-white p-4 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="0"
              />
              <p className="text-xs text-gray-500 mt-2">KK</p>
            </div>
          </div>
        </div>

        {/* --- TAB 5: MEDIA & GAMBAR --- */}
        <div className={activeTab === "media" ? "block space-y-8" : "hidden"}>
          {/* Upload Section - DIPERBESAR & LEBIH INTERAKTIF */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
              <FaCamera className="text-blue-600" /> Upload Media
            </h3>

            {/* Logo Upload - BESAR & INTERAKTIF */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200">
              <label className="block text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Logo Kelurahan
              </label>

              {logoUrl ? (
                <div className="relative group">
                  <div className="w-full aspect-square max-w-sm mx-auto border-4 border-white rounded-2xl overflow-hidden shadow-xl bg-white">
                    <img
                      src={logoUrl}
                      alt="Logo"
                      className="w-full h-full object-contain p-6"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage("logo")}
                    className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow-lg opacity-0 group-hover:opacity-100"
                  >
                    <FaTimes size={16} />
                  </button>
                  <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-2xl">
                    <div className="text-white text-center">
                      <FaUpload size={32} className="mx-auto mb-2" />
                      <span className="text-sm font-bold">Ganti Logo</span>
                    </div>
                    <input
                      type="file"
                      onChange={(e) => handleUpload(e, "logo")}
                      accept="image/*"
                      className="hidden"
                      disabled={logoUploading}
                    />
                  </label>
                </div>
              ) : (
                <label className="block cursor-pointer group">
                  <div className="w-full aspect-square max-w-sm mx-auto border-4 border-dashed border-blue-300 rounded-2xl bg-white hover:bg-blue-50 transition-all flex flex-col items-center justify-center p-8 group-hover:border-blue-500">
                    {logoUploading ? (
                      <>
                        <FaSpinner
                          className="text-blue-500 animate-spin mb-4"
                          size={48}
                        />
                        <p className="text-blue-600 font-bold">Mengupload...</p>
                        <p className="text-xs text-gray-500 mt-2">
                          Mohon tunggu sebentar
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <FaImage className="text-blue-500" size={32} />
                        </div>
                        <p className="text-blue-800 font-bold mb-2">
                          Upload Logo Kelurahan
                        </p>
                        <p className="text-sm text-gray-600 text-center max-w-xs">
                          Klik untuk memilih file atau drag & drop di sini
                        </p>
                        <p className="text-xs text-gray-400 mt-3">
                          Format: JPG, PNG, WebP • Max: 5MB
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    onChange={(e) => handleUpload(e, "logo")}
                    accept="image/*"
                    className="hidden"
                    disabled={logoUploading}
                  />
                </label>
              )}
            </div>

            {/* Foto Kantor Upload - BESAR & INTERAKTIF */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200">
              <label className="block text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Foto Kantor Depan
              </label>

              {kantorUrl ? (
                <div className="relative group">
                  <div className="w-full aspect-video max-w-3xl mx-auto border-4 border-white rounded-2xl overflow-hidden shadow-xl bg-white">
                    <img
                      src={kantorUrl}
                      alt="Kantor"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage("kantor")}
                    className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow-lg opacity-0 group-hover:opacity-100"
                  >
                    <FaTimes size={16} />
                  </button>
                  <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-2xl">
                    <div className="text-white text-center">
                      <FaUpload size={32} className="mx-auto mb-2" />
                      <span className="text-sm font-bold">Ganti Foto</span>
                    </div>
                    <input
                      type="file"
                      onChange={(e) => handleUpload(e, "kantor")}
                      accept="image/*"
                      className="hidden"
                      disabled={kantorUploading}
                    />
                  </label>
                </div>
              ) : (
                <label className="block cursor-pointer group">
                  <div className="w-full aspect-video max-w-3xl mx-auto border-4 border-dashed border-green-300 rounded-2xl bg-white hover:bg-green-50 transition-all flex flex-col items-center justify-center p-8 group-hover:border-green-500">
                    {kantorUploading ? (
                      <>
                        <FaSpinner
                          className="text-green-500 animate-spin mb-4"
                          size={48}
                        />
                        <p className="text-green-600 font-bold">
                          Mengupload...
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          Mohon tunggu sebentar
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <FaCamera className="text-green-500" size={32} />
                        </div>
                        <p className="text-green-800 font-bold mb-2">
                          Upload Foto Kantor
                        </p>
                        <p className="text-sm text-gray-600 text-center max-w-xs">
                          Klik untuk memilih file atau drag & drop di sini
                        </p>
                        <p className="text-xs text-gray-400 mt-3">
                          Format: JPG, PNG, WebP • Max: 10MB
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    onChange={(e) => handleUpload(e, "kantor")}
                    accept="image/*"
                    className="hidden"
                    disabled={kantorUploading}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Social Media Links */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-100">
            <h4 className="font-bold text-blue-600 mb-5 flex items-center gap-2">
              <FaGlobe /> Media Sosial
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  name: "facebook",
                  label: "Facebook",
                  placeholder: "https://facebook.com/...",
                },
                {
                  name: "instagram",
                  label: "Instagram",
                  placeholder: "https://instagram.com/...",
                },
                {
                  name: "twitter",
                  label: "Twitter / X",
                  placeholder: "https://twitter.com/...",
                },
                {
                  name: "youtube",
                  label: "YouTube",
                  placeholder: "https://youtube.com/@...",
                },
              ].map((social) => (
                <div key={social.name} className="group">
                  <label className="block text-xs font-bold text-gray-600 mb-2 flex items-center gap-2">
                    {social.label}
                  </label>
                  <input
                    type="text"
                    name={social.name}
                    defaultValue={initialData?.[social.name]}
                    className="w-full border-2 border-gray-200 bg-white p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-100 outline-none transition-all text-sm group-hover:border-blue-300"
                    placeholder={social.placeholder}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions - Sticky Bottom */}
        <div className="mt-10 pt-6 border-t-2 border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 sticky bottom-0 bg-white -mx-6 md:-mx-8 lg:-mx-10 px-6 md:px-8 lg:px-10 py-4 shadow-lg">
          <p className="text-sm text-gray-500 italic">
            💡 Perubahan akan tersimpan permanen setelah klik tombol simpan
          </p>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-3.5 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin" size={18} />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <FaSave
                  className="group-hover:scale-110 transition-transform"
                  size={18}
                />
                <span>Simpan Perubahan</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
