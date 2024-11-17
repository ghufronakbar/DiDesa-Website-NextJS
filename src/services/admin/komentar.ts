import { Komentar } from "@/models/Komentar";
import { ApiSuccess } from "@/models/Response";
import axiosInstance from "@/utils/axiosInstance";

const getAllKomentar = async (page: number) => {
  const response = await axiosInstance.get<ApiSuccess<Komentar[]>>(
    "/api/admin/komentar",
    {
      params: { page },
    }
  );
  return response.data;
};

const deleteKomentar = async (komentarId: number) => {
  const response = await axiosInstance.delete(
    `/api/admin/komentar/${komentarId}`
  );
  return response.data;
};

export { getAllKomentar, deleteKomentar };
