import { Berita } from "@/models/Berita";
import { ApiSuccess } from "@/models/Response";
import axiosInstance from "@/utils/axiosInstance";

const getAllBerita = async (page: number) => {
  const response = await axiosInstance.get<ApiSuccess<Berita[]>>(
    "/api/admin/berita",
    {
      params: { page },
    }
  );
  return response.data;
};

const getBeritaById = async (id: number) => {
  const response = await axiosInstance.get<ApiSuccess<Berita>>(`/api/admin/berita/${id}`);
  return response.data;
};

const putPublikasiBerita = async (beritaId: number, publikasi: boolean) => {
  const response = await axiosInstance.put(
    `/api/admin/berita/publikasi/${beritaId}`,
    { publikasi }
  );
  return response.data;
};

const putPrioritasBerita = async (beritaId: number, prioritas: boolean) => {
  const response = await axiosInstance.put(
    `/api/admin/berita/prioritas/${beritaId}`,
    { prioritas }
  );
  return response.data;
};

const deleteBerita = async (beritaId: number) => {
  const response = await axiosInstance.delete(`/api/admin/berita/${beritaId}`);
  return response.data;
};

const createBerita = async (
  judul: string,
  subjudul: string,
  isi: string,
  gambar: File
) => {
  const formData = new FormData();
  formData.append("judul", judul);
  formData.append("subjudul", subjudul);
  formData.append("isi", isi);
  formData.append("gambar", gambar);

  const response = await axiosInstance.post("/api/admin/berita", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

const editBerita = async (
  id: number,
  judul: string,
  subjudul: string,
  isi: string,
  gambar: File | null
) => {
  if (!gambar) {
    const response = await axiosInstance.put(`/api/admin/berita/${id}`, {
      judul,
      subjudul,
      isi,
    });
    return response.data;
  } else {
    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("subjudul", subjudul);
    formData.append("isi", isi);
    formData.append("gambar", gambar);
    const response = await axiosInstance.put(
      `/api/admin/berita/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }
};

export {
  getAllBerita,
  putPublikasiBerita,
  putPrioritasBerita,
  deleteBerita,
  createBerita,
  editBerita,
  getBeritaById,
};
