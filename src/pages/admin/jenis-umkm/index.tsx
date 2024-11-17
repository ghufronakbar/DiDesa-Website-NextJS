
import React, { useState } from 'react';
import LayoutDashboard from '@/components/LayoutDashboard';
import LoadingTable from '@/components/LoadingTable';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useToast } from '@/components/Toast';
import { ApiError } from '@/models/Response';
import { JenisUmkm } from '@/models/JenisUmkm';
import ErrorTable from '@/components/ErrorTable';
import ModalConfirmation from '@/components/ModalConfirmation';
import LoadingState from '@/components/LoadingState';
import { createJenisUmkm, deleteJenisUmkm, editJenisUmkm, getAllJenisUmkm } from '@/services/admin/jenisUmkm';
import withAdminAuth from '@/utils/withAdminAuth';
import ModalContent from '@/components/ModalContent';

const JenisUmkmPage: React.FC = () => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isContentOpen, setIsContentOpen]=useState<boolean>(false);
    const [jenisUmkmId, setJenisUmkmId] = useState<number>(0);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const { showToast } = useToast();
    type Content = {
        jenisUmkmId : number
        namaJenisUmkm : string
    }
    const [content, setContent] = useState<Content>({
        jenisUmkmId : 0,
        namaJenisUmkm : ''
    })
    const { data, isLoading, isFetching, isError, refetch } = useQuery({
        queryKey: ['jenis-umkm'],
        queryFn: () => getAllJenisUmkm(),
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
    })

    const handleDelete = async (jenisUmkmId: number) => {
        setIsWaiting(true);
        try {
            const response = await deleteJenisUmkm(jenisUmkmId);
            showToast(response?.message, 'success');
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

    const handleConfirm = async (jenisUmkmId: number, namaJenisUmkm: string) => {
        setIsWaiting(true);
        if(namaJenisUmkm === ''){
            showToast('Semua kolom harus diisi', 'error');
            setIsWaiting(false);
            return;
        }
        try {
            if(jenisUmkmId === 0){
                const response = await createJenisUmkm(namaJenisUmkm);
                showToast(response?.message, 'success');
                setIsWaiting(false);
                setIsContentOpen(false);
                refetch();
            }else{
                const response = await editJenisUmkm(jenisUmkmId, namaJenisUmkm);
                showToast(response?.message, 'success');
                setIsWaiting(false);
                setIsContentOpen(false);
                refetch();
            }
        } catch (error) {
            console.log(error);
            const apiError = error as ApiError;
            setIsWaiting(false);
            showToast(apiError.response?.data?.message || 'An error occurred', 'error');
        }
    }

    return (
        <LayoutDashboard>
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div className="flex justify-between">
                        <h1 className="text-4xl font-semibold">Jenis Umkm</h1>
                        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => {setIsContentOpen(true)}}>Tambah Jenis UMKM</button>
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
                                                    <button className="text-indigo-600 hover:text-indigo-900 mr-4" onClick={() => { setIsContentOpen(true); setContent({jenisUmkmId: item.jenisUmkmId, namaJenisUmkm: item.namaJenisUmkm}) }}>Edit</button>
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
            {isContentOpen && <ModalContent
            title={content.jenisUmkmId === 0 ? 'Tambah Jenis UMKM' : 'Edit Jenis UMKM'}
            onClose={() => {setIsContentOpen(false); setContent({ jenisUmkmId: 0, namaJenisUmkm: ''})}}
            content={
                <div className='flex flex-col gap-1'>
                    <label className="block text-md font-medium text-gray-700">Jenis UMKM</label>
                    <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Jenis UMKM" value={content.namaJenisUmkm} onChange={(e) => {setContent({...content, namaJenisUmkm: e.target.value})}}/>
                    <button className='w-fit h-fit mt-4 bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700 transition-all duration-300' onClick={()=>{handleConfirm(content.jenisUmkmId, content.namaJenisUmkm)}}> {content.jenisUmkmId === 0 ? 'Tambah' : 'Edit'} </button>
                </div>
            }
            />}
            {isWaiting && <LoadingState />}
        </LayoutDashboard>
    );
}


export default withAdminAuth(JenisUmkmPage);
