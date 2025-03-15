import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import LoadingPage from "@/components/LoadingPage";
import NavbarUser from "@/components/NavbarUser";
import { IMAGE_PLACEHOLDER } from "@/constant/imagePlaceholder";
import {
  editImageUmkm,
  editUmkmWithoutImage,
  getDetailUmkm,
  setStatusUmkm,
} from "@/services/user/umkm";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  MdOutlineLocationOn,
  MdOutlinePublic,
  MdOutlinePublicOff,
} from "react-icons/md";
import { MetaData } from "../_app";
import { BiSolidEdit } from "react-icons/bi";
import { useToast } from "@/components/Toast";
import { ApiError } from "@/models/Response";
import ModalContent from "@/components/ModalContent";
import ModalConfirmation from "@/components/ModalConfirmation";
import { Umkm } from "@/models/Umkm";
import { deleteUmkm } from "@/services/user/umkm";

const DetailUMKMPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { showToast } = useToast();
  const [formUmkm, setFormUmkm] = useState<Umkm | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [imageSelected, setImageSelected] = useState<File | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ["umkm", id],
    queryFn: () => getDetailUmkm(Number(id)),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setFormUmkm(data);
    }
  }, [data]);

  const handleSetStatus = async (status: boolean) => {
    try {
      const response = await setStatusUmkm(Number(id), status);
      showToast(response.message || "Berhasil mengubah status", "success");
      refetch();
    } catch (error) {
      console.log(error);
      const apiError = error as ApiError;
      showToast(
        apiError.response?.data?.message || "Terjadi kesalahan",
        "error"
      );
    }
  };

  const handleEdit = async () => {
    try {
      if (!formUmkm) return;
      showToast("Mengubah UMKM...", "info");
      if (
        formUmkm.nama === "" ||
        formUmkm.deskripsi === "" ||
        formUmkm.lokasi === ""
      ) {
        showToast("Semua kolom harus diisi", "error");
        return;
      }
      const response = await editUmkmWithoutImage(
        Number(id),
        formUmkm?.nama,
        formUmkm?.deskripsi,
        formUmkm?.lokasi
      );
      refetch();
      setShowModal(false);
      showToast(response.message || "Berhasil mengubah UMKM", "success");
    } catch (error) {
      const err = error as ApiError;
      showToast(err?.response?.data?.message || "Gagal mengubah UMKM", "error");
    }
  };

  const handlePickImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement)?.files?.[0];
      if (file) {
        setImageSelected(file);
      }
    };
    input.click();
  };

  const handleEditImage = async () => {
    if (!imageSelected) return;
    try {
      const response = await editImageUmkm(Number(id), imageSelected);
      refetch();
      showToast(response.message || "Berhasil mengubah UMKM", "success");
    } catch (error) {
      console.log(error);
      const apiError = error as ApiError;
      showToast(
        apiError.response?.data?.message || "Terjadi kesalahan",
        "error"
      );
    } finally {
      setImageSelected(null);
    }
  };

  const handleDelete = async () => {
    showToast("Menghapus UMKM...", "info");
    try {
      const response = await deleteUmkm(Number(id));
      showToast(response?.message || "Berhasil menghapus UMKM", "success");
      router.push("/profile");
    } catch (error) {
      console.log(error);
      const apiError = error as ApiError;
      showToast(
        apiError.response?.data?.message || "Terjadi kesalahan",
        "error"
      );
    }
  };

  if (isLoading || isFetching) {
    return <LoadingPage />;
  }

  if (isError) {
    router.push("/umkm");
  }

  return (
    <>
      <NavbarUser />
      <MetaData
        title={data?.nama || "DiDesa"}
        description={data?.deskripsi || "Digitalisasi Desa"}
      />
      {imageSelected && (
        <ModalConfirmation
          title="Ganti Gambar UMKM"
          message="Apakah anda yakin ingin mengubah gambar UMKM?"
          onClose={() => {
            setImageSelected(null);
          }}
          onConfirm={() => {
            handleEditImage();
          }}
        />
      )}
      {isConfirmationOpen && (
        <ModalConfirmation
          title="Hapus UMKM"
          message="Apakah anda yakin ingin menghapus UMKM?"
          onClose={() => setIsConfirmationOpen(false)}
          onConfirm={() => handleDelete()}
        />
      )}
      {showModal && data && formUmkm && (
        <ModalContent
          title="Edit UMKM"
          onClose={() => setShowModal(false)}
          onConfirm={() => handleEdit()}
          onConfirmText="Simpan"
          content={
            <div className="mt-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-rubik text-black">Nama</label>
                  <input
                    type="text"
                    value={formUmkm?.nama}
                    onChange={(e) =>
                      setFormUmkm({ ...formUmkm, nama: e.target.value })
                    }
                    className="border border-gray-300 rounded-lg p-2 w-full"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-rubik text-black">Deskripsi</label>
                  <textarea
                    value={formUmkm?.deskripsi}
                    onChange={(e) =>
                      setFormUmkm({ ...formUmkm, deskripsi: e.target.value })
                    }
                    rows={5}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-rubik text-black">Lokasi</label>
                  <input
                    type="text"
                    value={formUmkm?.lokasi}
                    onChange={(e) =>
                      setFormUmkm({ ...formUmkm, lokasi: e.target.value })
                    }
                    className="border border-gray-300 rounded-lg p-2 w-full"
                  />
                </div>
              </div>
              <button
                className="w-fit h-fit bg-secondary rounded-md mt-4 py-1 px-2 text-white hover:bg-primary transition-all duration-300"
                onClick={() => {
                  setShowModal(false);
                  setIsConfirmationOpen(true);
                }}
              >
                Hapus UMKM
              </button>
            </div>
          }
        />
      )}
      {data && (
        <section id="umkm" className="w-full min-h-screen bg-gray-100">
          <div className="w-full h-full py-20 lg:px-32 md:px-20 px-8 gap-2">
            <div className="w-full h-full flex flex-col md:flex-row justify-between gap-4 items-center">
              <div className="w-full h-full flex flex-col gap-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="font-playfair text-black lg:text-6xl md:text-5xl text-4xl">
                    {data?.nama}
                  </div>
                  {data?.isEditable && (
                    <div className="flex flex-row gap-4 md:self-end items-center">
                      {data?.status === false ? (
                        <div className="bg-secondary rounded-lg flex justify-center items-center px-2 py-1">
                          <span className="font-rubik text-white">
                            UMKM Belum Disetujui
                          </span>
                        </div>
                      ) : null}
                      {data?.status === true ? (
                        <MdOutlinePublic
                          className="text-primary w-6 h-6 cursor-pointer"
                          onClick={() => handleSetStatus(false)}
                        />
                      ) : (
                        <MdOutlinePublicOff
                          className="text-secondary w-6 h-6 cursor-pointer"
                          onClick={() => {
                            data?.approve === false
                              ? showToast("UMKM Belum Disetujui", "error")
                              : handleSetStatus(true);
                          }}
                        />
                      )}
                      <BiSolidEdit
                        className="text-tertiary w-6 h-6 cursor-pointer"
                        onClick={() => setShowModal(true)}
                      />
                    </div>
                  )}
                </div>
                <div className="md:w-1/4 w-1/2 h-[2px] bg-primary" />
              </div>
            </div>
            <div className="w-full flex mt-4 flex-col md:flex-row gap-4">
              <div className="w-full lg:w-1/2 xl:w-1/3 flex flex-col gap-4">
                <div
                  className="w-full overflow-hidden rounded-md h-auto relative group"
                  onClick={() => {
                    data?.isEditable ? handlePickImage() : null;
                  }}
                >
                  <Image
                    src={
                      imageSelected
                        ? URL.createObjectURL(imageSelected)
                        : data?.gambar
                        ? data?.gambar
                        : IMAGE_PLACEHOLDER
                    }
                    alt="image"
                    width={800}
                    height={400}
                    className={`w-full h-auto object-cover rounded-md ${
                      data?.isEditable &&
                      "group-hover:scale-110 duration-300 cursor-pointer"
                    }`}
                  />
                  {data?.isEditable && (
                    <div className="absolute top-0 left-0 w-full h-full text-white bg-black opacity-0 bg-opacity-0 group-hover:bg-opacity-50 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center items-center font-semibold cursor-pointer">
                      Edit Gambar
                    </div>
                  )}
                </div>
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <Link
                      href={data?.urlMap || "#"}
                      target="_blank"
                      prefetch={false}
                    >
                      <MdOutlineLocationOn className="text-primary" />
                    </Link>
                    <span className="font-rubik text-gray-500 text-sm font-base">
                      {data?.lokasi}
                    </span>
                  </div>
                  <span className="bg-primary text-white text-2xs px-2 py-1 rounded-full inline-block font-rubik uppercase text-xs">
                    {data?.jenisUmkm?.namaJenisUmkm}
                  </span>
                </div>
              </div>
              <p
                className="w-full lg:w-1/2 xl:w-2/3 font-rubik text-gray-500 text-sm"
                dangerouslySetInnerHTML={{
                  __html: data?.deskripsi.replace(/\n/g, "<br />"),
                }}
              ></p>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
};

export default DetailUMKMPage;
