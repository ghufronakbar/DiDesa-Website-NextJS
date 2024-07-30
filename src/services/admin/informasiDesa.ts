import axiosInstance from "@/utils/axiosInstance";

const getInformasiDesa = async () => {
  const response = await axiosInstance.get("/api/admin/informasi-desa");
  return response.data;
};

const editInformasiDesa = async (
  namaDesa: string,
  deskripsi: string,
  lahanPertanian: number,
  lahanPeternakan: number
) => {
  const response = await axiosInstance.put("/api/admin/informasi-desa", {
    namaDesa,
    deskripsi,
    lahanPertanian,
    lahanPeternakan,
  });
  return response.data;
};

export { getInformasiDesa, editInformasiDesa };
