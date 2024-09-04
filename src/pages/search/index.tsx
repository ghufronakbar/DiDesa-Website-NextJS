import CardBeritaGrid from "@/components/CardBeritaGrid";
import CardUMKMGrid from "@/components/CardUMKMGrid";
import ErrorCard from "@/components/ErrorCard";
import Footer from "@/components/Footer";
import NavbarUser from "@/components/NavbarUser";
import SkeletonCardGrid from "@/components/SkeletonCardGrid";
import { Berita } from "@/models/Berita";
import { Umkm } from "@/models/Umkm";
import { getBerita } from "@/services/user/berita";
import { fetchSearch } from "@/services/user/search";
import { getUmkm } from "@/services/user/umkm";
import useDebounce from "@/utils/useDebounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>(router.query.q as string);  

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["searchPage", search],
    queryFn: () => fetchSearch(search),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    placeholderData: keepPreviousData,
  });

  useDebounce(
    () => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, q: search },
      });
    },
    500,
    [router.query.q]
  );

  return (
    <>
      <NavbarUser />
      <section id="search" className="w-full min-h-screen bg-gray-100 mt-7">
        <div className="w-full h-full py-20 lg:px-32 md:px-20 px-8 gap-2">
          <div className="w-full h-full flex flex-col md:flex-row justify-between gap-4 items-center">
            <div className="w-full h-full flex flex-col gap-2">
              <div className="font-playfair text-black lg:text-6xl md:text-5xl text-4xl">
                Cari
              </div>
              <div className="md:w-1/4 w-1/2 h-[2px] bg-primary" />
              <div className="font-rubik text-gray-500 text-sm md:text-base ">
                Cari Berita dan UMKM yang kamu butuhkan disini
              </div>
            </div>
            <div className="flex flex-row gap-4 w-full md:w-1/2 py-2">
              <div className="flex w-full mx-auto">
                <input
                  className="w-full h-10 px-4 !rounded-l-lg focus:outline-none bg-white text-black font-rubik placeholder:text-gray-500 border-primary border"
                  type="text"
                  placeholder="Ketikkan kata kunci pencarian..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    router.push({
                      pathname: router.pathname,
                      query: { ...router.query, q: e.target.value },
                    });
                  }}
                />
                <div className="w-auto h-10 px-4 !rounded-r-lg focus:outline-none bg-primary text-white items-center flex font-rubik">
                  <CiSearch className="w-6 h-6 mx-auto " />
                </div>
              </div>
            </div>
          </div>
          {!isFetching &&
          search !== "" &&
          data &&
          data.berita.data.length === 0 &&
          data.umkm.data.length === 0 ? (
            <div className="text-black text-center mt-40">
              Hasil Pencarian dengan keyword <b>&quot;{search}&quot;</b> Tidak
              Ditemukan :(
            </div>
          ) : null}
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
            {isError ? (
              <ErrorCard count={15} />
            ) : data ? (
              <>
                {data.berita.data.map((item: Berita, index: number) => (
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
                ))}
                {data.umkm.data.map((item: Umkm, index: number) => (
                  <CardUMKMGrid
                    umkmId={item.umkmId}
                    key={index}
                    gambar={item.gambar}
                    deskripsi={item.deskripsi}
                    jenisUmkm={item.jenisUmkm.namaJenisUmkm}
                    lokasi={item.lokasi}
                    nama={item.nama}
                  />
                ))}
              </>
            ) : null}
            {isLoading || isFetching ? <SkeletonCardGrid count={3} /> : null}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SearchPage;
