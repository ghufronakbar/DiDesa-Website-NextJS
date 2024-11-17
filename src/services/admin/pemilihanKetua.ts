import { PemilihanKetua } from "@/models/PemilihanKetua";
import { ApiSuccess } from "@/models/Response";
import axiosInstance from "@/utils/axiosInstance";

const getAllPemilihan = async () => {
  const response = await axiosInstance.get<ApiSuccess<PemilihanKetua[]>>(
    "/api/admin/pemilihan"
  );
  return response.data;
};

const getPemilihanById = async (pemilihanKetuaId: number) => {
  const response = await axiosInstance.get<ApiSuccess<PemilihanKetua>>(
    `/api/admin/pemilihan/${pemilihanKetuaId}`
  );
  return response.data;
};

const createPemilihan = async (
  judul: string,
  deskripsi: string,
  tanggalMulai: string,
  tanggalSelesai: string
) => {
  const response = await axiosInstance.post("/api/admin/pemilihan", {
    judul,
    deskripsi,
    tanggalMulai,
    tanggalSelesai,
  });
  return response.data;
};

const editPemilihan = async (
  pemilihanKetuaId: number,
  judul: string,
  deskripsi: string,
  tanggalMulai: string,
  tanggalSelesai: string
) => {
  const response = await axiosInstance.put(
    `/api/admin/pemilihan/${pemilihanKetuaId}`,
    {
      judul,
      deskripsi,
      tanggalMulai,
      tanggalSelesai,
    }
  );
  return response.data;
};

const deletePemilihan = async (pemilihanKetuaId: number) => {
  const response = await axiosInstance.delete(
    `/api/admin/pemilihan/${pemilihanKetuaId}`
  );
  return response.data;
};

export {
  getAllPemilihan,
  getPemilihanById,
  createPemilihan,
  editPemilihan,
  deletePemilihan,
};
