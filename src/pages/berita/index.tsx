import CardBerita from "@/components/CardBerita";
import ErrorCard from "@/components/ErrorCard";
import SkeletonCardBerita from "@/components/SkeletonCardBerita";
import { Berita } from "@/models/Berita";
import { getBerita } from "@/services/user/berita";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

const BeritaPage = () => {
  const [limit, setLimit] = useState<number>(8);
  interface DataLength  {
    currentData: number;
    totalData: number;
  }
  const [dataLength, setDataLength] = useState<DataLength>({
    currentData: 0,
    totalData: 0,
  });

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["berita", limit],
    queryFn: () => getBerita(limit),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    placeholderData: keepPreviousData,
  });

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
      <section id="berita" className="w-full bg-white">
        <div className="w-full h-full py-20 lg:px-32 md:px-20 px-8 gap-2">
          <div className="w-full h-full flex flex-col md:flex-row justify-between gap-4 items-center">
            <div className="w-full h-full flex flex-col gap-2">
              <div className="font-playfair text-black lg:text-6xl md:text-5xl text-4xl">
                Berita
              </div>
              <div className="md:w-1/4 w-1/2 h-[2px] bg-primary" />
              <div className="font-rubik text-gray-500 text-sm md:text-base ">
                Dapatkan berita terkini dan informasi penting langsung dari
                sumber terpercaya di desa.
              </div>
            </div>
            <div className="flex flex-row gap-4 w-full md:w-1/2 py-2">
              <div className="flex w-full mx-auto">
                <input
                  className="w-full h-10 px-4 !rounded-l-lg focus:outline-none bg-white text-black font-rubik placeholder:text-gray-500 border-primary border"
                  type="text"
                  placeholder="Cari berita..."
                />
                <div className="w-auto h-10 px-4 !rounded-r-lg focus:outline-none bg-primary text-white items-center flex font-rubik">
                  <CiSearch className="w-6 h-6 mx-auto " />
                </div>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 mt-4">
            {isError ? (
              <ErrorCard count={15} />
            ) : (
              data &&
              data.data.map((item: Berita, index: number) => (
                <CardBerita
                  beritaId={item.beritaId}
                  gambar={item.gambar}
                  judul={item.judul}
                  subjudul={item.subjudul}
                  tanggal={item.tanggal}
                  isi={item.isi}
                  publikasi={item.publikasi}
                  prioritas={item.prioritas}
                  key={index}
                  _count={item._count}
                />
              ))
            )}
            {isLoading || isFetching ? (
              <SkeletonCardBerita count={3} />
            ):null} 
          </div>
        </div>
      </section>
    </>
  );
};

export default BeritaPage;
