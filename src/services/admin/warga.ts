import axiosInstance from "@/utils/axiosInstance";

const getAllWarga = async (page: number) => {
  const response = await axiosInstance.get("/api/admin/warga", {
    params: { page },
  });
  return response.data;
};

const getWargaById = async (wargaId: number) => {
  const response = await axiosInstance.get(`/api/admin/warga/${wargaId}`);
  return response.data;
};

const deleteWarga = async (wargaId: number) => {
  const response = await axiosInstance.delete(`/api/admin/warga/${wargaId}`);
  return response.data;
};

const createWarga = async (
  namaLengkap: string,
  nik: string,
  kk: string,
  tanggalLahir: string,
  telepon: string
) => {
  const response = await axiosInstance.post("/api/admin/warga", {
    namaLengkap,
    nik,
    kk,
    tanggalLahir,
    telepon,
  });

  return response.data;
};

const editWarga = async (
  id: number,
  namaLengkap: string,
  nik: string,
  kk: string,
  tanggalLahir: string,
  telepon: string
) => {
  const response = await axiosInstance.put(`/api/admin/warga/${id}`, {
    namaLengkap,
    nik,
    kk,
    tanggalLahir,
    telepon,
  });

  return response.data;
};

const getAllDataWarga = async () => {
  const response = await axiosInstance.get("/api/admin/warga/all");
  return response.data;
};

export { getAllWarga, deleteWarga, createWarga, editWarga, getWargaById, getAllDataWarga };
