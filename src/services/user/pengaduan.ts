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

export { getDetailPengaduan, deletePengaduan };
