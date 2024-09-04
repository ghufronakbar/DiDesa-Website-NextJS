import Footer from "@/components/Footer";
import LoadingPage from "@/components/LoadingPage";
import NavbarUser from "@/components/NavbarUser";
import { IMAGE_PLACEHOLDER } from "@/constant/imagePlaceholder";
import { PengaduanMasyarakat } from "@/models/PengaduanMasyarakat";
import { Umkm } from "@/models/Umkm";
import { getProfile, logoutUser } from "@/services/user/profile";
import formatDate from "@/utils/format/formatDate";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoMdAdd } from "react-icons/io";

const ProfilePage = () => {
  const router = useRouter();
  const { data, isFetching, isLoading, isError } = useQuery({
    queryKey: ["profileDetail"],
    queryFn: () => getProfile(),
    refetchOnWindowFocus: false,
  });

  if (isLoading || isFetching) {
    return <LoadingPage />;
  }

  if (isError || data?.status !== 200) {
    router.push("/login");
  }

  return (
    <>
      <NavbarUser />
      {data && (
        <div className="w-full h-full bg-gray-100 flex flex-col lg:flex-row justify-center items-center lg:items-stretch px-8 md:px-12 lg:px-20 py-32 text-black gap-4">
          <div className="flex flex-col justify-center items-center border p-8 border-gray-300 rounded-lg lg:w-[40vw] md:max-w-[70vw] w-[90vw] gap-4 overflow-x-hidden ">
            <Image
              width={300}
              height={300}
              alt={data?.data?.namaLengkap}
              src={data?.data?.foto}
              className="rounded-full w-40 h-40"
            />
            <p className="text-gray-500 text-xs -mt-2">{data?.data?.nik}</p>
            <h1 className="text-xl xl:text-2xl font-bold line-clamp-2">
              {data?.data?.namaLengkap}
            </h1>
            <table className="w-full">
              <tbody className="border rounded-lg">
                <tr className="border">
                  <th className="text-gray-500 text-xs md:text-sm lg:text-xs xl:text-sm text-start px-4 py-2">
                    KK
                  </th>
                  <td className="text-gray-500 text-xs md:text-sm lg:text-xs xl:text-sm text-start px-4 py-2">
                    {data?.data?.kk}
                  </td>
                </tr>
                <tr className="border">
                  <th className="text-gray-500 text-xs md:text-sm lg:text-xs xl:text-sm text-start px-4 py-2">
                    Tanggal Lahir
                  </th>
                  <td className="text-gray-500 text-xs md:text-sm lg:text-xs xl:text-sm text-start px-4 py-2">
                    {formatDate(data?.data?.tanggalLahir)}
                  </td>
                </tr>
                <tr className="border">
                  <th className="text-gray-500 text-xs md:text-sm lg:text-xs xl:text-sm text-start px-4 py-2">
                    No Telepon
                  </th>
                  <td className="text-gray-500 text-xs md:text-sm lg:text-xs xl:text-sm text-start px-4 py-2">
                    +{data?.data?.telepon}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex flex-col sm:flex-row gap-0 sm:gap-2">
            <button className="text-xs sm:text-sm bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 mt-2">
              Ganti Password
            </button>
            <button
              className="text-xs sm:text-sm bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 mt-2"
              onClick={() => {
                logoutUser();
              }}
            >
              Logout
            </button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center border p-8 border-gray-300 rounded-lg lg:w-[60vw] md:max-w-[70vw] w-[90vw] gap-4 overflow-x-hidden">
            <div className="w-full flex flex-col">
              <div className="flex flex-col gap-2 md:gap-0 md:flex-row justify-between md:items-center">
                <span className="text-lg sm:text-xl xl:text-2xl font-bold">UMKM Saya</span>
                <Link
                  className="w-fit h-fit flex flex-row gap-1 sm:gap-2 text-sm items-center bg-primary hover:bg-secondary text-white font-bold p-1 sm:p-2 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
                  href="/umkm/form"
                >
                  <IoMdAdd className="text-white w-2 h-2 sm:w-4 sm:h-4" />
                  <span className="text-2xs sm:text-xs">Daftarkan UMKM</span>
                </Link>
              </div>
              <div className="horizontal-scroll">
                <div className="scroll-container">
                  {data?.data?.umkm?.length === 0 && (
                    <span className="text-gray-500 text-sm">
                      Belum ada umkm yang terdaftar
                    </span>
                  )}
                  {data?.data?.umkm?.map((item: Umkm) => (
                    <ItemScroll
                      type={"umkm"}
                      id={item.umkmId}
                      key={item.umkmId}
                      picture={item.gambar}
                      text={item.nama}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col">
              <div className="flex flex-col gap-2 md:gap-0 md:flex-row justify-between md:items-center">
                <span className="text-lg sm:text-xl xl:text-2xl font-bold">Riwayat Pengaduan</span>
                <Link
                  className="w-fit h-fit flex flex-row gap-1 sm:gap-2 text-sm items-center bg-primary hover:bg-secondary text-white font-bold p-1 sm:p-2 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
                  href="/pengaduan/form"
                >
                  <IoMdAdd className="text-white w-2 h-2 sm:w-4 sm:h-4" />
                  <span className="text-2xs sm:text-xs">Buat Pengaduan</span>
                </Link>
              </div>

              <div className="horizontal-scroll">
                <div className="scroll-container">
                  {data?.data?.pengaduanMasyarakat?.length === 0 && (
                    <span className="text-gray-500 text-sm">
                      Belum ada riwayat pengaduan
                    </span>
                  )}
                  {data?.data?.pengaduanMasyarakat?.map(
                    (item: PengaduanMasyarakat) => (
                      <ItemScroll
                        key={item.pengaduanMasyarakatId}
                        type={"pengaduan"}
                        id={item.pengaduanMasyarakatId}
                        picture={item.foto || IMAGE_PLACEHOLDER}
                        text={item.isi}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

const ItemScroll = ({
  picture,
  text,
  type,
  id,
}: {
  picture: string;
  text: string;
  type: string;
  id: number;
}) => {
  return (
    <Link
      className="w-40 h-40 rounded-lg overflow-hidden relative group flex-shrink-0"
      href={`/${type}/${id}?name=${text}`}
      prefetch={false}
    >
      <Image
        src={picture}
        alt={text}
        width={300}
        height={300}
        className="w-full h-full object-cover rounded-lg transition-all duration-300 group-hover:scale-110"
      />
      <div className="absolute bottom-0 left-0 w-full h-full object-cover rounded-lg transition-all duration-300 bg-black opacity-30 group-hover:scale-110 group-hover:opacity-60"></div>
      <span className="absolute text-white font-bold bottom-2 left-2 line-clamp-1">
        {text}
      </span>
    </Link>
  );
};

export default ProfilePage;
