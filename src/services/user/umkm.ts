import axiosInstance from "@/utils/axiosInstance";

const getUmkm = async (limit: number, q?: number) => {
  const response = await axiosInstance.get("/api/user/umkm", {
    params: {
      limit,
      q,
    },
  });
  return response.data;
};

const getJenisUmkm = async () => {
  const response = await axiosInstance.get("/api/user/umkm/jenis");
  return response.data;
};

export { getUmkm, getJenisUmkm };
