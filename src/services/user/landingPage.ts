import { ApiSuccessUser } from "@/models/ApiSuccessUser";
import { Berita } from "@/models/Berita";
import { Umkm } from "@/models/Umkm";
import axiosInstance from "@/utils/axiosInstance";

const getBeritaPopuler = async (limit: number) => {
  const response = await axiosInstance.get<ApiSuccessUser<Berita[]>>(
    "/api/user/berita",
    {
      params: {
        limit,
        q: "populer",
      },
    }
  );
  return response.data;
};
const getUmkm = async (limit: number) => {
  const response = await axiosInstance.get<ApiSuccessUser<Umkm[]>>(
    "/api/user/umkm",
    {
      params: {
        limit,
      },
    }
  );
  return response.data;
};

export { getBeritaPopuler, getUmkm };
