import { ApiSuccessUser } from "@/models/ApiSuccessUser";
import { Warga } from "@/models/Warga";
import axiosInstance from "@/utils/axiosInstance";

type ProfileResponse = ApiSuccessUser & {
  data: Warga;
};

type LoginResponse = ApiSuccessUser & {
  token: string;
  data: Warga;
};

const getProfile = async (): Promise<ProfileResponse> => {
  try {
    const response = await axiosInstance.get("/api/user/account/profile");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (
  nik: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axiosInstance.post("/api/user/account/login", {
    nik,
    password,
  });
  return response.data;
};

export { getProfile, loginUser };
