import { InformasiDesa } from "@/models/InformasiDesa";
import { ApiSuccess } from "@/models/Response";
import axiosInstance from "@/utils/axiosInstance";

const getInformasiDesa = async () => {
  const response = await axiosInstance.get<ApiSuccess<InformasiDesa>>(
    "/api/admin/informasi-desa"
  );
  return response.data;
};

const editInformasiDesa = async (
  namaDesa: string,
  deskripsi: string,
  luasWilayah: number,
  lahanPertanian: number,
  lahanPeternakan: number
) => {
  const response = await axiosInstance.put("/api/admin/informasi-desa", {
    namaDesa,
    deskripsi,
    luasWilayah,
    lahanPertanian,
    lahanPeternakan,
  });
  return response.data;
};

export { getInformasiDesa, editInformasiDesa };
