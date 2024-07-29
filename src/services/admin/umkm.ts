import axiosInstance from "@/utils/axiosInstance";

const getAllUmkm = async (page: number) => {
  const response = await axiosInstance.get("/api/admin/umkm", {
    params: { page },
  });
  return response.data;
};

const deleteUmkm = async (umkmId: number) => {
  const response = await axiosInstance.delete(`/api/admin/umkm/${umkmId}`);
  return response.data;
};

const putApproveUmkm = async (umkmId: number, approve: boolean) => {
  const response = await axiosInstance.put(
    `/api/admin/umkm/approve/${umkmId}`,
    { approve }
  );
  return response.data;
};

export { getAllUmkm, deleteUmkm, putApproveUmkm };
