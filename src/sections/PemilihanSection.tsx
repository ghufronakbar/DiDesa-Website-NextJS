import { getLatestPemilihan } from "@/services/user/landingPage";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

const PemilihanSection = () => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["pemilihan/latest"],
    queryFn: () => getLatestPemilihan(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  });

  if (isLoading || isFetching) {
    return null;
  }

  return (
    <>
      {isError ? null : data && data.data ? (
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
                <div
                  className="font-rubik text-black text-base"
                  dangerouslySetInnerHTML={{
                    __html: data?.data?.deskripsi.replace(/\n/g, "<br />"),
                  }}
                ></div>
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

export default PemilihanSection;
