import React, { useState } from "react";
import LayoutDashboard from "@/components/LayoutDashboard";
import { createWarga } from "@/services/admin/warga";
import { useToast } from "@/components/Toast";
import LoadingState from "@/components/LoadingState";
import { ApiError } from "@/models/Response";
import { useRouter } from "next/router";
import withAdminAuth from "@/utils/withAdminAuth";

const TambahWargaPage: React.FC = () => {
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const { showToast } = useToast();
  const router = useRouter();
  const [data, setData] = useState({
    namaLengkap: "",
    nik: "",
    kk: "",
    tanggalLahir: "",
    telepon: "",
  });

  const handleAdd = async () => {
    if (
      data.namaLengkap === "" ||
      data.nik === "" ||
      data.kk === "" ||
      data.tanggalLahir === "" ||
      data.telepon === ""
    ) {
      showToast("Semua kolom harus diisi", "error");
      return;
    }
    setIsWaiting(true);
    try {
      const response = await createWarga(
        data.namaLengkap,
        data.nik,
        data.kk,
        new Date(data.tanggalLahir).toISOString(),
        `62${data.telepon}`
      );
      showToast(response?.message, "success");
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
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <h1 className="text-4xl font-semibold mb-8">Tambah Warga</h1>
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
                onChange={(e) =>
                  setData({ ...data, namaLengkap: e.target.value })
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
                  onChange={(e) => setData({ ...data, nik: e.target.value })}
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
                  onChange={(e) => setData({ ...data, kk: e.target.value })}
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
                  onChange={(e) =>
                    setData({ ...data, tanggalLahir: e.target.value })
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
                    onChange={(e) =>
                      setData({ ...data, telepon: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <button
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handleAdd}
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

export default withAdminAuth(TambahWargaPage);
