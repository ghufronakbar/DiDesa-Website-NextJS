import axiosInstance from "@/utils/axiosInstance";

const getCalonById = async (calonKetuaId: number) => {
  const response = await axiosInstance.get(
    `/api/admin/pemilihan/calon/${calonKetuaId}`
  );
  return response.data;
};

const createCalon = async (
  wargaId: number,
  pemilihanKetuaId: number,
  deskripsi: string
) => {
  const response = await axiosInstance.post("/api/admin/pemilihan/calon", {
    wargaId,
    pemilihanKetuaId,
    deskripsi,
  });
  return response.data;
};

const editCalon = async (calonKetuaId: number, deskripsi: string) => {
  const response = await axiosInstance.put(
    `/api/admin/pemilihan/calon/${calonKetuaId}`,
    {
      deskripsi,
    }
  );
  return response.data;
};

const deleteCalon = async (calonKetuaId: number) => {
  const response = await axiosInstance.delete(
    `/api/admin/pemilihan/calon/${calonKetuaId}`
  );
  return response.data;
};

export { getCalonById, createCalon, editCalon, deleteCalon };
