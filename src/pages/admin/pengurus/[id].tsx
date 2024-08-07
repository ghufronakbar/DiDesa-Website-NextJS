import React, { useEffect, useRef, useState } from "react";
import LayoutDashboard from "@/components/LayoutDashboard";
import { useToast } from "@/components/Toast";
import LoadingState from "@/components/LoadingState";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "@/components/LoadingPage";
import ModalError from "@/components/ModalError";
import withAdminAuth from "@/utils/withAdminAuth";
import { getPengurusDesaById, setAccessPengurusDesa, setJabatanPengurusDesa } from "@/services/admin/pengurusDesa";
import Image from "next/image";
import { FaRegEdit } from "react-icons/fa";
import { ApiError } from "@/models/ApiError";

const EditPengurusPage: React.FC = () => {
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const { showToast } = useToast();
    const [jabatan, setJabatan] = useState<string>('');
    const router = useRouter();
    const { id } = router.query;
    const [isOnEdit, setIsOnEdit] = useState<boolean>(false);   
    const inputRef = useRef<HTMLInputElement>(null); 

    const { data, isLoading, isFetching, isError } = useQuery({
        queryKey: ['pengurus', id],
        queryFn: () => router.isReady && id && typeof id === 'string' ? getPengurusDesaById(Number(id)) : null,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (data) {
            setJabatan(data?.data?.jabatan);
        }
    }, [data]);

    useEffect(() => {
        if (isOnEdit && inputRef.current) {
            inputRef.current.focus(); 
        }
    }, [isOnEdit]);

    if (isLoading || isFetching) {
        return <LoadingPage />;
    }

    const handleConfirm = async () => {
        setIsWaiting(true);
        try {
            const response = await setJabatanPengurusDesa(Number(id), jabatan);
            showToast(response.message, "info");
            setIsWaiting(false);
            router.push('/admin/pengurus');
        } catch (error) {
            console.log(error);
            const apiError = error as ApiError;
            setIsWaiting(false);
            showToast(apiError.response?.data?.message || 'An error occurred', 'error');
        }
    };

    const handleAccessAdmin = async (pengurusDesaAnggotaId: number, aksesAdmin: boolean) => {
        setIsWaiting(true);
        try {
            const response = await setAccessPengurusDesa(pengurusDesaAnggotaId, aksesAdmin);
            setIsWaiting(false);
            showToast(response?.message, 'info');            
        } catch (error) {
            console.log(error);
            const apiError = error as ApiError;
            setIsWaiting(false);            
            showToast(apiError.response?.data?.message || 'An error occurred', 'error');
        }
    };

    return (
        <LayoutDashboard>            
            {isError ? <ModalError push="/admin/pengurus" /> : null}
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">

                    <div className="flex flex-col border rounded-md p-4 w-full md:max-w-[500px] lg:max-w-[700px] mx-auto">
                        <div className="mb-4">
                            <div className="flex flex-row gap-6 items-center py-2">
                                <Image src={data?.data?.warga?.foto ? data?.data?.warga?.foto : '/images/wallapaper.jpg'} alt="Logo" width={200} height={200} className="rounded-full w-28 h-28 object-cover" />
                                <div className="flex flex-col justify-center">
                                    <h1 className="text-4xl font-semibold  h-fit">{data?.data?.warga.namaLengkap}</h1>
                                    <div className="flex flex-row gap-2 items-center ">
                                        {isOnEdit ? <input ref={inputRef} className="text-lg font-semibold text-gray-700 w-36 bg-transparent border px-2 focus:outline-none" value={jabatan} onChange={(e) => setJabatan(e.target.value)} />
                                            : <p className="text-lg font-semibold text-gray-700 border-transparent">{jabatan}</p>}
                                        <button className={`text-xs font-medium text-white w-fit h-fit px-2 py-1 rounded-lg ${data?.data?.aksesAdmin === true ? 'bg-green-500' : 'bg-red-500'}`} onClick={() => handleAccessAdmin(Number(id), !data?.data?.aksesAdmin)}  disabled={isWaiting || !isOnEdit || isFetching || isLoading}>{data?.data?.aksesAdmin === true ? 'Admin' : 'Non Admin'}</button>
                                        <FaRegEdit className="w-4 h-4 text-gray-700 cursor-pointer" onClick={()=>{setIsOnEdit(!isOnEdit)}} />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="mb-4 md:mb-0 md:flex-1">
                                <label
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    NIK
                                </label>
                                <div

                                    className="w-full px-3 py-2 border rounded-md"

                                >{data?.data?.warga.nik} </div>
                            </div>
                            <div className="flex-1">
                                <label
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Telepon
                                </label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 border border-r-0 rounded-l-md bg-gray-50 text-gray-500 text-sm">
                                        +62
                                    </span>
                                    <div
                                        className="w-full px-3 py-2 border rounded-r-md"
                                    > {data?.data?.warga?.telepon?.slice(2)} </div>
                                </div>
                            </div>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-fit h-fit self-center mt-4"
                                onClick={() => {handleConfirm()}}
                            >
                                Simpan
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            {isWaiting && <LoadingState />}
        </LayoutDashboard>
    );
};

export default withAdminAuth(EditPengurusPage);
