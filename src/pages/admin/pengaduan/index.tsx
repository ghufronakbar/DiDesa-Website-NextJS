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
import { ApiError } from "@/models/ApiError";
import { PengaduanMasyarakat } from "@/models/PengaduanMasyarakat";
import ErrorTable from "@/components/ErrorTable";
import ModalConfirmation from "@/components/ModalConfirmation";
import LoadingState from "@/components/LoadingState";
import {
  deletePengaduan,
  getAllPengaduan,
} from "@/services/admin/pengaduanMasyarakat";
import withAdminAuth from "@/utils/withAdminAuth";
import ModalContent from "@/components/ModalContent";
import Image from "next/image";

const PengaduanPage: React.FC = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 1;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isContentOpen, setIsContentOpen] = useState<boolean>(false);
  const [pengaduanMasyarakatId, setPengaduanMasyarakatId] = useState<number>(0);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const { showToast } = useToast();
  type Content = {
    nama: string;
    subjek: string;
    isi: string;
    gambar: string | null;
    tanggal: string;
  };
  const [content, setContent] = useState<Content>({
    nama: "",
    subjek: "",
    isi: "",
    gambar: null,
    tanggal: "",
  });
  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ["pengaduan-masyarakat", router.query.page],
    queryFn: () => getAllPengaduan(page),
    placeholderData: keepPreviousData,
  });

  const handleDelete = async (pengaduanMasyarakatId: number) => {
    setIsWaiting(true);
    try {
      const response = await deletePengaduan(pengaduanMasyarakatId);
      showToast(response?.message, "info");
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
            <h1 className="text-4xl font-semibold">Pengaduan Masyarakat</h1>
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
                  >
                    Nama
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Aduan
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
                  <LoadingTable colSpan={4} count={5} />
                ) : isError ? (
                  <ErrorTable colSpan={6} />
                ) : (
                  data &&
                  data?.data?.map(
                    (item: PengaduanMasyarakat, index: number): JSX.Element => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.warga?.namaLengkap}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-semibold">
                            {formatString(item.subjek, 30)}
                          </div>
                          <div className="text-gray-500 text-sm">
                            {formatString(item.isi, 30)}
                          </div>
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
                                nama: item.warga?.namaLengkap,
                                subjek: item.subjek,
                                isi: item.isi,
                                gambar: item.foto,
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
                              setPengaduanMasyarakatId(
                                item.pengaduanMasyarakatId
                              );
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
          {!isFetching ? (
            <ButtonPagination pagination={data?.pagination} />
          ) : null}
        </div>
      </div>
      {isModalOpen && (
        <ModalConfirmation
          title="Konfirmasi Hapus"
          message="Apakah Anda yakin ingin menghapus pengaduan ini?"
          onConfirm={() => {
            handleDelete(pengaduanMasyarakatId);
          }}
          onClose={() => {
            setIsModalOpen(false);
            setPengaduanMasyarakatId(0);
          }}
        />
      )}

      {isWaiting && <LoadingState />}

      {isContentOpen && (
        <ModalContent
          title="Detail Pengaduan"
          onClose={() => {
            setIsContentOpen(false);
            setContent({
              gambar: null,
              isi: "",
              nama: "",
              subjek: "",
              tanggal: "",
            });
          }}
          content={
            <div className="w-full flex flex-col gap-6">
              {content.gambar && (
                <div className="w-full flex justify-center">
                  <Image
                    src={content.gambar}
                    alt=""
                    width={300}
                    height={300}
                    className="w-10/12 rounded-lg h-auto"
                  />
                </div>
              )}
              <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between">
                  <p className="font-semibold">Pengirim:</p>
                  <p>{content.nama}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="font-semibold">{content.subjek}</p>
                  <p>{content.isi}</p>
                </div>
              </div>

              <p className="text-sm italic">{content.tanggal}</p>
            </div>
          }
        />
      )}
    </LayoutDashboard>
  );
};

export default withAdminAuth(PengaduanPage);
