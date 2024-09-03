import Footer from "@/components/Footer";
import LoadingPage from "@/components/LoadingPage";
import NavbarUser from "@/components/NavbarUser";
import { IMAGE_PLACEHOLDER } from "@/constant/imagePlaceholder";
import { getDetailUmkm } from "@/services/user/umkm";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdOutlineLocationOn } from "react-icons/md";
import { MetaData } from "../_app";

const DetailUMKMPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ["umkmdetail", id],
    queryFn: () => getDetailUmkm(Number(id)),
    refetchOnWindowFocus: false,
  });

  if (isLoading || isFetching) {
    return <LoadingPage />;
  }

  if (isError) {
    router.push("/umkm");
  }

  return (
    <>
      <NavbarUser />
      <MetaData title={data?.nama || "DiDesa"} description={data?.deskripsi || "Digitalisasi Desa"} />
      {data && (
        <section id="umkm" className="w-full min-h-screen bg-gray-100">
          <div className="w-full h-full py-20 lg:px-32 md:px-20 px-8 gap-2">
            <div className="w-full h-full flex flex-col md:flex-row justify-between gap-4 items-center">
              <div className="w-full h-full flex flex-col gap-2">
                <div className="font-playfair text-black lg:text-6xl md:text-5xl text-4xl">
                  {data?.nama}
                </div>
                <div className="md:w-1/4 w-1/2 h-[2px] bg-primary" />
              </div>
            </div>
            <div className="w-full flex mt-4 flex-col md:flex-row gap-4">
              <div className="w-full lg:w-1/2 xl:w-1/3 flex flex-col gap-4">
                <Image
                  src={data?.gambar || IMAGE_PLACEHOLDER}
                  alt="image"
                  width={800}
                  height={400}
                  className="w-full h-auto object-cover rounded-md"
                />
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <Link
                      href={`https://maps.google.com/?q=${data?.lokasi}`}
                      prefetch={false}
                    >
                      <MdOutlineLocationOn className="text-primary" />
                    </Link>
                    <span className="font-rubik text-gray-500 text-sm font-base">
                      {data?.lokasi}
                    </span>
                  </div>
                  <span className="bg-primary text-white text-2xs px-2 py-1 rounded-full inline-block font-rubik uppercase text-xs">
                    {data?.jenisUmkm?.namaJenisUmkm}
                  </span>
                </div>
              </div>
              <p
                className="w-full lg:w-1/2 xl:w-2/3 font-rubik text-gray-500 text-sm"
                dangerouslySetInnerHTML={{
                  __html: data?.deskripsi.replace(/\n/g, "<br />"),
                }}
              ></p>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
};

export default DetailUMKMPage;
