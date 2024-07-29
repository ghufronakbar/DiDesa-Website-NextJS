
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import formatString from '@/utils/format/formatString';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';
import LoadingTable from '@/components/LoadingTable';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import ButtonPagination from '@/components/ButtonPagination';
import { useToast } from '@/components/Toast';
import { ApiError } from '@/models/ApiError';
import { Umkm } from '@/models/Umkm';
import ErrorTable from '@/components/ErrorTable';
import ModalConfirmation from '@/components/ModalConfirmation';
import { deleteUmkm, getAllUmkm, putApproveUmkm } from '@/services/admin/umkm';
import LoadingState from '@/components/LoadingState';
import Image from 'next/image';

const UMKMPage: React.FC = () => {
    const router = useRouter();
    const page = Number(router.query.page) || 1
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [umkmId, setUmkmId] = useState<number>(0);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const { showToast } = useToast();
    const { data, isLoading, isFetching, isError, refetch } = useQuery({
        queryKey: ['umkm', router.query.page],
        queryFn: () => getAllUmkm(page),
        placeholderData: keepPreviousData,
    })


    const handleApprove = async (umkmId: number, approve: boolean) => {
        setIsWaiting(true);
        try {
            const response = await putApproveUmkm(umkmId, approve);
            showToast(response?.message, 'info');
            refetch();
            setIsWaiting(false);
        } catch (error) {
            console.log(error);
            const apiError = error as ApiError;
            setIsWaiting(false);
            showToast(apiError.response?.data?.message || 'An error occurred', 'error');
        }
    };

    const handleDelete = async (umkmId: number) => {
        setIsWaiting(true);
        try {
            const response = await deleteUmkm(umkmId);
            showToast(response?.message, 'info');
            setIsModalOpen(false);
            refetch();
            setIsWaiting(false);
        } catch (error) {
            console.log(error);
            const apiError = error as ApiError;
            setIsWaiting(false);
            showToast(apiError.response?.data?.message || 'An error occurred', 'error');

        }
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div className="flex justify-between">
                        <h1 className="text-4xl font-semibold">UMKM</h1>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => router.push('/admin/jenis-umkm')}>Kelola Jenis UMKM</button>
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
                                        Jenis
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Disetujui
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aktif
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {isLoading || isFetching ? <LoadingTable colSpan={7} count={5} />
                                    : isError ? <ErrorTable colSpan={6} />
                                        :
                                        data && data?.data?.map((item: Umkm, index: number): JSX.Element => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Image src={item.gambar} alt={item.nama} width={100} height={100} className='h-16 max-w-40 w-auto object-cover rounded-lg'/>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>{item.nama}</div>
                                                    <div>{formatString(item.lokasi, 25)}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item.jenisUmkm.namaJenisUmkm}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item.approve == true ? <BiCheckCircle className='text-green-500 w-6 h-6 self-center m-auto cursor-pointer' onClick={() => { handleApprove(item.umkmId, !item.approve) }} /> :
                                                        <BiXCircle className='text-red-500 w-6 h-6 self-center m-auto cursor-pointer' onClick={() => { handleApprove(item.umkmId, !item.approve) }} />}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item.status == true ? <BiCheckCircle className='text-green-500 w-6 h-6 self-center m-auto cursor-pointer' /> :
                                                        <BiXCircle className='text-red-500 w-6 h-6 self-center m-auto cursor-pointer' />}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-indigo-600 hover:text-indigo-900 mr-4" onClick={() => { router.push(`/admin/umkm/${item.umkmId}`) }}>Detail</button>
                                                    <button className="text-red-600 hover:text-red-900" onClick={() => { setIsModalOpen(true); setUmkmId(item.umkmId) }}>Hapus</button>
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
                    message="Apakah Anda yakin ingin menghapus UMKM ini?"
                    onConfirm={() => { handleDelete(umkmId) }}
                    onClose={() => { setIsModalOpen(false); setUmkmId(0) }}
                />
            )}
            {isWaiting && <LoadingState />}
        </Layout>
    );
}


export default UMKMPage;
