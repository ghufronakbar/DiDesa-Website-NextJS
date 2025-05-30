import React, { useState } from "react";
import LayoutDashboard from "@/components/LayoutDashboard";
import formatString from "@/utils/format/formatString";
import { BiCheckCircle, BiXCircle } from "react-icons/bi";
import LoadingTable from "@/components/LoadingTable";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import ButtonPagination from "@/components/ButtonPagination";
import { useToast } from "@/components/Toast";
import { ApiError } from "@/models/Response";
import { Umkm } from "@/models/Umkm";
import ErrorTable from "@/components/ErrorTable";
import ModalConfirmation from "@/components/ModalConfirmation";
import { deleteUmkm, getAllUmkm, putApproveUmkm } from "@/services/admin/umkm";
import LoadingState from "@/components/LoadingState";
import Image from "next/image";
import withAdminAuth from "@/utils/withAdminAuth";
import ModalContent from "@/components/ModalContent";
import { CiLocationOn } from "react-icons/ci";

const UMKMPage: React.FC = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 1;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isContentOpen, setIsContentOpen] = useState<boolean>(false);
  const [umkmId, setUmkmId] = useState<number>(0);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const { showToast } = useToast();
  type Content = {
    nama: string;
    deskripsi: string;
    gambar: string;
    lokasi: string;
    jenisUmkm: string;
    warga: {
      namaLengkap: string;
      telepon: string;
      foto: string;
    };
  };
  const [content, setContent] = useState<Content>({
    nama: "",
    deskripsi: "",
    gambar: "",
    lokasi: "",
    jenisUmkm: "",
    warga: {
      namaLengkap: "",
      telepon: "",
      foto: "",
    },
  });
  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ["umkm", router.query.page],
    queryFn: () => getAllUmkm(page),
    placeholderData: keepPreviousData,
  });

  const handleApprove = async (umkmId: number, approve: boolean) => {
    setIsWaiting(true);
    try {
      const response = await putApproveUmkm(umkmId, approve);
      showToast(response?.message, "success");
      refetch();
      setIsWaiting(false);
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

  const handleDelete = async (umkmId: number) => {
    setIsWaiting(true);
    try {
      const response = await deleteUmkm(umkmId);
      showToast(response?.message, "success");
      setIsModalOpen(false);
      refetch();
      setIsWaiting(false);
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
            <h1 className="text-4xl font-semibold">UMKM</h1>
            <button
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => router.push("/admin/jenis-umkm")}
            >
              Kelola Jenis UMKM
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
                  ></th>
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
                    Jenis
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Disetujui
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Aktif
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  ></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading || isFetching ? (
                  <LoadingTable colSpan={7} count={5} />
                ) : isError ? (
                  <ErrorTable colSpan={6} />
                ) : (
                  data &&
                  data?.data?.map(
                    (item: Umkm, index: number): JSX.Element => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Image
                            src={item.gambar}
                            alt={item.nama}
                            width={100}
                            height={100}
                            className="h-16 max-w-40 w-auto object-cover rounded-lg"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-semibold">{item.nama}</div>
                          <div className="text-gray-500 text-sm">
                            {formatString(item.lokasi, 25)}
                          </div>
                        </td>
                        <td className="px-6 py-4 flex justify-center">
                          <div className="w-fit h-fit bg-primary px-2 py-1 rounded-lg text-xs text-white self-center">
                            {item.jenisUmkm.namaJenisUmkm}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.approve == true ? (
                            <BiCheckCircle
                              className="text-green-500 w-6 h-6 self-center m-auto cursor-pointer"
                              onClick={() => {
                                handleApprove(item.umkmId, !item.approve);
                              }}
                            />
                          ) : (
                            <BiXCircle
                              className="text-red-500 w-6 h-6 self-center m-auto cursor-pointer"
                              onClick={() => {
                                handleApprove(item.umkmId, !item.approve);
                              }}
                            />
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.status == true ? (
                            <BiCheckCircle className="text-green-500 w-6 h-6 self-center m-auto cursor-pointer" />
                          ) : (
                            <BiXCircle className="text-red-500 w-6 h-6 self-center m-auto cursor-pointer" />
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                            onClick={() => {
                              setIsContentOpen(true);
                              setContent({
                                warga: item.warga,
                                nama: item.nama,
                                lokasi: item.lokasi,
                                jenisUmkm: item.jenisUmkm.namaJenisUmkm,
                                gambar: item.gambar,
                                deskripsi: item.deskripsi,
                              });
                            }}
                          >
                            Detail
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => {
                              setIsModalOpen(true);
                              setUmkmId(item.umkmId);
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
          message="Apakah Anda yakin ingin menghapus UMKM ini?"
          onConfirm={() => {
            handleDelete(umkmId);
          }}
          onClose={() => {
            setIsModalOpen(false);
            setUmkmId(0);
          }}
        />
      )}
      {isContentOpen && (
        <ModalContent
          title="Detail UMKM"
          onClose={() => {
            setIsContentOpen(false);
            setContent({
              nama: "",
              deskripsi: "",
              jenisUmkm: "",
              gambar: "",
              lokasi: "",
              warga: { namaLengkap: "", telepon: "", foto: "" },
            });
          }}
          content={
            <div className="w-full flex flex-col gap-6">
              <div className="w-full flex justify-center">
                <Image
                  src={content.gambar}
                  alt=""
                  width={300}
                  height={300}
                  className="w-full rounded-lg h-40 object-cover"
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <p className="font-semibold">{content.nama}</p>
                  <p>{content.deskripsi}</p>
                  <div className="flex flex-row items-center gap-1">
                    <CiLocationOn />
                    <p className="text-xs">{content.lokasi}</p>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-4">
                  <Image
                    src={content.warga.foto}
                    alt={content.warga.namaLengkap}
                    width={50}
                    height={50}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold">{content.warga.namaLengkap}</p>
                    <p className="text-sm text-gray-500">
                      {content.warga.telepon}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      )}
      {isWaiting && <LoadingState />}
    </LayoutDashboard>
  );
};

export default withAdminAuth(UMKMPage);
