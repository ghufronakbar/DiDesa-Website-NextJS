import axiosInstance from "@/utils/axiosInstance";

const getBeritaPopuler = async (limit: number) => {
  const response = await axiosInstance.get("/api/user/berita", {
    params: {
      limit,
      q: "populer",
    },
  });
  return response.data;
};
const getUmkm = async (limit: number) => {
  const response = await axiosInstance.get("/api/user/umkm", {
    params: {
      limit,
    },
  });
  return response.data;
};



export { getBeritaPopuler, getUmkm };
