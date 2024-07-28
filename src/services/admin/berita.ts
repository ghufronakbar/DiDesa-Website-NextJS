import axiosInstance from "@/utils/axiosInstance";

const getAllBerita = async (page: number) => {
  const response = await axiosInstance.get("/api/admin/berita", {
    params: { page },
  });
  return response.data;
};

const putPublikasiBerita = async (beritaId: number, publikasi: boolean) => {
  const response = await axiosInstance.put(
    `/api/admin/berita/publikasi/${beritaId}`,
    { publikasi }
  );
  return response.data;
};

const putPrioritasBerita = async (beritaId: number, prioritas: boolean) => {
  const response = await axiosInstance.put(
    `/api/admin/berita/prioritas/${beritaId}`,
    { prioritas }
  );
  return response.data;
};

const deleteBerita = async (beritaId: number) => {
  const response = await axiosInstance.delete(
    `/api/admin/berita/${beritaId}`
  );
  return response.data;
};

export { getAllBerita, putPublikasiBerita, putPrioritasBerita, deleteBerita };
