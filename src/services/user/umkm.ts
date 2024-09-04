import { ApiSuccessUser } from "@/models/ApiSuccessUser";
import { Umkm } from "@/models/Umkm";
import axiosInstance from "@/utils/axiosInstance";

interface UmkmResponse extends ApiSuccessUser {
  data: Umkm[];
  dataLength: {
    currentData: number;
    totalData: number;
  };
}

const getUmkm = async (
  limit: number,
  q: number,
  search: string
): Promise<UmkmResponse> => {
  const response = await axiosInstance.get("/api/user/umkm", {
    params: {
      limit,
      q,
      search,
    },
  });
  return response.data;
};

const getJenisUmkm = async () => {
  const response = await axiosInstance.get("/api/user/umkm/jenis");
  return response.data;
};

const getDetailUmkm = async (id: number): Promise<Umkm> => {
  const response = await axiosInstance.get(`/api/user/umkm/${id}`);
  console.log(response);
  return response.data.data;
};

const setStatusUmkm = async (
  id: number,
  status: boolean
): Promise<ApiSuccessUser> => {
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
): Promise<ApiSuccessUser> => {
  const response = await axiosInstance.put(`/api/user/umkm/${id}`, {
    nama,
    deskripsi,
    lokasi,
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
  const response = await axiosInstance.put(`/api/user/umkm/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const createUmkm = async (
  nama: string,
  deskripsi: string,
  lokasi: string,
  jenisUmkmId: number,
  gambar: File
): Promise<ApiSuccessUser> => {
  const formData = new FormData();
  formData.append("nama", nama);
  formData.append("deskripsi", deskripsi);
  formData.append("lokasi", lokasi);
  formData.append("jenisUmkmId", String(jenisUmkmId));
  formData.append("gambar", gambar);
  const response = await axiosInstance.post("/api/user/umkm", formData);
  return response.data;
};

const deleteUmkm = async (umkmId: number): Promise<ApiSuccessUser> => {
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
