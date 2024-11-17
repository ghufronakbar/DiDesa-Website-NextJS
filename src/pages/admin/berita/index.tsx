import React, { useState } from "react";
import LayoutDashboard from "@/components/LayoutDashboard";
import formatDate from "@/utils/format/formatDate";
import formatString from "@/utils/format/formatString";
import { BiCheckCircle, BiXCircle } from "react-icons/bi";
import LoadingTable from "@/components/LoadingTable";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  deleteBerita,
  getAllBerita,
  putPrioritasBerita,
  putPublikasiBerita,
} from "@/services/admin/berita";
import { useRouter } from "next/router";
import ButtonPagination from "@/components/ButtonPagination";
import { useToast } from "@/components/Toast";
import { ApiError } from "@/models/Response";
import { Berita } from "@/models/Berita";
import ErrorTable from "@/components/ErrorTable";
import ModalConfirmation from "@/components/ModalConfirmation";
import LoadingState from "@/components/LoadingState";
import withAdminAuth from "@/utils/withAdminAuth";

const BeritaPage: React.FC = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 1;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [beritaId, setBeritaId] = useState<number>(0);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const { showToast } = useToast();
  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ["berita", router.query.page],
    queryFn: () => getAllBerita(page),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  const handlePublikasi = async (beritaId: number, publikasi: boolean) => {
    setIsWaiting(true);
    try {
      const response = await putPublikasiBerita(beritaId, publikasi);
      setIsWaiting(false);
      showToast(response?.message, "success");
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

  const handlePrioritas = async (beritaId: number, prioritas: boolean) => {
    setIsWaiting(true);
    try {
      const response = await putPrioritasBerita(beritaId, prioritas);
      setIsWaiting(false);
      showToast(response?.message, "success");
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

  const handleDelete = async (beritaId: number) => {
    setIsWaiting(true);
    try {
      const response = await deleteBerita(beritaId);
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
            <h1 className="text-4xl font-semibold">Berita</h1>
            <button
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => router.push("/admin/berita/tambah")}
            >
              Tambah Berita
            </button>
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
                    Judul
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
                  >
                    Publikasi
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Prioritas
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
                    (item: Berita, index: number): JSX.Element => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-semibold">{item.judul}</div>
                          <div className="text-gray-500 text-sm">
                            {formatString(item.subjudul, 25)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {formatDate(item.tanggal)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.publikasi == true ? (
                            <BiCheckCircle
                              className="text-green-500 w-6 h-6 self-center m-auto cursor-pointer"
                              onClick={() =>
                                handlePublikasi(item.beritaId, false)
                              }
                            />
                          ) : (
                            <BiXCircle
                              className="text-red-500 w-6 h-6 self-center m-auto cursor-pointer"
                              onClick={() =>
                                handlePublikasi(item.beritaId, true)
                              }
                            />
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.prioritas == true ? (
                            <BiCheckCircle
                              className="text-green-500 w-6 h-6 self-center m-auto cursor-pointer"
                              onClick={() => {
                                handlePrioritas(item.beritaId, false);
                              }}
                            />
                          ) : (
                            <BiXCircle
                              className="text-red-500 w-6 h-6 self-center m-auto cursor-pointer"
                              onClick={() => {
                                handlePrioritas(item.beritaId, true);
                              }}
                            />
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                            onClick={() => {
                              router.push(`/admin/berita/${item.beritaId}`);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => {
                              setIsModalOpen(true);
                              setBeritaId(item.beritaId);
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
          message="Apakah Anda yakin ingin menghapus berita ini?"
          onConfirm={() => {
            handleDelete(beritaId);
          }}
          onClose={() => {
            setIsModalOpen(false);
            setBeritaId(0);
          }}
        />
      )}
      {isWaiting && <LoadingState />}
    </LayoutDashboard>
  );
};

export default withAdminAuth(BeritaPage);
