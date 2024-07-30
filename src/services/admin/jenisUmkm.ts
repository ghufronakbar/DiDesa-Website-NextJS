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

const createJenisUmkm = async (namaJenisUmkm: string) => {
  const response = await axiosInstance.post("/api/admin/jenis-umkm", {
    namaJenisUmkm,
  });
  return response.data;
};

const editJenisUmkm = async (jenisUmkmId: number, namaJenisUmkm: string) => {
  const response = await axiosInstance.put(
    `/api/admin/jenis-umkm/${jenisUmkmId}`,
    { namaJenisUmkm }
  );
  return response.data;
};

export { getAllJenisUmkm, deleteJenisUmkm, createJenisUmkm, editJenisUmkm };
