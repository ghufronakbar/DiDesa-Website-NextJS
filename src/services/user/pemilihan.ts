import { ApiSuccessUser } from "@/models/ApiSuccessUser";
import { PemilihanKetua } from "@/models/PemilihanKetua";
import axiosInstance from "@/utils/axiosInstance";

const getLatestPemilihan = async () => {
  const response = await axiosInstance.get<ApiSuccessUser<PemilihanKetua>>(
    "/api/user/pemilihan/latest"
  );
  return response.data;
};

const doVote = async (calonKetuaId: number) => {
  const response = await axiosInstance.post(`/api/user/pemilihan`, {
    calonKetuaId,
  });
  return response.data;
};

export { getLatestPemilihan, doVote };
