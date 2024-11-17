import { COOKIES_KEY } from "@/constant/keyStore";
import { ApiSuccessUser } from "@/models/ApiSuccessUser";
import { Warga } from "@/models/Warga";
import axiosInstance from "@/utils/axiosInstance";
import Cookies from "js-cookie";

export interface LoginResponse extends ApiSuccessUser<Warga> {
  token: string;
}

const getProfile = async () => {
  try {
    const response = await axiosInstance.get<ApiSuccessUser<Warga>>(
      "/api/user/account/profile"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (nik: string, password: string) => {
  const response = await axiosInstance.post<LoginResponse>(
    "/api/user/account/login",
    {
      nik,
      password,
    }
  );
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

const deletePicUser = async () => {
  try {
    const response = await axiosInstance.delete("/api/user/account/profile");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updatePicUser = async (foto: File) => {
  const formData = new FormData();
  formData.append("foto", foto);
  try {
    const response = await axiosInstance.put(
      "/api/user/account/profile",
      formData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getProfile, loginUser, logoutUser, deletePicUser, updatePicUser };
