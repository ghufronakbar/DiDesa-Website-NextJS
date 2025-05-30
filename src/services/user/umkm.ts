import { ApiSuccessUser } from "@/models/ApiSuccessUser";
import { JenisUmkm } from "@/models/JenisUmkm";
import { Umkm } from "@/models/Umkm";
import axiosInstance from "@/utils/axiosInstance";
import axios, { AxiosError } from "axios";

const getUmkm = async (limit: number, q: number, search: string) => {
  const response = await axiosInstance.get<ApiSuccessUser<Umkm[]>>(
    "/api/user/umkm",
    {
      params: {
        limit,
        q,
        search,
      },
    }
  );
  return response.data;
};

const getJenisUmkm = async () => {
  const response = await axiosInstance.get<ApiSuccessUser<JenisUmkm[]>>(
    "/api/user/umkm/jenis"
  );
  return response.data;
};

const getDetailUmkm = async (id: number) => {
  const response = await axiosInstance.get<ApiSuccessUser<Umkm>>(
    `/api/user/umkm/${id}`
  );
  return response.data.data;
};

const setStatusUmkm = async (id: number, status: boolean) => {
  const response = await axiosInstance.put(`/api/user/umkm/status/${id}`, {
    status,
  });
  return response.data;
};

const editUmkmWithoutImage = async (
  id: number,
  nama: string,
  deskripsi: string,
  lokasi: string
) => {
  const getCoor = await axios.post<GetCoor | null>("/api/location", {
    address: lokasi,
  });
  const response = await axiosInstance.put(`/api/user/umkm/${id}`, {
    nama,
    deskripsi,
    lokasi,
    latitude: getCoor?.data?.latitude,
    longitude: getCoor?.data?.longitude,
  });
  return response.data;
};

const editImageUmkm = async (id: number, image: File) => {
  const getData = await getDetailUmkm(id);
  const formData = new FormData();
  formData.append("gambar", image);
  formData.append("nama", getData?.nama);
  formData.append("deskripsi", getData?.deskripsi);
  formData.append("lokasi", getData?.lokasi);
  formData.append("latitude", String(getData?.latitude));
  formData.append("longitude", String(getData?.longitude));
  const response = await axiosInstance.put(`/api/user/umkm/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

interface GetCoor {
  latitude: number;
  longitude: number;
}

const createUmkm = async (
  nama: string,
  deskripsi: string,
  lokasi: string,
  jenisUmkmId: number,
  gambar: File
) => {
  const getCoor = await axios.post<GetCoor | null>("/api/location", {
    address: lokasi,
  });
  const formData = new FormData();
  formData.append("nama", nama);
  formData.append("deskripsi", deskripsi);
  formData.append("lokasi", lokasi);
  formData.append("jenisUmkmId", String(jenisUmkmId));
  formData.append("gambar", gambar);
  formData.append("latitude", String(getCoor?.data?.latitude));
  formData.append("longitude", String(getCoor?.data?.longitude));

  const response = await axiosInstance.post("/api/user/umkm", formData);
  return response.data;
};

const deleteUmkm = async (umkmId: number) => {
  const response = await axiosInstance.delete(`/api/user/umkm/${umkmId}`);
  return response.data;
};

export {
  getUmkm,
  getJenisUmkm,
  getDetailUmkm,
  setStatusUmkm,
  editUmkmWithoutImage,
  editImageUmkm,
  createUmkm,
  deleteUmkm,
};
