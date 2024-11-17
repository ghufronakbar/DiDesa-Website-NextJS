import React, { useEffect, useState } from "react";
import LayoutDashboard from "@/components/LayoutDashboard";
import { useToast } from "@/components/Toast";
import LoadingState from "@/components/LoadingState";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "@/components/LoadingPage";
import ModalError from "@/components/ModalError";
import withAdminAuth from "@/utils/withAdminAuth";
import { ApiError } from "@/models/Response";
import {
  editInformasiDesa,
  getInformasiDesa,
} from "@/services/admin/informasiDesa";
import { InformasiDesa, initInformasiDesa } from "@/models/InformasiDesa";

const InformasiDesaPage: React.FC = () => {
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const { showToast } = useToast();

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["informasi-desa"],
    queryFn: () => getInformasiDesa(),
    refetchOnWindowFocus: false,
  });

  const [form, setForm] = useState<InformasiDesa>(initInformasiDesa);

  useEffect(() => {
    if (data) {
      setForm(data.data);
    }
  }, [data]);

  const handleConfirm = async () => {
    setIsWaiting(true);
    try {
      const response = await editInformasiDesa(
        form.namaDesa,
        form.deskripsi,
        form.luasWilayah,
        form.lahanPertanian,
        form.lahanPeternakan
      );
      showToast(response.message, "success");
      setIsWaiting(false);
    } catch (error) {
      console.log(error);
      const apiError = error as ApiError;
      setIsWaiting(false);
      showToast(
        apiError.response?.data?.message || "An error occurred",
        "error"
      );
    }
  };

  if (isLoading || isFetching) {
    return <LoadingPage />;
  }

  return (
    <LayoutDashboard>
      {isError ? <ModalError push="/admin/berita" /> : null}
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex flex-col border rounded-md p-4 w-full md:max-w-[500px] lg:max-w-[700px] mx-auto">
            <div className="mb-4"></div>
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-semibold">Informasi Desa</h1>
              <div className="mb-4 md:mb-0 md:flex-1">
                <label className="block text-gray-700 font-medium mb-2">
                  Nama Desa
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md"
                  type="text"
                  placeholder="Masukkan Nama Desa"
                  value={form?.namaDesa}
                  onChange={(e) =>
                    setForm({ ...form, namaDesa: e.target.value })
                  }
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">
                  Deskripsi
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md"
                  rows={5}
                  placeholder="Deskripsi Informasi Desa"
                  value={form?.deskripsi}
                  onChange={(e) =>
                    setForm({ ...form, deskripsi: e.target.value })
                  }
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">
                  Luas Wilayah
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md"
                  type="number"
                  inputMode="numeric"
                  placeholder="Luas Lahan Pertanian"
                  value={form?.luasWilayah}
                  onChange={(e) =>
                    setForm({ ...form, luasWilayah: Number(e.target.value) })
                  }
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">
                  Lahan Pertanian
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md"
                  type="number"
                  inputMode="numeric"
                  placeholder="Luas Lahan Pertanian"
                  value={form?.lahanPertanian}
                  onChange={(e) =>
                    setForm({ ...form, lahanPertanian: Number(e.target.value) })
                  }
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">
                  Lahan Peternakan
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md"
                  type="number"
                  inputMode="numeric"
                  placeholder="Luas Lahan Peternakan"
                  value={form?.lahanPeternakan}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      lahanPeternakan: Number(e.target.value),
                    })
                  }
                />
              </div>
              <button
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 w-fit h-fit self-center mt-4"
                onClick={() => {
                  handleConfirm();
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
      {isWaiting && <LoadingState />}
    </LayoutDashboard>
  );
};

export default withAdminAuth(InformasiDesaPage);
