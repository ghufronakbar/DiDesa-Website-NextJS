import axiosInstance from "@/utils/axiosInstance";

const getAllKomentar = async (page: number) => {
  const response = await axiosInstance.get("/api/admin/komentar", {
    params: { page },
  });
  return response.data;
};

const deleteKomentar = async (komentarId: number) => {
  const response = await axiosInstance.delete(`/api/admin/komentar/${komentarId}`);
  return response.data;
};



export { getAllKomentar, deleteKomentar };
