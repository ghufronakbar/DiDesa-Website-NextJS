
import React, { useState } from 'react';
import LayoutDashboard from '@/components/Layout';
import LoadingTable from '@/components/LoadingTable';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import ButtonPagination from '@/components/ButtonPagination';
import { useToast } from '@/components/Toast';
import { ApiError } from '@/models/ApiError';
import { JenisUmkm } from '@/models/JenisUmkm';
import ErrorTable from '@/components/ErrorTable';
import ModalConfirmation from '@/components/ModalConfirmation';
import LoadingState from '@/components/LoadingState';
import { deleteJenisUmkm, getAllJenisUmkm } from '@/services/admin/jenisUmkm';

const JenisUmkmPage: React.FC = () => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [jenisUmkmId, setJenisUmkmId] = useState<number>(0);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const { showToast } = useToast();
    const { data, isLoading, isFetching, isError, refetch } = useQuery({
        queryKey: ['jenis-umkm'],
        queryFn: () => getAllJenisUmkm(),
        placeholderData: keepPreviousData,
    })

    const handleDelete = async (jenisUmkmId: number) => {
        setIsWaiting(true);
        try {
            const response = await deleteJenisUmkm(jenisUmkmId);
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
                        <h1 className="text-4xl font-semibold">Jenis Umkm</h1>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => router.push('/admin/jenis-umkm/tambah')}>Tambah Jenis UMKM</button>
                    </div>
                    <div className="overflow-x-auto mt-6">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        No
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Jenis
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total UMKM
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {isLoading || isFetching ? <LoadingTable colSpan={4} count={5} />
                                    : isError ? <ErrorTable colSpan={6} />
                                        :
                                        data && data?.data?.map((item: JenisUmkm, index: number): JSX.Element => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item.namaJenisUmkm}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item?._count?.umkm}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-indigo-600 hover:text-indigo-900 mr-4" onClick={() => { router.push(`/admin/jenis-umkm/${item.jenisUmkmId}`) }}>Edit</button>
                                                    <button className="text-red-600 hover:text-red-900" onClick={() => { setIsModalOpen(true); setJenisUmkmId(item.jenisUmkmId) }}>Hapus</button>
                                                </td>
                                            </tr>
                                        ))}
                            </tbody>
                        </table>
                    </div>                    
                </div>
            </div>
            {isModalOpen && (
                <ModalConfirmation
                    title="Konfirmasi Hapus"
                    message={`Apakah Anda yakin ingin menghapus Jenis UMKM ini? Ini bisa berefek ke semua UMKM yang menggunakan Jenis UMKM ini.`}
                    onConfirm={() => { handleDelete(jenisUmkmId) }}
                    onClose={() => { setIsModalOpen(false); setJenisUmkmId(0) }}
                />
            )}
            {isWaiting && <LoadingState />}
        </LayoutDashboard>
    );
}


export default JenisUmkmPage;
