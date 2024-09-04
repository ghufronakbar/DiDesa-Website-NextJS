import { ApiSuccessUser } from "@/models/ApiSuccessUser";
import { PengaduanMasyarakat } from "@/models/PengaduanMasyarakat";
import axiosInstance from "@/utils/axiosInstance";

const getDetailPengaduan = async (id: number): Promise<PengaduanMasyarakat> => {
  const response = await axiosInstance.get(
    `/api/user/pengaduan-masyarakat/${id}`
  );
  return response.data.data;
};

const deletePengaduan = async (
  pengaduanMasyarakat: number
): Promise<ApiSuccessUser> => {
  const response = await axiosInstance.delete(
    `/api/user/pengaduan-masyarakat/${pengaduanMasyarakat}`
  );
  return response.data;
};
const createPengaduan = async (subjek: string, isi: string, foto?: File) => {
  let data: FormData | { subjek: string; isi: string };
  if (foto) {
    const formData = new FormData();
    formData.append("subjek", subjek);
    formData.append("isi", isi);
    formData.append("foto", foto);
    data = formData;
  } else {
    data = {
      subjek,
      isi,
    };
  }

  const response = await axiosInstance.post(
    "/api/user/pengaduan-masyarakat",
    data
  );
  return response.data;
};
export { getDetailPengaduan, deletePengaduan, createPengaduan };
