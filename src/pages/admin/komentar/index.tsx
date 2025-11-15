import React, { useState } from "react";
import LayoutDashboard from "@/components/LayoutDashboard";
import formatDate from "@/utils/format/formatDate";
import formatString from "@/utils/format/formatString";
import { BiCheckCircle, BiXCircle } from "react-icons/bi";
import LoadingTable from "@/components/LoadingTable";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import ButtonPagination from "@/components/ButtonPagination";
import { useToast } from "@/components/Toast";
import { ApiError } from "@/models/Response";
import { Komentar } from "@/models/Komentar";
import ErrorTable from "@/components/ErrorTable";
import ModalConfirmation from "@/components/ModalConfirmation";
import LoadingState from "@/components/LoadingState";
import withAdminAuth from "@/utils/withAdminAuth";
import { deleteKomentar, getAllKomentar } from "@/services/admin/komentar";
import Image from "next/image";
import ModalContent from "@/components/ModalContent";
import { IMAGE_PLACEHOLDER } from "@/constant/imagePlaceholder";

const KomentarPage: React.FC = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 1;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isContentOpen, setIsContentOpen] = useState<boolean>(false);
  const [komentarId, setKomentarId] = useState<number>(0);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [content, setContent] = useState({
    judul: "",
    isi: "",
    nama: "",
    gambar: "",
    tanggal: "",
  });
  const { showToast } = useToast();
  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ["komentar", router.query.page],
    queryFn: () => getAllKomentar(page),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  const handleDelete = async (komentarId: number) => {
    setIsWaiting(true);
    try {
      const response = await deleteKomentar(komentarId);
      showToast(response?.message, "success");
      setIsWaiting(false);
      setIsModalOpen(false);
      refetch();
    } catch (error) {
      console.log(error);
      const apiError = error as ApiError;
      setIsWaiting(false);
      showToast(
        apiError.response?.data?.message || "An error occurred",
        "error"
      );
    }
  };

  return (
    <LayoutDashboard>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex justify-between">
            <h1 className="text-4xl font-semibold">Komentar</h1>
          </div>
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  ></th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nama/Berita
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Komentar
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tanggal
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  ></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading || isFetching ? (
                  <LoadingTable colSpan={6} count={5} />
                ) : isError ? (
                  <ErrorTable colSpan={6} />
                ) : (
                  data &&
                  data?.data?.map(
                    (item: Komentar, index: number): JSX.Element => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Image
                            src={item.warga?.foto}
                            width={100}
                            height={100}
                            alt="warga"
                            className="w-12 h-12 rounded-lg"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-semibold">
                            {item.warga.namaLengkap}
                          </div>
                          <div className="text-gray-500 text-sm">
                            {formatString(item.berita.judul, 25)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {formatString(item.isi, 50)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {formatDate(item.tanggal)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                            onClick={() => {
                              setIsContentOpen(true);
                              setContent({
                                ...content,
                                judul: item.berita.judul,
                                isi: item.isi,
                                nama: item.warga.namaLengkap,
                                gambar: item.berita.gambar || IMAGE_PLACEHOLDER,
                                tanggal: formatDate(item.tanggal),
                              });
                            }}
                          >
                            Detail
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => {
                              setIsModalOpen(true);
                              setKomentarId(item.komentarId);
                            }}
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
          {!isFetching && data && (
            <ButtonPagination pagination={data?.pagination} />
          )}
        </div>
      </div>
      {isModalOpen && (
        <ModalConfirmation
          title="Konfirmasi Hapus"
          message="Apakah Anda yakin ingin menghapus komentar ini?"
          onConfirm={() => {
            handleDelete(komentarId);
          }}
          onClose={() => {
            setIsModalOpen(false);
            setKomentarId(0);
          }}
        />
      )}
      {isContentOpen && (
        <ModalContent
          title="Detail Komentar"
          onClose={() => {
            setIsContentOpen(false);
            setContent({
              nama: "",
              judul: "",
              isi: "",
              gambar: "",
              tanggal: "",
            });
          }}
          content={
            <div className="flex flex-col gap-1">
              <Image
                src={content.gambar}
                width={300}
                height={300}
                alt="warga"
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="font-semibold text-lg mt-4">{content.judul}</div>
              <div className="flex justify-between">
                <div className="font-semibold text-sm">Nama :</div>
                <div className="text-gray-500 text-sm">{content.nama}</div>
              </div>
              <div className="font-semibold text-sm">Komentar :</div>
              <div className="text-gray-500 text-sm">{content.isi}</div>
              <div className="text-black italic text-xs mt-4">
                {content.tanggal}
              </div>
            </div>
          }
        />
      )}
      {isWaiting && <LoadingState />}
    </LayoutDashboard>
  );
};

export default withAdminAuth(KomentarPage);
