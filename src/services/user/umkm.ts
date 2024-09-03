import { Umkm } from "@/models/Umkm";
import axiosInstance from "@/utils/axiosInstance";

const getUmkm = async (limit: number, q: number, search: string) => {
  const response = await axiosInstance.get("/api/user/umkm", {
    params: {
      limit,
      q,
      search,
    },
  });
  return response.data;
};

const getJenisUmkm = async () => {
  const response = await axiosInstance.get("/api/user/umkm/jenis");
  return response.data;
};

const getDetailUmkm = async (id: number): Promise<Umkm> => {
  const response = await axiosInstance.get(`/api/user/umkm/${id}`);
  return response.data.data;
};

export { getUmkm, getJenisUmkm, getDetailUmkm };
