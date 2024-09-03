import Footer from "@/components/Footer";
import LoadingPage from "@/components/LoadingPage";
import NavbarUser from "@/components/NavbarUser";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { MdDeleteOutline } from "react-icons/md";
import { MetaData } from "../_app";
import { useToast } from "@/components/Toast";
import { ApiError } from "@/models/ApiError";
import { deletePengaduan, getDetailPengaduan } from "@/services/user/pengaduan";
import formatDate from "@/utils/format/formatDate";
import ModalConfirmation from "@/components/ModalConfirmation";
import { useState } from "react";

const DetailPengaduanPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const [showModal, setShowModal] = useState<boolean>(false);
  const { showToast } = useToast();

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ["pengaduandetail", id],
    queryFn: () => getDetailPengaduan(Number(id)),
    refetchOnWindowFocus: false,
  });

  if (isLoading || isFetching) {
    return <LoadingPage />;
  }

  if (isError) {
    router.push("/");
  }

  const handleDelete = async () => {
    try {
      const response = await deletePengaduan(Number(id));
      showToast(response?.message || "Berhasil menghapus pengaduan", "info");
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

  return (
    <>
      <NavbarUser />
      <MetaData
        title={data?.subjek || "DiDesa"}
        description={data?.isi || "Digitalisasi Desa"}
      />
      {showModal && (
        <ModalConfirmation
          title="Hapus Pengaduan"
          message="Apakah anda yakin ingin menghapus pengaduan ini?"
          onConfirm={() => {
            handleDelete();
          }}
          onClose={() => setShowModal(false)}
        />
      )}
      {data && (
        <section id="umkm" className="w-full min-h-screen bg-gray-100">
          <div className="w-full h-full py-20 lg:px-32 md:px-20 px-8 gap-2">
            <div className="w-full h-full flex flex-col md:flex-row justify-between gap-4 items-center">
              <div className="w-full h-full flex flex-col gap-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="font-playfair text-black lg:text-6xl md:text-5xl text-4xl">
                    {data?.subjek}
                  </div>
                  <div className="flex flex-row gap-4 self-end">
                    <MdDeleteOutline
                      className="text-tertiary w-6 h-6 cursor-pointer"
                      onClick={() => setShowModal(true)}
                    />
                  </div>
                </div>
                <div className="md:w-1/4 w-1/2 h-[2px] bg-primary" />
              </div>
            </div>
            <div className="w-full flex mt-4 flex-col md:flex-row gap-4">
              {data?.foto && (
                <div className="w-full lg:w-1/2 xl:w-1/3 flex flex-col gap-4">
                  <Image
                    src={data?.foto}
                    alt="image"
                    width={800}
                    height={400}
                    className="w-full h-auto object-cover rounded-md"
                  />
                  <span className="text-gray-500 text-sm -mt-2">
                    Dibuat pada {formatDate(data?.tanggal)}
                  </span>
                </div>
              )}
              <div className="w-full lg:w-1/2 xl:w-2/3 flex flex-col gap-4">
                {!data?.foto && (
                  <span className="text-gray-500 text-sm">
                    Dibuat pada {formatDate(data?.tanggal)}
                  </span>
                )}
                <p
                  className="w-full lg:w-1/2 xl:w-2/3 font-rubik text-gray-500 text-sm"
                  dangerouslySetInnerHTML={{
                    __html: data?.isi.replace(/\n/g, "<br />"),
                  }}
                ></p>
              </div>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
};

export default DetailPengaduanPage;
