import Footer from "@/components/Footer";
import LoadingPage from "@/components/LoadingPage";
import ModalContent from "@/components/ModalContent";
import NavbarUser from "@/components/NavbarUser";
import { useToast } from "@/components/Toast";
import { ApiError } from "@/models/ApiError";
import { PemilihanKetuaStatus } from "@/models/PemilihanKetua";
import { doVote, getLatestPemilihan } from "@/services/user/pemilihan";
import formatDate from "@/utils/format/formatDate";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

const PemilihanPage = () => {
  const { showToast } = useToast();
  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ["detailPemilihan"],
    queryFn: () => getLatestPemilihan(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  });

  const [showModal, setShowModal] = useState<boolean>(false);

  const [dataCalon, setDataCalon] = useState<ModalCalon>({
    calonKetuaId: 0,
    name: "",
    deskripsi: "",
    image: "",
    suara: 0,
  });

  const handleDetailCalon = (data: ModalCalon) => {
    setDataCalon(data);
    setShowModal(true);
  };

  const handleVote = async () => {
    showToast("Memilih calon...", "info");
    try {
      const response = await doVote(dataCalon.calonKetuaId);
      showToast(response?.message || "Berhasil melakukan pemilihan", "success");
      refetch();
    } catch (error) {
      console.log(error);
      const err = error as ApiError;
      showToast(
        err?.response?.data?.message || "Gagal melakukan pemilihan",
        "error"
      );
    } finally {
      setShowModal(false);
    }
  };

  if (isLoading || isFetching) {
    return <LoadingPage />;
  }

  return (
    <>
      <NavbarUser />
      {isError ? null : data && data.data ? (
        <section id="pemilihan" className="w-full pt-16 pb-40 bg-gray-100 mt-7">
          <div className="w-full h-full lg:px-32 md:px-20 px-8 gap-2">
            <div className="w-full h-full flex flex-col md:flex-row justify-between gap-4">
              <div className="w-full h-full flex flex-col gap-2">
                <div className="font-playfair text-black lg:text-6xl md:text-5xl text-4xl">
                  {data.data.judul}
                </div>
                <div className="md:w-1/4 w-1/2 h-[2px] bg-primary" />
                <div className="font-rubik text-gray-500 text-sm md:text-base flex flex-col lg:flex-row item-start lg:items-center gap-2">
                  <span
                    className={`${
                      data?.data.status === "Selesai"
                        ? "bg-tertiary"
                        : data?.data.status === "Belum Dimulai"
                        ? "bg-secondary"
                        : "bg-primary"
                    }  text-white text-2xs px-2 py-1 rounded-full inline-block font-rubik uppercase text-xs w-fit h-fit`}
                  >
                    {data?.data?.status}
                  </span>
                  Waktu Pemilihan: {formatDate(data?.data?.tanggalMulai)}
                  {" - "}
                  {formatDate(data?.data?.tanggalSelesai)}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-full mt-8 flex md:flex-row flex-col lg:px-32 md:px-20 px-8 gap-8">
            <div className="w-full h-full my-auto">
              <div className="w-full flex flex-col gap-4 justify-center items-center">
                <div className="horizontal-scroll">
                  <div
                    className={`scroll-container ${
                      data.data.calonKetua.length > 3 ? "" : "sm:justify-center"
                    }`}
                  >
                    {data?.data.calonKetua.map((item) => (
                      <CardCalon
                        key={item.calonKetuaId}
                        image={item.warga.foto}
                        deskripsi={item.deskripsi}
                        name={item.warga.namaLengkap}
                        suara={item._count.vote}
                        onClick={() => {
                          handleDetailCalon({
                            calonKetuaId: item.calonKetuaId,
                            image: item.warga.foto,
                            name: item.warga.namaLengkap,
                            deskripsi: item.deskripsi,
                            suara: item._count.vote,
                          });
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div
                  className="font-rubik text-black text-base"
                  dangerouslySetInnerHTML={{
                    __html: data?.data?.deskripsi.replace(/\n/g, "<br />"),
                  }}
                ></div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
      {showModal && (
        <ModalDetailCalon
          calonKetuaId={dataCalon.calonKetuaId}
          image={dataCalon.image}
          deskripsi={dataCalon.deskripsi}
          name={dataCalon.name}
          suara={dataCalon.suara}
          onClose={() => setShowModal(false)}
          isLoggedIn={data?.isLoggedIn || false}
          isVoteable={data?.data?.isVoteable || false}
          isVoted={data?.data?.isVoted || false}
          status={data?.data?.status || "Belum Dimulai"}
          onConfirm={handleVote}
        />
      )}
      <Footer />
    </>
  );
};

interface ModalCalon {
  calonKetuaId: number;
  image: string;
  name: string;
  deskripsi: string;
  suara: number;
}

interface PropsModalCalon extends ModalCalon {
  onClose: () => void;
  isLoggedIn: boolean;
  isVoted: boolean;
  isVoteable: boolean;
  status: PemilihanKetuaStatus;
  onConfirm: () => void;
}

const ModalDetailCalon = ({
  image,
  name,
  deskripsi,
  suara,
  onClose,
  isLoggedIn,
  isVoted,
  isVoteable,
  status,
  onConfirm,
}: PropsModalCalon) => {
  return (
    <ModalContent
      title={name}
      onClose={onClose || (() => {})}
      onConfirmText={
        status === "Selesai" ||
        status === "Belum Dimulai" ||
        isVoted ||
        !isLoggedIn
          ? undefined
          : "Pilih"
      }
      onConfirm={onConfirm}
      content={
        <>
          <div className="w-full h-full flex flex-col pt-4  gap-4">
            <div className="w-40 h-40 rounded-full self-center relative">
              <Image
                src={image}
                alt="image"
                width={400}
                height={800}
                className="w-full h-full rounded-full object-cover"
              />
              <div
                className={`absolute bottom-2 right-2 flex justify-center items-center rounded-full bg-primary text-white text-xs ${
                  suara.toString().length > 3 ? "w-10 h-10" : "w-8 h-8"
                }`}
              >
                {suara}
              </div>
            </div>

            <p
              className="w-full h-56 mt-4 font-rubik text-gray-500 text-sm overflow-y-scroll"
              dangerouslySetInnerHTML={{
                __html: deskripsi.replace(/\n/g, "<br />"),
              }}
            ></p>
            <div
              className={`${
                isVoteable ? "hidden" : "block"
              } font-rubik text-black text-base text-center`}
            >
              {status === "Selesai"
                ? "Waktu pemilihan sudah selesai"
                : status === "Belum Dimulai"
                ? "Waktu pemilihan berlangsung"
                : isVoted
                ? "Anda telah memilih"
                : !isLoggedIn
                ? "Silahkan login terlebih dahulu"
                : ""}
            </div>
          </div>
        </>
      }
    />
  );
};

interface PropsCalon {
  image: string;
  name: string;
  deskripsi: string;
  suara: number;
  onClick: () => void;
}

const CardCalon = ({ image, name, deskripsi, suara, onClick }: PropsCalon) => {
  return (
    <div className="relative w-40 h-64 md:w-48 md:h-72 lg:w-52 lg:h-80 xl:w-60 xl:h-[22rem] rounded-lg overflow-hidden shadow-lg flex-shrink-0 group">
      <div className="w-full h-full">
        <Image
          src={image}
          alt="image"
          width={400}
          height={800}
          className="w-full h-full object-cover group-hover:scale-110 duration-300"
        />
        <div className="absolute top-0 left-0 w-full h-full text-white bg-black opacity-0 bg-opacity-0 group-hover:bg-opacity-20 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center items-center font-semibold"></div>
      </div>
      <div className="bg-white absolute bottom-0 left-0 w-full h-fit flex flex-col px-4 py-2 gap-2">
        <div className="flex flex-col w-full">
          <h4 className="text-black font-bold line-clamp-1 text-sm md:text-base">
            {name}
          </h4>
          <span className="text-black font-semibold text-xs line-clamp-1 md:text-sm">
            {suara} Suara
          </span>
        </div>
        <button
          className="w-fit h-fit bg-primary text-white px-2 py-1 lg:px-4 lg:py-2 rounded-md hover:bg-secondary flex flex-row items-center gap-2 text-xs transition-all duration-300 self-end"
          onClick={onClick}
        >
          Detail
        </button>
      </div>
    </div>
  );
};

export default PemilihanPage;
