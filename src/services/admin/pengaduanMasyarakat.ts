import axiosInstance from "@/utils/axiosInstance";

const getAllPengaduan = async (page: number) => {
  const response = await axiosInstance.get("/api/admin/pengaduan-masyarakat", {
    params: { page },
  });
  return response.data;
};

const getPengaduanById = async (pengaduanMasyarakatId: number) => {
  const response = await axiosInstance.get(
    `/api/admin/pengaduan-masyarakat/${pengaduanMasyarakatId}`
  );
  return response.data;
};


const deletePengaduan = async (pengaduanMasyarakat: number) => {
  const response = await axiosInstance.delete(`/api/admin/pengaduan-masyarakat/${pengaduanMasyarakat}`);
  return response.data;
};

export { getAllPengaduan, getPengaduanById, deletePengaduan };