import { COOKIES_KEY } from "@/constant/keyStore";
import { ApiSuccessUser } from "@/models/ApiSuccessUser";
import { Warga } from "@/models/Warga";
import axiosInstance from "@/utils/axiosInstance";
import Cookies from "js-cookie";

export type ProfileResponse = ApiSuccessUser & {
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

const logoutUser = async () => {
  Cookies.remove(COOKIES_KEY);
  try {
    await getProfile();    
  } catch (error) {    
  } finally {
    window.location.reload();
  }
};

export { getProfile, loginUser, logoutUser };
