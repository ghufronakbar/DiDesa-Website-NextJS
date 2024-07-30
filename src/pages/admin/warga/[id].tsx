import React, { useEffect, useState } from "react";
import LayoutDashboard from "@/components/LayoutDashboard";
import { editWarga, getWargaById } from "@/services/admin/warga";
import { useToast } from "@/components/Toast";
import LoadingState from "@/components/LoadingState";
import { ApiError } from "@/models/ApiError";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "@/components/LoadingPage";
import ModalError from "@/components/ModalError";
import formatConvertIsoToNormal from "@/utils/format/formatConvertIsoToNormal";
import withAdminAuth from "@/utils/withAdminAuth";

const EditWargaPage: React.FC = () => {
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const { showToast } = useToast();
  const router = useRouter();
  const {id} = router.query
  const [form, setForm] = useState({
    namaLengkap: "",
    nik: "",
    kk: "",
    tanggalLahir: "",
    telepon: "",
  });

  const {data, isLoading, isFetching, isError} = useQuery({
    queryKey: ['warga', id],
    queryFn: () => router.isReady && id && typeof id === 'string'? getWargaById(Number(id)): null,
  })

  useEffect(() => {
    if(data){
        setForm({
            namaLengkap: data?.data?.namaLengkap,
            nik: data?.data?.nik,
            kk: data?.data?.kk,
            tanggalLahir: formatConvertIsoToNormal(data?.data?.tanggalLahir),
            telepon: data?.data?.telepon.slice(2)
        })
    }  
  },[data])

  const handleEdit = async () => {
    if (
      form.namaLengkap === "" ||
      form.nik === "" ||
      form.kk === "" ||
      form.tanggalLahir === "" ||
      form.telepon === ""
    ) {
      showToast("Semua kolom harus diisi", "error");
      return;
    }
    setIsWaiting(true);
    try {
      const response = await editWarga(
        Number(id),
        form.namaLengkap,
        form.nik,
        form.kk,
        new Date(form.tanggalLahir).toISOString(),
        `62${form.telepon}`
      );
      showToast(response?.message, "info");
      setIsWaiting(false);
      router.push("/admin/warga");
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
          <h1 className="text-4xl font-semibold mb-8">Edit Warga</h1>
          <div className="flex flex-col border rounded-md p-4">
            <div className="mb-4">
              <label
                htmlFor="namaLengkap"
                className="block text-gray-700 font-medium mb-2"
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                id="namaLengkap"
                className="w-full px-3 py-2 border rounded-md"
                value={form?.namaLengkap}
                onChange={(e) =>
                  setForm({ ...form, namaLengkap: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
              <div className="mb-4 md:mb-0 md:flex-1">
                <label
                  htmlFor="nik"
                  className="block text-gray-700 font-medium mb-2"
                >
                  NIK
                </label>
                <input
                  type="text"
                  id="nik"
                  inputMode="numeric"
                  className="w-full px-3 py-2 border rounded-md"
                  value={form?.nik}
                  onChange={(e) => setForm({ ...form, nik: e.target.value })}
                />
              </div>
              <div className="md:flex-1">
                <label
                  htmlFor="kk"
                  className="block text-gray-700 font-medium mb-2"
                >
                  KK
                </label>
                <input
                  type="text"
                  id="kk"
                  inputMode="numeric"
                  className="w-full px-3 py-2 border rounded-md"
                  value={form?.kk}
                  onChange={(e) => setForm({ ...form, kk: e.target.value })}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
              <div className="mb-4 md:mb-0 md:flex-1">
                <label
                  htmlFor="tanggalLahir"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  id="tanggalLahir"
                  className="w-full px-3 py-2 border rounded-md"
                  value={form?.tanggalLahir}
                  onChange={(e) =>
                    setForm({ ...form, tanggalLahir: e.target.value })
                  }
                />
              </div>              
              <div className="md:flex-1">
                <label
                  htmlFor="telepon"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Telepon
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 rounded-l-md bg-gray-50 text-gray-500 text-sm">
                    +62
                  </span>
                  <input
                    type="text"
                    id="telepon"
                    className="w-full px-3 py-2 border rounded-r-md"
                    inputMode="numeric"
                    value={form?.telepon}
                    onChange={(e) =>
                      setForm({ ...form, telepon: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handleEdit}
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

export default withAdminAuth(EditWargaPage);
