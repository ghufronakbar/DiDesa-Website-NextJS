import React, { useState } from "react";
import LayoutDashboard from "@/components/LayoutDashboard";
import Image from "next/image";
import { createBerita } from "@/services/admin/berita";
import { useToast } from "@/components/Toast";
import LoadingState from "@/components/LoadingState";
import { ApiError } from "@/models/ApiError";
import { useRouter } from "next/router";

const TambahBeritaPage: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const { showToast } = useToast();
  const router = useRouter();
  const [form, setForm] = useState({
    judul: "",
    subjudul: "",
    isi: "",
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleAdd = async () => {
    if (form.judul === "" || form.subjudul === "" || form.isi === "" || image === null) {
      showToast("Semua kolom harus diisi", "error");
      return;
    }
    setIsWaiting(true);
    try {    
      const response = await createBerita(form.judul, form.subjudul, form.isi, image);
      showToast(response?.message, "info");
      setIsWaiting(false);
      router.push("/admin/berita");
    } catch (error) {
      console.log(error);
      const apiError = error as ApiError;
      setIsWaiting(false);
      showToast(
        apiError.response?.data?.message || "An error occurred",
        "error"
      );
      setIsWaiting(false);
    }
  };

  return (
    <LayoutDashboard>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <h1 className="text-4xl font-semibold mb-8">Tambah Berita</h1>
          <div className="flex flex-col md:flex-row border rounded-md p-4">
            <div className="md:w-1/2 md:pr-4">
              <div className="mb-4">
                <label
                  htmlFor="judul"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Judul
                </label>
                <input
                  type="text"
                  id="judul"
                  className="w-full px-3 py-2 border rounded-md"
                  onChange={(e) => setForm({ ...form, judul: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="subjudul"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Sub Judul
                </label>
                <input
                  type="text"
                  id="subjudul"
                  className="w-full px-3 py-2 border rounded-md"
                  onChange={(e) =>
                    setForm({ ...form, subjudul: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="isi"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Isi
                </label>
                <textarea
                  id="isi"
                  className="w-full px-3 py-2 border rounded-md"
                  rows={6}
                  onChange={(e) => setForm({ ...form, isi: e.target.value })}
                ></textarea>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-4">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Upload Image
                </label>
                <input type="file" onChange={handleImageChange} />
                <div className="mt-4">
                  {imagePreview ? (
                    <div className="relative w-full h-64 border">
                      <Image
                        src={imagePreview}
                        alt="Selected"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                  ) : (
                    <p className="text-gray-500">Belum Memilih Gambar</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => {
                handleAdd();
              }}
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
      {isWaiting && <LoadingState />}
    </LayoutDashboard>
  );
};

export default TambahBeritaPage;
