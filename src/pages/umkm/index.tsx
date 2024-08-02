import CardUMKM from "@/components/CardUMKM";
import ErrorCard from "@/components/ErrorCard";
import NavbarUser from "@/components/NavbarUser";
import SkeletonCardUMKM from "@/components/SkeletonCardUMKM";
import { JenisUmkm } from "@/models/JenisUmkm";
import { Umkm } from "@/models/Umkm";
import { getJenisUmkm, getUmkm } from "@/services/user/umkm";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

const UMKMPage = () => {
  const [limit, setLimit] = useState<number>(8);
  const [q, setQ] = useState<number | undefined>(undefined);
  interface DataLength {
    currentData: number;
    totalData: number;
  }
  const [dataLength, setDataLength] = useState<DataLength>({
    currentData: 0,
    totalData: 0,
  });

  const { data, isLoading, isFetching, isError,refetch } = useQuery({
    queryKey: ["umkm", limit,q],
    queryFn: () => getUmkm(limit,q),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    placeholderData: keepPreviousData,
  });

  const { data:dataJenis, isLoading: isLoadingJenis, isFetching: isFetchingJenis, isError: isErrorJenis } = useQuery({
    queryKey: ["umkm/jenis"],
    queryFn: () => getJenisUmkm(),
    refetchOnWindowFocus: false,
    staleTime: 100000 * 60 * 60,
    placeholderData: keepPreviousData,
  });

  // useEffect(() => {
  //   refetch();
  // }, [q]);

  useEffect(() => {
    if (data) {
      setDataLength({
        currentData: data.dataLength.currentData,
        totalData: data.dataLength.totalData,
      });
    }
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        if (dataLength.currentData < dataLength.totalData) {
          setLimit((prevLimit) => prevLimit + 3);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dataLength]);

  return (
    <>
    <NavbarUser/>
      <section id="umkm" className="w-full min-h-screen bg-white">
        <div className="w-full h-full py-20 lg:px-32 md:px-20 px-8 gap-2">
          <div className="w-full h-full flex flex-col md:flex-row justify-between gap-4 items-center">
            <div className="w-full h-full flex flex-col gap-2">
              <div className="font-playfair text-black lg:text-6xl md:text-5xl text-4xl">
                UMKM
              </div>
              <div className="md:w-1/4 w-1/2 h-[2px] bg-primary" />
              <div className="font-rubik text-gray-500 text-sm md:text-base ">
                Dukung dan kembangkan usaha kecil dan menengah dengan platform
                pemasaran digital yang efektif.
              </div>
            </div>
            <div className="flex flex-row gap-4 w-full md:w-1/2 py-2">
              <div className="flex w-full mx-auto flex-col-reverse gap-4 ">                
                <select className="w-full self-end  h-10 px-4 !rounded-lg focus:outline-none bg-white text-black font-rubik placeholder:text-gray-500 border-primary border" onChange={(e) => {setQ(Number(e.target.value))}}>                  
                  <option value={undefined}>{isLoadingJenis || isFetchingJenis? "Loading..." : "Pilih Jenis"}</option>
                  {dataJenis?.data.map((item:JenisUmkm) => (
                    <option key={item.jenisUmkmId} value={item.jenisUmkmId}>
                      {item.namaJenisUmkm}
                    </option>
                  ))}
                </select>
                <div className="w-full flex">
                <input
                  className="w-full h-10 px-4 !rounded-l-lg focus:outline-none bg-white text-black font-rubik placeholder:text-gray-500 border-primary border"
                  type="text"
                  placeholder="Cari UMKM..."
                />
                <div className="w-auto h-10 px-4 !rounded-r-lg focus:outline-none bg-primary text-white items-center flex font-rubik">
                  <CiSearch className="w-6 h-6 mx-auto " />
                </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 mt-4">
            {!isFetching &&  data && data.data.length === 0 ? (
              <div className="text-center">Hasil Pencarian Tidak Ditemukan :(</div>
            ):null}
            {isError || isErrorJenis ? (
              <ErrorCard count={15} />
            ) : (
              data &&
              data.data.map((item: Umkm, index: number) => (
                <CardUMKM
                  umkmId={item.umkmId}
                  key={index}
                  nama={item.nama}
                  deskripsi={item.deskripsi}
                  gambar={item.gambar}
                  jenisUmkm={item.jenisUmkm.namaJenisUmkm}
                  lokasi={item.lokasi}
                />
              ))
            )}
            {isLoading || isFetching  ? <SkeletonCardUMKM count={3} /> : null}
          </div>
        </div>
      </section>
    </>
  );
};

export default UMKMPage;
