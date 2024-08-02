import axiosInstance from "@/utils/axiosInstance";

const getBerita = async (limit: number) => {
  const response = await axiosInstance.get("/api/user/berita", {
    params: {
      limit,      
    },
  });
  return response.data;
};

export { getBerita }