import axiosInstance from "@/utils/axiosInstance";

const getAllPengurusDesa = async (page: number) => {
    const response = await axiosInstance.get("/api/admin/pengurus-desa", {
        params: { page },
    });
    return response.data;
};

const getPengurusDesaById = async (id: number) => {
    const response = await axiosInstance.get(`/api/admin/pengurus-desa/${id}`);
    return response.data;
};

const deletePengurusDesa = async (id: number) => {
    const response = await axiosInstance.delete(`/api/admin/pengurus-desa/${id}`);
    return response.data;
};

const setAccessPengurusDesa = async (id: number, aksesAdmin: boolean) => {
    const response = await axiosInstance.put(
        `/api/admin/pengurus-desa/akses-admin/${id}`,
        { aksesAdmin }
    );
    return response.data;
};

const setJabatanPengurusDesa = async (id: number, jabatan: string) => {
    const response = await axiosInstance.put(
        `/api/admin/pengurus-desa/${id}`,
        { jabatan }
    );
    return response.data;
};

export {
    getAllPengurusDesa,
    getPengurusDesaById,
    deletePengurusDesa,
    setAccessPengurusDesa,
    setJabatanPengurusDesa,
}