
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import formatDate from '@/utils/format/formatDate';
import formatString from '@/utils/format/formatString';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';
import LoadingTable from '@/components/LoadingTable';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import ButtonPagination from '@/components/ButtonPagination';
import { useToast } from '@/components/Toast';
import { ApiError } from '@/models/ApiError';
import { PengaduanMasyarakat } from '@/models/PengaduanMasyarakat';
import ErrorTable from '@/components/ErrorTable';
import ModalConfirmation from '@/components/ModalConfirmation';
import LoadingState from '@/components/LoadingState';
import { deletePengaduan, getAllPengaduan } from '@/services/admin/pengaduanMasyarakat';

const PengaduanPage: React.FC = () => {
    const router = useRouter();
    const page = Number(router.query.page) || 1
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [pengaduanMasyarakatId, setPengaduanMasyarakatId] = useState<number>(0);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const { showToast } = useToast();
    const { data, isLoading, isFetching, isError, refetch } = useQuery({
        queryKey: ['pengaduan-masyarakat', router.query.page],
        queryFn: () => getAllPengaduan(page),
        placeholderData: keepPreviousData,
    })

    const handleDelete = async (pengaduanMasyarakatId: number) => {
        setIsWaiting(true);
        try {
            const response = await deletePengaduan(pengaduanMasyarakatId);
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
                        <h1 className="text-4xl font-semibold">Pengaduan Masyarakat</h1>
                    </div>
                    <div className="overflow-x-auto mt-6">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        No
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nama
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aduan
                                    </th>                                   
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {isLoading || isFetching ? <LoadingTable colSpan={4} count={5} />
                                    : isError ? <ErrorTable colSpan={6}/>
                                        :
                                        data && data?.data?.map((item: PengaduanMasyarakat, index: number): JSX.Element => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item.warga?.namaLengkap}                                                    
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className='font-semibold'>
                                                        {formatString(item.subjek,30)}
                                                    </div>
                                                    <div className='text-gray-500 text-sm'>
                                                        {formatString(item.isi,30)}
                                                    </div>
                                                </td>                                               
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-indigo-600 hover:text-indigo-900 mr-4" onClick={() => {  }}>Detail</button>
                                                    <button className="text-red-600 hover:text-red-900" onClick={() => { setIsModalOpen(true); setPengaduanMasyarakatId(item.pengaduanMasyarakatId) }}>Hapus</button>
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
          message="Apakah Anda yakin ingin menghapus pengaduan ini?"
          onConfirm={()=>{handleDelete(pengaduanMasyarakatId)}}
          onClose={()=>{setIsModalOpen(false);setPengaduanMasyarakatId(0)}}
        />
      )}
      {isWaiting && <LoadingState />}
        </Layout>
    );
}


export default PengaduanPage;
