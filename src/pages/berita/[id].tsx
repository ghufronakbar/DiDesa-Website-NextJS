import CardBerita from "@/components/CardBerita";
import CardBeritaGrid from "@/components/CardBeritaGrid";
import ErrorCard from "@/components/ErrorCard";
import Footer from "@/components/Footer";
import LoadingPage from "@/components/LoadingPage";
import ModalConfirmation from "@/components/ModalConfirmation";
import NavbarUser from "@/components/NavbarUser";
import SkeletonCardBerita from "@/components/SkeletonCardBerita";
import SkeletonCardGrid from "@/components/SkeletonCardGrid";
import { useToast } from "@/components/Toast";
import { IMAGE_PLACEHOLDER } from "@/constant/imagePlaceholder";
import { ApiError } from "@/models/ApiError";
import { Berita } from "@/models/Berita";
import { Komentar } from "@/models/Komentar";
import { addKomentar, deleteKomentar } from "@/services/user/berita";
import { getBerita, getDetailBerita } from "@/services/user/berita";
import useDebounce from "@/utils/useDebounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";

const DetailBeritaPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ["a", id],
    queryFn: () => getDetailBerita(id),
    refetchOnWindowFocus: false,
    // staleTime: 1000 * 60 * 60,
    // placeholderData: keepPreviousData,
  });

  if (isLoading || isFetching) {
    return <LoadingPage />;
  }

  if (isError) {
    router.push("/berita");
  }

  return (
    <>
      <NavbarUser />
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
                <div className="w-full h-fit hidden md:flex md:flex-col gap-2">
                  <span className="font-rubik text-black text-lg font-semibold">
                    Komentar
                  </span>
                  <ListKomentar
                    komentar={data?.komentar || []}
                    refetch={refetch}
                  beritaId={Number(id)}
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
                  komentar={data?.komentar || []}
                  refetch={refetch}
                  beritaId={Number(id)}
                />
              </div>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
};

const ListKomentar = ({
  komentar,
  refetch,
  beritaId
}: {
  komentar: Komentar[];
  refetch: () => void;
  beritaId: number
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [isi, setIsi] = useState<string>("");
  const { showToast } = useToast();

  const handleDelete = async (komentarId: number) => {
    try {
      const response = await deleteKomentar(komentarId);
      showToast(response?.message || "Berhasil menghapus komentar", "info");
      refetch();
    } catch (error) {
      console.log(error);
      const apiError = error as ApiError;
      showToast(
        apiError.response?.data?.message || "Terdapat Kesalahan",
        "error"
      );
    } finally {
      setShowModal(false);
    }
  };

  const handleAddKomentar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await addKomentar(beritaId, isi);
      showToast(response?.message || "Berhasil menambahkan komentar", "info");
      setIsi("");
      refetch();
    } catch (error) {
      console.log(error);
      const apiError = error as ApiError;
      showToast(
        apiError.response?.data?.message || "Terdapat Kesalahan",
        "error"
      );      
    }
  }

  return (
    <>
      <div className="w-full h-[400px] flex flex-col gap-4 relative px-4 py-2">
        <div className="w-full h-full flex flex-col gap-4 overflow-y-scroll relative">
          {komentar?.length === 0 && (
            <div className="font-rubik text-gray-500">Belum Ada Komentar</div>
          )}
          {komentar?.map((item, index) => (
            <div
              className={`font-rubik text-black px-4 py-2 border border-gray-300 rounded-md flex flex-row items-center gap-4 relative ${komentar.length - 1 === index ? "mb-12" : ""}`}
              key={item.komentarId}
            >
              <Image
                src={item.warga.foto || IMAGE_PLACEHOLDER}
                alt="image"
                width={50}
                height={50}
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-4 flex flex-col">
                <span className="font-semibold">{item.warga.namaLengkap}</span>
                <span className="text-sm text-gray-500 w-[85%]">
                  {item.isi}
                </span>
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
        <form className="absolute bottom-0 w-full" onSubmit={handleAddKomentar}>
        <input
          className="w-[90%]  px-4 h-12 !rounded-lg focus:outline-none bg-white text-black font-rubik placeholder:text-gray-500 focus:border-primary border justify-self-end"
          placeholder="Tulis Komentar"      
          value={isi}
          onChange={(e) => setIsi(e.target.value)}                    
        />
        </form>
      </div>
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

export default DetailBeritaPage;
