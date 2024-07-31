import React, { useEffect, useRef, useState } from "react";
import LayoutDashboard from "@/components/LayoutDashboard";
import { useToast } from "@/components/Toast";
import LoadingState from "@/components/LoadingState";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "@/components/LoadingPage";
import ModalError from "@/components/ModalError";
import withAdminAuth from "@/utils/withAdminAuth";
import { getPemilihanById, editPemilihan } from "@/services/admin/pemilihanKetua";
import Image from "next/image";
import { FaUserEdit } from "react-icons/fa";
import { ApiError } from "@/models/ApiError";
import formatConvertIsoToNormal from "@/utils/format/formatConvertIsoToNormal";
import { CalonKetua } from "@/models/CalonKetua";
import formatConvertToIsoString from "@/utils/format/formatConvertToIsoString";
import ModalContent from "@/components/ModalContent";
import { getAllDataWarga } from "@/services/admin/warga";
import { Warga } from "@/models/Warga";
import { createCalon, deleteCalon, editCalon } from "@/services/admin/calonKetua";
import { MdDelete } from "react-icons/md";
import ModalConfirmation from "@/components/ModalConfirmation";

const EditPemilihanPage: React.FC = () => {
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const { showToast } = useToast();
    const router = useRouter();
    const { id } = router.query;
    const [isOnEdit, setIsOnEdit] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isContentOpen, setIsContentOpen] = useState<boolean>(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
    const [calonKetua, setCalonKetua] = useState({
        calonKetuaId: 0,
        namaCalonKetua: '',
    });

    type PemilihanProps = {
        judul: string;
        deskripsi: string;
        tanggalMulai: string;
        tanggalSelesai: string;
    }

    type CalonProps = {        
        calonKetuaId: number;
        wargaId: number;
        deskripsi: string;
        namaWarga: string;
    }

    const [pemilihan, setPemilihan] = useState<PemilihanProps>({
        judul: '',
        deskripsi: '',
        tanggalMulai: '',
        tanggalSelesai: '',
    });

    const [calon, setCalon] = useState<CalonProps>({
        calonKetuaId: 0,
        wargaId: 0,
        deskripsi: '',
        namaWarga: '',
    });

    const { data, isLoading, isFetching, isError, refetch } = useQuery({
        queryKey: ['pemilihan', id],
        queryFn: () => router.isReady && id && typeof id === 'string' ? getPemilihanById(Number(id)) : null,
    });

    const { data: dataWarga, isLoading: isLoadingWarga, isFetching: isFetchingWarga, isError: isErrorWarga } = useQuery({
        queryKey: ['warga/all'],
        queryFn: () => getAllDataWarga(),
    });

    const handleCalon = async () => {
        setIsWaiting(true);
        if (!calon.wargaId || !calon.deskripsi) {
            showToast('Harap lengkapi data', 'error');
            setIsWaiting(false);
            return;
        }
        try {
            if(calon.calonKetuaId === 0){
                const response = await createCalon(calon.wargaId, Number(id), calon.deskripsi);                
                showToast(response.message, "info");
                setIsWaiting(false);
                setIsContentOpen(false);
                setCalon({ wargaId: 0, deskripsi: "", calonKetuaId: 0,namaWarga: "" })
                refetch();
            }else{
                const response = await editCalon(calon.calonKetuaId,calon.deskripsi);
                showToast(response.message, "info");
                setIsWaiting(false);
                setIsContentOpen(false);
                setCalon({ wargaId: 0, deskripsi: "", calonKetuaId: 0,namaWarga: "" })
                refetch();
            }
        } catch (error) {
            console.log(error);
            const apiError = error as ApiError;
            setIsWaiting(false);
            showToast(apiError.response?.data?.message || 'An error occurred', 'error');
        }
    }

    useEffect(() => {
        if (data) {
            setPemilihan({
                judul: data.data.judul,
                deskripsi: data.data.deskripsi,
                tanggalMulai: formatConvertIsoToNormal(data.data.tanggalMulai),
                tanggalSelesai: formatConvertIsoToNormal(data.data.tanggalSelesai),
            });
        }
    }, [data]);

    useEffect(() => {
        if (isOnEdit && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOnEdit]);

    if (isLoading || isFetching || isLoadingWarga || isFetchingWarga) {
        return <LoadingPage />;
    }

    const handleConfirm = async () => {
        setIsWaiting(true);
        if (!pemilihan.judul || !pemilihan.deskripsi || !pemilihan.tanggalMulai || !pemilihan.tanggalSelesai) {
            showToast("Semua field harus diisi", "error");
            setIsWaiting(false);
            return;
        }
        try {
            const response = await editPemilihan(Number(id), pemilihan.judul, pemilihan.deskripsi, formatConvertToIsoString(pemilihan.tanggalMulai), formatConvertToIsoString(pemilihan.tanggalSelesai));
            showToast(response.message, "info");
            setIsWaiting(false);
            router.push('/admin/pemilihan');
        } catch (error) {
            console.log(error);
            const apiError = error as ApiError;
            setIsWaiting(false);
            showToast(apiError.response?.data?.message || 'An error occurred', 'error');
        }
    };

    const handleDelete = async () => {
        setIsWaiting(true);
        try {
            const response = await deleteCalon(calonKetua.calonKetuaId);
            showToast(response.message, "info");
            setIsWaiting(false);
            setIsConfirmationOpen(false);
            refetch();
        } catch (error) {
            console.log(error);
            const apiError = error as ApiError;
            setIsWaiting(false);
            showToast(apiError.response?.data?.message || 'An error occurred', 'error');            
        }
    }

    return (
        <LayoutDashboard>
            {isError || isErrorWarga ? <ModalError push="/admin/pemilihan" /> : null}
            <div className="mx-auto px-4 sm:px-8 ">
                <div className="py-8 flex">

                    <div className="flex flex-col-reverse md:flex-row-reverse border rounded-md p-4 md:p-8 w-full mx-auto justify-between gap-8">
                        <div className="w-full flex gap-2 flex-col">
                            <div className="flex flex-row gap-6 items-center justify-between mb-2">
                                <h2 className="text-2xl font-semibold ">Calon Ketua</h2>
                                {data?.data?.status !== "Belum Dimulai" ? null : <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => setIsContentOpen(true)}>Tambah Partisipan</button>}
                            </div>
                            {data?.data?.calonKetua.length === 0 ? <p className="text-gray-500">Belum ada calon ketua</p> : null}
                            {data?.data?.calonKetua.map((item: CalonKetua) => (
                                <div className="flex border px-4 py-2 rounded-lg w-full " key={item.calonKetuaId}>
                                    <div className="flex flex-row gap-6 items-center py-2 w-full ">
                                        <Image src={item.warga.foto} alt={item.warga.namaLengkap} width={200} height={200} className="rounded-full w-20 h-20 object-cover" />
                                        <div className="flex flex-col justify-center w-full">
                                            <div className="flex flex-row gap-2 items-center">
                                                <h1 className="text-lg font-semibold  h-fit">{item.warga.namaLengkap}</h1>
                                                <div className={`text-xs font-medium text-white w-fit h-fit px-2 py-1 rounded-lg bg-blue-500`}>{item._count.vote}</div>
                                            </div>
                                            <div className="flex flex-row gap-2 items-center ">
                                                <div className="text-sm text-gray-700 bg-transparent line-clamp-3">{item.deskripsi}</div>
                                            </div>
                                            {data.data.status === "Belum Dimulai" ? <div className="flex flex-row gap-2 self-end"><FaUserEdit className="w-4 h-4 text-gray-700 cursor-pointer" onClick={()=>{setIsContentOpen(true); setCalon({calonKetuaId: item.calonKetuaId, deskripsi: item.deskripsi, wargaId: item.warga.wargaId,namaWarga: item.warga.namaLengkap})}} /> <MdDelete className="w-4 h-4 text-red-500 cursor-pointer" onClick={()=>{setIsConfirmationOpen(true); setCalonKetua({calonKetuaId: item.calonKetuaId, namaCalonKetua: item.warga.namaLengkap})}} /> </div>: null}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <h1 className="text-4xl font-semibold ">Detail Pemilihan</h1>
                            <div className="mb-4 md:mb-0 md:flex-1">
                                <label
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Judul
                                </label>
                                <input
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={pemilihan.judul}
                                    onChange={(e) => setPemilihan({ ...pemilihan, judul: e.target.value })}
                                    disabled={data?.data?.status !== "Belum Dimulai" ? true : false}
                                />
                            </div>
                            <div className="flex-1">
                                <label
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Deskripsi
                                </label>
                                <textarea
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={pemilihan.deskripsi}
                                    onChange={(e) => setPemilihan({ ...pemilihan, deskripsi: e.target.value })}
                                    disabled={data?.data?.status !== "Belum Dimulai" ? true : false}
                                    rows={5}
                                />
                            </div>
                            <div className="flex-1">
                                <label
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Tanggal Mulai
                                </label>
                                <input
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={pemilihan.tanggalMulai}
                                    type="date"
                                    onChange={(e) => setPemilihan({ ...pemilihan, tanggalMulai: e.target.value })}
                                    disabled={data?.data?.status !== "Belum Dimulai" ? true : false}
                                />
                            </div>
                            <div className="flex-1">
                                <label
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Tanggal Selesai
                                </label>
                                <input
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={pemilihan.tanggalSelesai}
                                    type="date"
                                    onChange={(e) => setPemilihan({ ...pemilihan, tanggalSelesai: e.target.value })}
                                    disabled={data?.data?.status !== "Belum Dimulai" ? true : false}
                                />
                            </div>
                            {data?.data?.status !== "Belum Dimulai" ? null : <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-fit h-fit self-center mt-4"
                                onClick={() => { handleConfirm() }}
                            >
                                Edit
                            </button>}
                        </div>

                    </div>
                </div>
            </div>
            {isWaiting && <LoadingState />}
            {isContentOpen && <ModalContent
                title={calon.calonKetuaId ===0? "Tambah Calon" : "Edit Calon"}
                onClose={() => { setIsContentOpen(false); setCalon({ wargaId: 0, deskripsi: "", calonKetuaId: 0,namaWarga: "" }) }}
                content={
                    <div className='flex flex-col gap-2'>
                        <label className='block text-md font-medium text-gray-700'>Warga</label>
                        {calon.calonKetuaId === 0 ? <select className='w-full p-2 border border-gray-300 rounded-md' value={calon.wargaId} onChange={(e) => setCalon({ ...calon, wargaId: parseInt(e.target.value) })}>
                            <option value={0}>Pilih Warga</option>
                            {dataWarga && dataWarga?.data?.map((item: Warga, index: number): JSX.Element => (
                                <option key={index} value={item.wargaId}>{item.namaLengkap}</option>
                            ))}
                        </select> :
                        <div className='w-full p-2 border border-gray-300 rounded-md'>
                            {calon.namaWarga}
                        </div>
                        }
                        
                        <label className='mt-2 block text-md font-medium text-gray-700'>Deskripsi</label>
                        <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Deskripsi Calon Ketua" value={calon.deskripsi} onChange={(e) => setCalon({ ...calon, deskripsi: e.target.value })} />                        
                        <button className='w-fit h-fit mt-4 bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700 transition-all duration-300' onClick={() => { handleCalon() }}>{calon.calonKetuaId ===0? "Tambah" : "Simpan"}</button>
                    </div>
                }
            />}
            {isConfirmationOpen && <ModalConfirmation
            
            title="Konfirmasi Hapus"
            message={`Apakah Anda yakin ingin menghapus ${calonKetua.namaCalonKetua} dari pemilihan ini?`}
            onConfirm={() => { handleDelete() }}
            onClose={() => { setIsConfirmationOpen(false) }}
        
            />}
        </LayoutDashboard>
    );
};

export default withAdminAuth(EditPemilihanPage);
