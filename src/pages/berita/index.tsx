import CardBerita from "@/components/CardBerita";
import CardBeritaGrid from "@/components/CardBeritaGrid";
import ErrorCard from "@/components/ErrorCard";
import NavbarUser from "@/components/NavbarUser";
import SkeletonCardBerita from "@/components/SkeletonCardBerita";
import SkeletonCardGrid from "@/components/SkeletonCardGrid";
import { Berita } from "@/models/Berita";
import { getBerita } from "@/services/user/berita";
import useDebounce from "@/utils/useDebounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

const BeritaPage = () => {
  const router = useRouter();
  const [limit, setLimit] = useState<number>(8);
  const [search, setSearch] = useState<string>(router.query.q as string);
  interface DataLength  {
    currentData: number;
    totalData: number;
  }
  const [dataLength, setDataLength] = useState<DataLength>({
    currentData: 0,
    totalData: 0,
  });

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["berita", limit, search],
    queryFn: () => getBerita(limit, search),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    placeholderData: keepPreviousData,
  });

  useDebounce(() => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, q: search },
    })
  }, 500, [router.query.q]);

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
      <section id="berita" className="w-full min-h-screen bg-gray-100">
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
                  value={search}
                  onChange={(e) => {setSearch(e.target.value); router.push({ pathname: router.pathname, query: { ...router.query, q: e.target.value } })}}
                  />
                <div className="w-auto h-10 px-4 !rounded-r-lg focus:outline-none bg-primary text-white items-center flex font-rubik">
                  <CiSearch className="w-6 h-6 mx-auto " />
                </div>
              </div>
            </div>
          </div>
          {!isFetching && search !== "" &&  data && data.data.length === 0 ? (
              <div className="text-black text-center mt-40">Hasil Pencarian dengan keyword <b>&quot;{search}&quot;</b> Tidak Ditemukan :(</div>
            ):null}
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
            {isError ? (
              <ErrorCard count={15} />
            ) : (
              data &&
              data.data.map((item: Berita, index: number) => (
                <CardBeritaGrid
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
              <SkeletonCardGrid count={3} />
            ):null} 
          </div>
        </div>
      </section>
    </>
  );
};

export default BeritaPage;
