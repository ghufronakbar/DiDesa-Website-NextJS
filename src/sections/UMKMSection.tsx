import CardUMKM from "@/components/CardUMKM";
import ErrorCard from "@/components/ErrorCard";
import SkeletonCardUMKM from "@/components/SkeletonCardUMKM";
import { Umkm } from "@/models/Umkm";
import { getUmkm } from "@/services/user/landingPage";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRef } from "react";
import { MdOutlineNavigateNext } from "react-icons/md";

const UMKMSection = () => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["umkm", 20],
    queryFn: () => getUmkm(20),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="umkm" className="w-full bg-gray-100">
      <div className="w-full h-full pt-16 lg:px-32 md:px-20 px-8 gap-2">
        <div className="w-full h-full flex flex-col md:flex-row-reverse justify-between gap-4">
          <div className="w-full h-full flex flex-col gap-2 self-end text-end ">
            <div className="font-playfair text-black lg:text-6xl md:text-5xl text-4xl ">
              UMKM
            </div>
            <div className="md:w-1/4 w-1/2 h-[2px] bg-primary self-end" />
            <div className="font-rubik text-gray-500 text-sm md:text-base ">
              Dukung dan kembangkan usaha kecil dan menengah dengan platform
              pemasaran digital yang efektif.
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4">
              <button
                onClick={scrollPrev}
                className="w-fit h-fit p-2 rounded-lg focus:outline-none bg-secondary text-white hover:bg-primary transition-colors duration-300"
              >
                <MdOutlineNavigateNext className="w-6 h-6 rotate-180" />
              </button>
              <button
                onClick={scrollNext}
                className="w-fit h-fit p-2 rounded-lg focus:outline-none bg-primary text-white hover:bg-secondary transition-colors duration-300"
              >
                <MdOutlineNavigateNext className="w-6 h-6" />
              </button>
            </div>
            <Link className="font-rubik text-gray-500" href={"/umkm"}>
              Lihat Semua
            </Link>
          </div>
        </div>
      </div>
      {/* CONTAINER CARD */}
      <div className="horizontal-scroll mt-4 overflow-x-scroll" ref={scrollRef}>
        <div className="scroll-container lg:px-28 md:px-20 px-8 flex space-x-4">
          {isLoading || isFetching ? (
            <SkeletonCardUMKM count={15} />
          ) : isError ? (
            <ErrorCard count={15} />
          ) : (
            data &&
            data.data.map((item: Umkm, index: number) => (
              <>
                <CardUMKM
                  umkmId={item.umkmId}
                  gambar={item.gambar}
                  nama={item.nama}
                  lokasi={item.lokasi}
                  jenisUmkm={item.jenisUmkm.namaJenisUmkm}
                  deskripsi={item.deskripsi}
                  key={index}
                />
                {data.data.length - 1 === index && (
                  <div className="w-1 text-transparent flex-shrink-0" />
                )}
              </>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default UMKMSection;
