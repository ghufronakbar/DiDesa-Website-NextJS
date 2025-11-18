import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import LoadingPage from "@/components/LoadingPage";
import ModalConfirmation from "@/components/ModalConfirmation";
import NavbarUser from "@/components/NavbarUser";
import { useToast } from "@/components/Toast";
import {
  IMAGE_PLACEHOLDER,
  PROFILE_PLACEHOLDER,
} from "@/constant/imagePlaceholder";
import { ApiError } from "@/models/Response";
import {
  addKomentar,
  deleteKomentar,
  getDetailBerita,
} from "@/services/user/berita";
import formatDate from "@/utils/format/formatDate";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { MdOutlineDelete } from "react-icons/md";
import { MetaData } from "../_app";
import { getProfile } from "@/services/user/profile";
import { Warga } from "@/models/Warga";

interface DataKomentar {
  komentarId: number;
  isi: string;
  beritaId: number;
  isDeleteable: boolean;
  warga: {
    wargaId: number;
    namaLengkap: string;
    foto: string;
  };
}

const DetailBeritaPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { showToast } = useToast();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [isi, setIsi] = useState<string>("");
  const [dataKomentar, setDataKomentar] = useState<DataKomentar[]>([]);
  const [profile, setProfile] = useState<Warga | null>(null);

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ["beritadetail", id],
    queryFn: () => getDetailBerita(id),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data && data.komentar) {
      setDataKomentar(data.komentar);
    }
  }, [data]);

  const refreshKomentar = async () => {
    const response = await getDetailBerita(id);
    setDataKomentar(response?.komentar || []);
  };

  const handleDelete = async (komentarId: number) => {
    setShowModal(false);
    showToast("Menghapus komentar...", "info");
    const indexToDelete = dataKomentar.findIndex(
      (komentar) => komentar.komentarId === komentarId
    );
    dataKomentar.splice(indexToDelete, 1);
    try {
      const response = await deleteKomentar(komentarId);
      showToast(response?.message || "Berhasil menghapus komentar", "success");
    } catch (error) {
      console.log(error);
      const apiError = error as ApiError;
      showToast(
        apiError.response?.data?.message || "Terdapat Kesalahan",
        "error"
      );
    }
  };

  const fetchProfileFirst = async (): Promise<Warga | null> => {
    try {
      if (profile) return profile;
      const getDataProfile = await getProfile();
      setProfile(getDataProfile?.data || null);
      return getDataProfile?.data || null;
    } catch (error) {
      return null;
    }
  };

  const handleAddKomentar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isi === "") return showToast("Komentar harus diisi", "error");
    showToast("Mengirim komentar...", "info");
    const profile = await fetchProfileFirst();
    const random = Math.floor(Math.random() * 1000);
    dataKomentar.unshift({
      beritaId: Number(id),
      isDeleteable: profile ? true : false,
      isi: isi,
      komentarId: random,
      warga: {
        namaLengkap: profile ? "Saya" : "Guest",
        foto: profile?.foto || PROFILE_PLACEHOLDER,
        wargaId: profile?.wargaId || 0,
      },
    });
    setIsi("");
    try {
      const response = await addKomentar(Number(id), isi);
      await refreshKomentar();
      showToast(
        response?.message || "Berhasil menambahkan komentar",
        "success"
      );
    } catch (error) {
      console.log(error);
      const apiError = error as ApiError;
      const indexToDelete = dataKomentar.findIndex(
        (komentar) => komentar.komentarId === random
      );
      dataKomentar.splice(indexToDelete, 1);
      await refreshKomentar();
      showToast(
        apiError.response?.data?.message || "Terdapat Kesalahan",
        "error"
      );
    }
  };

  if (isLoading || isFetching) {
    return <LoadingPage />;
  }

  if (isError) {
    router.push("/berita");
  }

  return (
    <>
      <NavbarUser />
      <MetaData
        title={data?.judul || "DiDesa"}
        description={data?.subjudul || "Digitalisasi Desa"}
      />
      {data && (
        <section id="berita" className="w-full min-h-screen bg-gray-100">
          <div className="w-full h-full py-20 lg:px-32 md:px-20 px-8 gap-2">
            <div className="w-full h-full flex flex-col md:flex-row justify-between gap-4 items-center">
              <div className="w-full h-full flex flex-col gap-2">
                <div className="font-playfair text-black lg:text-6xl md:text-5xl text-4xl">
                  {data?.judul}
                </div>
                <div className="md:w-1/4 w-1/2 h-[2px] bg-primary" />
                <div className="font-rubik text-gray-500 text-sm md:text-base ">
                  {data?.subjudul}
                </div>
              </div>
            </div>
            <div className="w-full flex mt-4 flex-col md:flex-row gap-4">
              <div className="w-full lg:w-1/2 xl:w-1/3 flex flex-col gap-4">
                <Image
                  src={data?.gambar || IMAGE_PLACEHOLDER}
                  alt="image"
                  width={800}
                  height={400}
                  className="w-full h-auto object-cover rounded-md"
                />
                <span className="font-rubik text-gray-500 text-sm font-base -mt-2">
                  {formatDate(data?.tanggal)}
                </span>
                <div className="w-full h-fit hidden md:flex md:flex-col gap-2">
                  <span className="font-rubik text-black text-lg font-semibold">
                    Komentar
                  </span>
                  <ListKomentar
                    komentar={dataKomentar || []}
                    onDelete={handleDelete}
                    onAddKomentar={handleAddKomentar}
                    isi={isi}
                    setIsi={setIsi}
                    setSelectedId={setSelectedId}
                    setShowModal={setShowModal}
                  />
                </div>
              </div>
              <p
                className="w-full lg:w-1/2 xl:w-2/3 font-rubik text-gray-500 text-sm"
                dangerouslySetInnerHTML={{
                  __html: data?.isi.replace(/\n/g, "<br />"),
                }}
              ></p>
              <div className="w-full h-fit flex md:hidden flex-col gap-2">
                <span className="font-rubik text-black text-lg font-semibold">
                  Komentar
                </span>
                <ListKomentar
                  komentar={dataKomentar || []}
                  onDelete={handleDelete}
                  onAddKomentar={handleAddKomentar}
                  isi={isi}
                  setIsi={setIsi}
                  setSelectedId={setSelectedId}
                  setShowModal={setShowModal}
                />
              </div>
            </div>
          </div>
        </section>
      )}
      <Footer />
      {showModal && (
        <ModalConfirmation
          title="Hapus Komentar"
          message="Apakah anda yakin ingin menghapus komentar ini?"
          onClose={() => setShowModal(false)}
          onConfirm={() => handleDelete(selectedId)}
        />
      )}
    </>
  );
};

