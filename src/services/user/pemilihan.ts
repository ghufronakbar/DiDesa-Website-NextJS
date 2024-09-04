import { ApiSuccessUser } from "@/models/ApiSuccessUser";
import { PemilihanKetua } from "@/models/PemilihanKetua";
import axiosInstance from "@/utils/axiosInstance";

interface PemilihanResponse extends ApiSuccessUser {
  data: PemilihanKetua;
}

const getLatestPemilihan = async (): Promise<PemilihanResponse> => {
  const response = await axiosInstance.get("/api/user/pemilihan/latest");
  return response.data;
};

const doVote = async (calonKetuaId: number): Promise<ApiSuccessUser> => {
  const response = await axiosInstance.post(`/api/user/pemilihan`, {
    calonKetuaId,
  });
  return response.data;
};

export { getLatestPemilihan, doVote };
