import React, { useEffect, useState } from "react";
import LayoutDashboard from "@/components/LayoutDashboard";
import Image from "next/image";
import { getBeritaById, editBerita } from "@/services/admin/berita";
import { useToast } from "@/components/Toast";
import LoadingState from "@/components/LoadingState";
import { ApiError } from "@/models/ApiError";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "@/components/LoadingPage";
import ModalError from "@/components/ModalError";
import withAdminAuth from "@/utils/withAdminAuth";

const EditBeritaPage: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const { showToast } = useToast();
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState({
    judul: "",
    subjudul: "",
    isi: "",
  });
  
  const {data,isLoading,isFetching,isError} = useQuery({
      queryKey: ['berita', id],
      queryFn: () => router.isReady && id && typeof id === 'string'? getBeritaById(Number(id)): null,
      refetchOnWindowFocus: false,
    })
    
    useEffect(() => {
        if(data){
            setImagePreview(data?.data?.gambar)
            setForm({
                judul: data?.data?.judul,
                subjudul: data?.data?.subjudul,
                isi: data?.data?.isi
            })
        }  
    },[data])

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

  const handleEdit = async () => {
    if (form.judul === "" || form.subjudul === "" || form.isi === "") {
      showToast("Semua kolom harus diisi", "error");
      return;
    }
    setIsWaiting(true);
    try {    
      const response = await editBerita(Number(id),form.judul, form.subjudul, form.isi, image);
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
        {isFetching || isLoading?<LoadingPage/>:null}        
        {isError?<ModalError push="/admin/berita"/>:null}
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <h1 className="text-4xl font-semibold mb-8">Edit Berita</h1>
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
                  value={form.judul}
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
                  value={form.subjudul}
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
                  value={form.isi}
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
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => {
                handleEdit();
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

export default withAdminAuth(EditBeritaPage);
