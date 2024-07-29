
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import LoadingTable from '@/components/LoadingTable';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import ButtonPagination from '@/components/ButtonPagination';
import { useToast } from '@/components/Toast';
import { ApiError } from '@/models/ApiError';
import { Warga } from '@/models/Warga';
import ErrorTable from '@/components/ErrorTable';
import ModalConfirmation from '@/components/ModalConfirmation';
import LoadingState from '@/components/LoadingState';
import { deleteWarga, getAllWarga } from '@/services/admin/warga';
import Image from 'next/image';

const WargaPage: React.FC = () => {
    const router = useRouter();
    const page = Number(router.query.page) || 1
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [wargaId, setWargaId] = useState<number>(0);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const { showToast } = useToast();
    const { data, isLoading, isFetching, isError, refetch } = useQuery({
        queryKey: ['warga', router.query.page],
        queryFn: () => getAllWarga(page),
        placeholderData: keepPreviousData,
    })
    
    const handleDelete = async (wargaId: number) => {
        setIsWaiting(true);
        try {
            const response = await deleteWarga(wargaId);
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
        <Layout>
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div className="flex justify-between">
                        <h1 className="text-4xl font-semibold">Warga</h1>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => router.push('/admin/warga/tambah')}>Tambah Warga</button>
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
                                        NIK/KK
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        No Telepon
                                    </th>                                    
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">                                        
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {isLoading || isFetching ? <LoadingTable colSpan={6} count={5} />
                                    : isError ? <ErrorTable colSpan={6}/>
                                        :
                                        data && data?.data?.map((item: Warga, index: number): JSX.Element => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Image src={item.foto} width={100} height={100} alt="warga" className='w-12 h-12 rounded-lg' />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>{item.namaLengkap}</div>                                                    
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>{item.nik}</div>
                                                    <div>{item.kk}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item.telepon}
                                                </td>                                 
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-indigo-600 hover:text-indigo-900 mr-4" onClick={() => { router.push(`/admin/warga/${item.wargaId}`) }}>Edit</button>
                                                    <button className="text-red-600 hover:text-red-900" onClick={() => { setIsModalOpen(true); setWargaId(item.wargaId) }}>Hapus</button>
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
          message="Apakah Anda yakin ingin menghapus warga ini?"
          onConfirm={()=>{handleDelete(wargaId)}}
          onClose={()=>{setIsModalOpen(false);setWargaId(0)}}
        />
      )}
      {isWaiting && <LoadingState />}
        </Layout>
    );
}


export default WargaPage;
