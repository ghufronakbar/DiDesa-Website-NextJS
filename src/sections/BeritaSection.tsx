import CardBerita from "@/components/CardBerita";
import ErrorCard from "@/components/ErrorCard";
import SkeletonCardBerita from "@/components/SkeletonCardBerita";
import { Berita } from "@/models/Berita";
import { getBeritaPopuler, getUmkm } from "@/services/user/landingPage";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRef } from "react";
import { MdOutlineNavigateNext } from "react-icons/md";

const BeritaSection = () => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["berita?q=populer"],
    queryFn: () => getBeritaPopuler(20),
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
    <section id="berita" className="w-full bg-gray-100">
      <div className="w-full h-full pt-32 lg:px-32 md:px-20 px-8 gap-2 py-20">
        <div className="w-full h-full flex flex-col md:flex-row justify-between gap-4">
          <div className="w-full h-full flex flex-col gap-2">
            <div className="font-playfair text-black lg:text-6xl md:text-5xl text-4xl">
              Berita Populer
            </div>
            <div className="md:w-1/4 w-1/2 h-[2px] bg-primary" />
            <div className="font-rubik text-gray-500 text-sm md:text-base ">
              Dapatkan berita terkini dan informasi penting langsung dari sumber
              terpercaya di desa.
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
            <Link className="font-rubik text-gray-500" href={"/berita"}>
              Lihat Semua
            </Link>
          </div>
        </div>
      </div>
      <div className="horizontal-scroll mt-4 overflow-x-scroll" ref={scrollRef}>
        <div className="scroll-container lg:px-28 md:px-20 px-8 flex space-x-4">
          {isLoading || isFetching ? (
            <SkeletonCardBerita count={15} />
          ) : isError ? (
            <ErrorCard count={15} />
          ) : (
            data &&
            data.data.map((item: Berita, index: number) => (
              <>
                <CardBerita
                  beritaId={item.beritaId}
                  gambar={item.gambar}
                  judul={item.judul}
                  subjudul={item.subjudul}
                  tanggal={item.tanggal}
                  isi={item.isi}
                  publikasi={item.publikasi}
                  prioritas={item.prioritas}
                  key={item.beritaId}
                  _count={item._count}
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
export default BeritaSection;
