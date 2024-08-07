
import React, { useState } from 'react';
import LayoutDashboard from '@/components/LayoutDashboard';
import formatDate from '@/utils/format/formatDate';
import formatString from '@/utils/format/formatString';
import LoadingTable from '@/components/LoadingTable';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import ButtonPagination from '@/components/ButtonPagination';
import { useToast } from '@/components/Toast';
import { ApiError } from '@/models/ApiError';
import { PemilihanKetua } from '@/models/PemilihanKetua';
import ErrorTable from '@/components/ErrorTable';
import ModalConfirmation from '@/components/ModalConfirmation';
import LoadingState from '@/components/LoadingState';
import withAdminAuth from '@/utils/withAdminAuth';
import { createPemilihan, deletePemilihan, getAllPemilihan } from '@/services/admin/pemilihanKetua';
import { CalonKetua } from '@/models/CalonKetua';
import ModalContent from '@/components/ModalContent';
import formatConvertToIsoString from '@/utils/format/formatConvertToIsoString';

const PemilihanPage: React.FC = () => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isContentOpen, setIsContentOpen] = useState<boolean>(false);
    const [pemilihanKetuaId, setPemilihanKetuaId] = useState<number>(0);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const { showToast } = useToast();
    const { data, isLoading, isFetching, isError, refetch } = useQuery({
        queryKey: ['pemilihan'],
        queryFn: () => getAllPemilihan(),
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
    })
    type Form = {
        judul: string;
        deskripsi: string;
        tanggalMulai: string;
        tanggalSelesai: string;
    }
    const [form, setForm] = useState<Form>({
        judul: '',
        deskripsi: '',
        tanggalMulai: '',
        tanggalSelesai: '',
    });

    const handleDelete = async (pemilihanKetuaId: number) => {
        setIsWaiting(true);
        try {
            const response = await deletePemilihan(pemilihanKetuaId);
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

    const handleAdd = async () => {
        if(form.judul === '' || form.deskripsi === '' || form.tanggalMulai === '' || form.tanggalSelesai === '') {
            showToast('Semua kolom harus diisi', 'error');
            return;
        }
        setIsWaiting(true);
        try {
            const response = await createPemilihan(form.judul, form.deskripsi,formatConvertToIsoString(form.tanggalMulai) , formatConvertToIsoString(form.tanggalSelesai));
            showToast(response?.message, 'info');
            setIsWaiting(false);
            setIsContentOpen(false);
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
                        <h1 className="text-4xl font-semibold">Pemilihan</h1>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => {setIsContentOpen(true)}}>Tambah Pemilihan</button>
                    </div>
                    <div className="overflow-x-auto mt-6">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        No
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Judul
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Partisipan
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tanggal
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {isLoading || isFetching ? <LoadingTable colSpan={6} count={5} />
                                    : isError ? <ErrorTable colSpan={6} />
                                        :
                                        data && data?.data?.map((item: PemilihanKetua, index: number): JSX.Element => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className='font-semibold'>{item.judul}</div>
                                                    <div className='text-gray-500 text-sm'>{formatString(item.deskripsi, 25)}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap ">  
                                                    {item.calonKetua.length === 0 && <p className='w-fit h-fit bg-gray-500 px-2 py-1 rounded-lg text-xs text-white self-center m-1'>Belum ada partisipan</p>}                                              
                                                    {item.calonKetua.map((c: CalonKetua, i: number): JSX.Element => (
                                                        <div className="w-fit h-fit bg-blue-500 px-2 py-1 rounded-lg text-xs text-white self-center m-1" key={i}>
                                                           {c.warga.namaLengkap} {": "+c._count.vote}
                                                        </div>
                                                    ))}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item.status}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className='font-semibold text-sm'>{formatDate(item.tanggalMulai)}</div>
                                                    <div className='font-semibold text-sm'>{formatDate(item.tanggalSelesai)}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center">
                                                    <button className="text-indigo-600 hover:text-indigo-900 mr-4" onClick={() => { router.push(`/admin/pemilihan/${item.pemilihanKetuaId}`) }}>{item.status === 'Belum Dimulai' ? 'Edit' : 'Detail'}</button>
                                                    {item.status === 'Belum Dimulai' ?<button className="text-red-600 hover:text-red-900" onClick={() => { setIsModalOpen(true); setPemilihanKetuaId(item.pemilihanKetuaId) }}>Hapus</button>:null}
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
                    message="Apakah Anda yakin ingin menghapus pemilihan ini?"
                    onConfirm={() => { handleDelete(pemilihanKetuaId) }}
                    onClose={() => { setIsModalOpen(false); setPemilihanKetuaId(0) }}
                />
            )}
            {isContentOpen&&(
                <ModalContent title='Tambah Pemilihan' onClose={()=>{setIsContentOpen(false); setForm({judul: '', deskripsi: '', tanggalMulai: '', tanggalSelesai: ''})}}
                content={
                    <div className='flex flex-col gap-1'>
                    <label className="block text-md font-medium text-gray-700">Judul</label>
                    <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Masukkan Judul" value={form.judul} onChange={(e) => {setForm({...form, judul: e.target.value})}}/>
                    <label className="block text-md font-medium text-gray-700">Deskripsi</label>
                    <textarea className="w-full p-2 border border-gray-300 rounded-md" placeholder="Masukkan Deskripsi" value={form.deskripsi} onChange={(e) => {setForm({...form, deskripsi: e.target.value})}} rows={5}/>
                    <label className="block text-md font-medium text-gray-700">Tanggal Mulai</label>
                    <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Masukkan Deskripsi" value={form.tanggalMulai} onChange={(e) => {setForm({...form, tanggalMulai: e.target.value})}} type='date'/>
                    <label className="block text-md font-medium text-gray-700">Tanggal Selesai</label>
                    <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Masukkan Deskripsi" value={form.tanggalSelesai} onChange={(e) => {setForm({...form, tanggalSelesai: e.target.value})}} type='date'/>                    
                    <button className='w-fit h-fit mt-4 bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700 transition-all duration-300' onClick={()=>{handleAdd()}}> Tambah </button>
                </div>
                }/>
            )}
            {isWaiting && <LoadingState />}
        </LayoutDashboard>
    );
}


export default withAdminAuth(PemilihanPage);
