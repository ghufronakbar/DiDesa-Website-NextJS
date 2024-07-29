import axiosInstance from "@/utils/axiosInstance";

const getAllWarga = async (page: number) => {
  const response = await axiosInstance.get("/api/admin/warga", {
    params: { page },
  });
  return response.data;
};

const deleteWarga = async (wargaId: number) => {
  const response = await axiosInstance.delete(`/api/admin/warga/${wargaId}`);
  return response.data;
};

export { getAllWarga, deleteWarga };