const ListKomentar = ({
  komentar,
  onDelete,
  onAddKomentar,
  isi,
  setIsi,
  setSelectedId,
  setShowModal,
}: {
  komentar: DataKomentar[];
  onDelete: (komentarId: number) => void;
  onAddKomentar: (e: React.FormEvent) => void;
  isi: string;
  setIsi: React.Dispatch<React.SetStateAction<string>>;
  setSelectedId: React.Dispatch<React.SetStateAction<number>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="w-full h-[400px] flex flex-col gap-4 relative px-4 py-2">
      <div className="w-full h-[300px] flex flex-col gap-4 overflow-y-scroll relative px-2 py-4 rounded-md">
        {komentar?.length === 0 && (
          <div className="font-rubik text-gray-500">Belum Ada Komentar</div>
        )}
        {komentar?.map((item, index) => (
          <div
            className={`font-rubik text-black px-4 py-2 border border-gray-300 rounded-md flex flex-row items-center gap-4 relative ${
              komentar.length - 1 === index ? "mb-12" : ""
            }`}
            key={item.komentarId}
          >
            <Image
              src={item?.warga?.foto || IMAGE_PLACEHOLDER}
              alt="image"
              width={50}
              height={50}
              className="w-12 h-12 rounded-full"
            />
            <div className="ml-4 flex flex-col">
              <span className="font-semibold">{item.warga?.namaLengkap}</span>
              <span className="text-sm text-gray-500 w-[85%]">{item.isi}</span>
            </div>
            {item.isDeleteable && (
              <MdOutlineDelete
                className="ml-auto cursor-pointer absolute right-4"
                onClick={() => {
                  setSelectedId(item.komentarId);
                  setShowModal(true);
                }}
              />
            )}
          </div>
        ))}
      </div>
      <form className="absolute bottom-0 w-full" onSubmit={onAddKomentar}>
        <input
          className="w-[90%]  px-4 h-12 !rounded-lg focus:outline-none bg-white text-black font-rubik placeholder:text-gray-500 focus:border-primary border justify-self-end"
          placeholder="Tulis Komentar"
          value={isi}
          onChange={(e) => setIsi(e.target.value)}
        />
      </form>
    </div>
  );
};

export default DetailBeritaPage;
