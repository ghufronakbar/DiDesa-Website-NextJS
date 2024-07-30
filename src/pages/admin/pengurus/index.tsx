
import React, { useState } from 'react';
import LayoutDashboard from '@/components/LayoutDashboard';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';
import LoadingTable from '@/components/LoadingTable';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import ButtonPagination from '@/components/ButtonPagination';
import { useToast } from '@/components/Toast';
import { ApiError } from '@/models/ApiError';
import { PengurusDesa } from '@/models/PengurusDesa';
import ErrorTable from '@/components/ErrorTable';
import ModalConfirmation from '@/components/ModalConfirmation';
import LoadingState from '@/components/LoadingState';
import { deletePengurusDesa, getAllPengurusDesa, setAccessPengurusDesa } from '@/services/admin/pengurusDesa';
import Image from 'next/image';
import withAdminAuth from '@/utils/withAdminAuth';

const PengurusPage: React.FC = () => {
    const router = useRouter();
    const page = Number(router.query.page) || 1
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [pengurusDesaAnggotaId, setPengurusDesaAnggotaId] = useState<number>(0);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const { showToast } = useToast();
    const { data, isLoading, isFetching, isError, refetch } = useQuery({
        queryKey: ['pengurus-desa', router.query.page],
        queryFn: () => getAllPengurusDesa(page),
        placeholderData: keepPreviousData,
    })

    const handleAccessAdmin = async (pengurusDesaAnggotaId: number, aksesAdmin: boolean) => {
        setIsWaiting(true);
        try {
            const response = await setAccessPengurusDesa(pengurusDesaAnggotaId, aksesAdmin);
            setIsWaiting(false);
            showToast(response?.message, 'info');
            refetch();
        } catch (error) {
            console.log(error);
            const apiError = error as ApiError;
            setIsWaiting(false);
            setIsModalOpen(false);
            showToast(apiError.response?.data?.message || 'An error occurred', 'error');
        }
    };

    const handleDelete = async (pengurusDesaAnggotaId: number) => {
        setIsWaiting(true);
        try {
            const response = await deletePengurusDesa(pengurusDesaAnggotaId);
            showToast(response?.message, 'info');
            setIsWaiting(false);
            setIsModalOpen(false);
            refetch();
        } catch (error) {
            console.log(error);
            const apiError = error as ApiError;
            setIsWaiting(false);
            showToast(apiError.response?.data?.message || 'An error occurred', 'error');
        }
    };

    return (
        <LayoutDashboard>
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div className="flex justify-between">
                        <h1 className="text-4xl font-semibold">Pengurus Desa</h1>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => router.push('/admin/pengurus/tambah')}>Tambah Pengurus</button>
                    </div>
                    <div className="overflow-x-auto mt-6">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        No
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nama
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Jabatan
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Akses Admin
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {isLoading || isFetching ? <LoadingTable colSpan={6} count={5} />
                                    : isError ? <ErrorTable colSpan={6} />
                                        :
                                        data && data?.data?.map((item: PengurusDesa, index: number): JSX.Element => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Image src={item.warga.foto} width={100} height={100} alt="warga" className='w-12 h-12 rounded-lg' />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className='font-semibold'>{item.warga.namaLengkap}</div>
                                                    <div className='text-gray-500 text-sm'>{item.warga.nik}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item.jabatan}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item.aksesAdmin == true ? <BiCheckCircle className='text-green-500 w-6 h-6 self-center m-auto cursor-pointer' onClick={() => handleAccessAdmin(item.pengurusDesaAnggotaId, false)} /> :
                                                        <BiXCircle className='text-red-500 w-6 h-6 self-center m-auto cursor-pointer' onClick={() => handleAccessAdmin(item.pengurusDesaAnggotaId, true)} />}

                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-indigo-600 hover:text-indigo-900 mr-4" onClick={() => { router.push(`/admin/pengurus/${item.pengurusDesaAnggotaId}`) }}>Detail</button>
                                                    <button className="text-red-600 hover:text-red-900" onClick={() => { setIsModalOpen(true); setPengurusDesaAnggotaId(item.pengurusDesaAnggotaId) }}>Hapus</button>
                                                </td>
                                            </tr>
                                        ))}
                            </tbody>
                        </table>
                    </div>
                    {!isFetching ? <ButtonPagination pagination={data?.pagination} /> : null}
                </div>
            </div>
            {isModalOpen && (
                <ModalConfirmation
                    title="Konfirmasi Hapus"
                    message="Apakah Anda yakin ingin menghapus pengurus ini?"
                    onConfirm={() => { handleDelete(pengurusDesaAnggotaId) }}
                    onClose={() => { setIsModalOpen(false); setPengurusDesaAnggotaId(0) }}
                />
            )}
            {isWaiting && <LoadingState />}
        </LayoutDashboard>
    );
}


export default withAdminAuth(PengurusPage);
