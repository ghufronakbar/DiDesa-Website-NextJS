import { ApiSuccessUser } from "@/models/ApiSuccessUser";
import { Berita } from "@/models/Berita";
import axiosInstance from "@/utils/axiosInstance";

const getBerita = async (limit: number, search: string) => {
  const response = await axiosInstance.get<ApiSuccessUser<Berita[]>>(
    "/api/user/berita",
    {
      params: {
        limit,
        search,
      },
    }
  );
  return response.data;
};

const getDetailBerita = async (id: string) => {
  const response = await axiosInstance.get<ApiSuccessUser<Berita>>(
    `/api/user/berita/${id}`
  );
  return response.data.data;
};

const deleteKomentar = async (id: number) => {
  const response = await axiosInstance.delete(`/api/user/komentar/${id}`);
  return response.data;
};

const addKomentar = async (beritaId: number, isi: string) => {
  const response = await axiosInstance.post(`/api/user/komentar`, {
    isi,
    beritaId,
  });
  return response.data;
};

export { getBerita, getDetailBerita, deleteKomentar, addKomentar };
