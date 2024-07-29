import axiosInstance from "@/utils/axiosInstance";

const getAllJenisUmkm = async () => {
  const response = await axiosInstance.get("/api/admin/jenis-umkm");
  return response.data;
};

const deleteJenisUmkm = async (jenisUmkmId: number) => {
  const response = await axiosInstance.delete(
    `/api/admin/jenis-umkm/${jenisUmkmId}`
  );
  return response.data;
};

export { getAllJenisUmkm, deleteJenisUmkm };
