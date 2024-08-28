import CardBerita from "@/components/CardBerita";
import CardUMKM from "@/components/CardUMKM";
import ErrorCard from "@/components/ErrorCard";
import Footer from "@/components/Footer";
import NavbarLanding from "@/components/NavbarLanding";
import SkeletonCardBerita from "@/components/SkeletonCardBerita";
import SkeletonCardUMKM from "@/components/SkeletonCardUMKM";
import SkeletonPemilihan from "@/components/SkeletonPemilihan";
import { Berita } from "@/models/Berita";
import { Umkm } from "@/models/Umkm";
import HeroLandingPage from "@/sections/HeroLandingPage";
import {
  getBeritaPopuler,
  getLatestPemilihan,
  getUmkm,
} from "@/services/user/landingPage";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineNavigateNext } from "react-icons/md";

const BeritaPopuler = () => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["berita?q=populer"],
    queryFn: () => getBeritaPopuler(20),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  });
  return (
    <>
      <section id="berita" className="w-full bg-gray-100">
        <div className="w-full h-full pt-32 lg:px-32 md:px-20 px-8 gap-2">
          <div className="w-full h-full flex flex-col md:flex-row justify-between gap-4">
            <div className="w-full h-full flex flex-col gap-2">
              <div className="font-playfair text-black lg:text-6xl md:text-5xl text-4xl">
                Berita Populer
              </div>
              <div className="md:w-1/4 w-1/2 h-[2px] bg-primary" />
              <div className="font-rubik text-gray-500 text-sm md:text-base ">
                Dapatkan berita terkini dan informasi penting langsung dari
                sumber terpercaya di desa.
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4">
                <div className="w-fit h-fit p-2 rounded-lg focus:outline-none bg-secondary text-white hover:bg-primary transition-colors duration-300">
                  <MdOutlineNavigateNext className="w-6 h-6 rotate-180" />
                </div>
                <div className="w-fit h-fit p-2 rounded-lg focus:outline-none bg-primary text-white hover:bg-secondary transition-colors duration-300">
                  <MdOutlineNavigateNext className="w-6 h-6" />
                </div>
              </div>
              <Link className="font-rubik text-gray-500" href={"/berita"}>
                Lihat Semua
              </Link>
            </div>
          </div>
        </div>
        <div className="horizontal-scroll mt-4">
          <div className="scroll-container lg:px-28 md:px-20 px-8">
            {isLoading || isFetching ? (
              <SkeletonCardBerita count={15} />
            ) : isError ? (
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
          </div>
        </div>
      </section>
    </>
  );
};

const UMKM = () => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["umkm", 20],
    queryFn: () => getUmkm(20),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  });
  return (
    <>
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
                <div className="w-fit h-fit p-2 rounded-lg focus:outline-none bg-secondary text-white hover:bg-primary transition-colors duration-300">
                  <MdOutlineNavigateNext className="w-6 h-6 rotate-180" />
                </div>
                <div className="w-fit h-fit p-2 rounded-lg focus:outline-none bg-primary text-white hover:bg-secondary transition-colors duration-300">
                  <MdOutlineNavigateNext className="w-6 h-6" />
                </div>
              </div>
              <Link className="font-rubik text-gray-500" href={"/umkm"}>
                Lihat Semua
              </Link>
            </div>
          </div>
        </div>
        {/* CONTAINER CARD */}
        <div className="horizontal-scroll mt-4">
          <div className="scroll-container lg:px-28 md:px-20 px-8">
            {isLoading || isFetching ? (
              <SkeletonCardUMKM count={15} />
            ) : isError ? (
              <ErrorCard count={15} />
            ) : (
              data &&
              data.data.map((item: Umkm, index: number) => (
                <CardUMKM
                  umkmId={item.umkmId}
                  gambar={item.gambar}
                  nama={item.nama}
                  lokasi={item.lokasi}
                  jenisUmkm={item.jenisUmkm.namaJenisUmkm}
                  deskripsi={item.deskripsi}
                  key={index}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

const Pemilihan = () => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["pemilihan/latest"],
    queryFn: () => getLatestPemilihan(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  });
  return (
    <>
      {isLoading || isFetching ? (
        <SkeletonPemilihan />
      ) : isError ? null : data && data.data ? (
        <section id="pemilihan" className="w-full pt-16 pb-40 bg-gray-100">
          <div className="w-full h-full lg:px-32 md:px-20 px-8 gap-2">
            <div className="w-full h-full flex flex-col md:flex-row justify-between gap-4">
              <div className="w-full h-full flex flex-col gap-2">
                <div className="font-playfair text-black lg:text-6xl md:text-5xl text-4xl">
                  Pemilihan Kepala Desa
                </div>
                <div className="md:w-1/4 w-1/2 h-[2px] bg-primary" />
                <div className="font-rubik text-gray-500 text-sm md:text-base ">
                  Ikuti pemilihan kepala desa dengan mudah dan aman melalui
                  sistem voting online yang transparan dan terjamin.
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-full mt-8 flex md:flex-row flex-col lg:px-32 md:px-20 px-8 gap-8">
            <div className="w-full h-full">
              <Image
                src={"/images/pemilihan.jpg"}
                alt="wallpaper"
                width={500}
                height={500}
                className="object-cover rounded-lg self-center mx-auto w-full"
              />
            </div>
            <div className="w-full h-full my-auto">
              <div className="w-full flex flex-col gap-4">
                <div className="font-playfair text-black lg:text-4xl md:text-3xl text-2xl">
                  {data.data.judul}
                </div>
                <div className="font-rubik text-black text-base">
                  {data.data.deskripsi}
                </div>
                <Link href={"/pemilihan"} passHref>
                  <div className="font-rubik text-primary text-sm md:text-base">
                    Lihat Selengkapnya &rarr;
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};


const DiDesa = () => {
  return (
    <>
      <main>
        <NavbarLanding />
        <HeroLandingPage />
        <BeritaPopuler />
        <UMKM />
        <Pemilihan />
        <Footer />
      </main>
    </>
  );
};

export default DiDesa;
