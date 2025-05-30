import React, { useState } from "react";
import LayoutDashboard from "@/components/LayoutDashboard";
import formatDate from "@/utils/format/formatDate";
import formatString from "@/utils/format/formatString";
import { BiCheck, BiCheckCircle, BiX, BiXCircle } from "react-icons/bi";
import LoadingTable from "@/components/LoadingTable";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import ButtonPagination from "@/components/ButtonPagination";
import { useToast } from "@/components/Toast";
import { ApiError } from "@/models/Response";
import { PengaduanMasyarakat } from "@/models/PengaduanMasyarakat";
import ErrorTable from "@/components/ErrorTable";
import ModalConfirmation from "@/components/ModalConfirmation";
import LoadingState from "@/components/LoadingState";
import {
  deletePengaduan,
  getAllPengaduan,
  setStatus,
} from "@/services/admin/pengaduanMasyarakat";
import withAdminAuth from "@/utils/withAdminAuth";
import ModalContent from "@/components/ModalContent";
import Image from "next/image";

interface SetStatus {
  id: number;
  status: boolean;
  open: boolean;
}

const initSetStatus: SetStatus = {
  id: 0,
  status: false,
  open: false,
};

const PengaduanPage: React.FC = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 1;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isContentOpen, setIsContentOpen] = useState<boolean>(false);
  const [pengaduanMasyarakatId, setPengaduanMasyarakatId] = useState<number>(0);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [formStatus, setFormStatus] = useState<SetStatus>(initSetStatus);
  const [jawaban, setJawaban] = useState<string>("");
  const { showToast } = useToast();
  type Content = {
    nama: string;
    subjek: string;
    isi: string;
    gambar: string | null;
    tanggal: string;
    jawaban: string;
  };
  const [content, setContent] = useState<Content>({
    nama: "",
    subjek: "",
    isi: "",
    gambar: null,
    tanggal: "",
    jawaban: "",
  });
  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ["pengaduan-masyarakat", router.query.page],
    queryFn: () => getAllPengaduan(page),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  const handleDelete = async (pengaduanMasyarakatId: number) => {
    setIsWaiting(true);
    try {
      const response = await deletePengaduan(pengaduanMasyarakatId);
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

  const handleOpenSetStatus = (id: number, status: boolean) => {
    setFormStatus({
      id,
      status,
      open: true,
    });
  };

  const handleSetStatus = async () => {
    try {
      const response = await setStatus(
        formStatus.id,
        formStatus.status,
        jawaban
      );
      showToast(response.message || "Berhasil mengubah status", "success");
      refetch();
    } catch (error) {
      console.log(error);
      const apiError = error as ApiError;
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
                    Status
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
                    (item: PengaduanMasyarakat, index: number) => (
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
                          <div className="flex items-center justify-center gap-2">
                            {item.pending ? (
                              <>
                                <button
                                  className="flex items-center justify-center px-2 py-1 bg-red-500 rounded-lg"
                                  onClick={() =>
                                    handleOpenSetStatus(
                                      item.pengaduanMasyarakatId,
                                      false
                                    )
                                  }
                                >
                                  <BiX className="text-white" />
                                </button>
                                <button
                                  className="flex items-center justify-center px-2 py-1 bg-green-500 rounded-lg"
                                  onClick={() =>
                                    handleOpenSetStatus(
                                      item.pengaduanMasyarakatId,
                                      true
                                    )
                                  }
                                >
                                  <BiCheck className="text-white" />
                                </button>
                              </>
                            ) : item.status ? (
                              <BiCheckCircle className="text-green-500 w-6 h-6" />
                            ) : (
                              <BiXCircle className="text-red-500 w-6 h-6" />
                            )}
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
                                gambar: item.foto,
                                isi: item.isi,
                                subjek: item.subjek,
                                tanggal: formatDate(item.tanggal),
                                nama: item.warga?.namaLengkap,
                                jawaban: item?.jawaban || "",
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
          {!isFetching && data && (
            <ButtonPagination pagination={data?.pagination} />
          )}
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

      {formStatus.open && (
        <ModalContent
          title={`Konfirmasi ${formStatus.status ? "Setujui" : "Tolak"} Aduan`}
          onConfirm={handleSetStatus}
          onClose={() => {
            setFormStatus(initSetStatus);
          }}
          content={
            <div className="w-full flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <p className="font-semibold">
                  {`Apakah Anda yakin ingin ${
                    formStatus.status ? "menyetujui" : "menolak"
                  } pengaduan ini?`}
                </p>
                <input
                  type="text"
                  placeholder="Masukkan jawaban"
                  className="w-full px-3 py-2 border rounded-md"
                  onChange={(e) => setJawaban(e.target.value)}
                />
              </div>
              <button
                className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-primary transition-all duration-300 mr-2"
                onClick={handleSetStatus}
                disabled={!!!jawaban}
              >
                Konfirmasi
              </button>
            </div>
          }
        />
      )}

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
              jawaban: "",
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
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Jawaban</p>
                  <p>{content.jawaban || "Belum ada jawaban"}</p>
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
