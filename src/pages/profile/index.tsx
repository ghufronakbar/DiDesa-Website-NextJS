import LoadingPage from "@/components/LoadingPage";
import NavbarUser from "@/components/NavbarUser";
import { PengaduanMasyarakat } from "@/models/PengaduanMasyarakat";
import { Umkm } from "@/models/Umkm";
import { getProfile } from "@/services/user/profile";
import formatDate from "@/utils/format/formatDate";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";

const ProfilePage = () => {
  const router = useRouter();
  const { data, isFetching, isLoading, isError } = useQuery({
    queryKey: ["profile"],
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
        <div className="w-full min-h-screen bg-gray-100 flex flex-col lg:flex-row justify-center items-center lg:items-start px-8 md:px-12 lg:px-20 py-32 text-black gap-4">
          <div className="flex flex-col justify-center items-center border p-8 border-gray-300 rounded-lg lg:w-[40vw] md:max-w-[70vw] w-[90vw] gap-4 overflow-x-hidden h-fit">
            <Image
              width={300}
              height={300}
              alt={data?.data?.namaLengkap}
              src={data?.data?.foto}
              className="rounded-full w-40 h-40"
            />
            <p className="text-gray-500 text-xs -mt-2">{data?.data?.nik}</p>
            <h1 className="text-2xl font-bold line-clamp-2">
              {data?.data?.namaLengkap}
            </h1>
            <table className="w-full">
              <tbody className="border rounded-lg">
                <tr className="border">
                  <th className="text-gray-500 text-sm text-start px-4 py-2">
                    KK
                  </th>
                  <td className="text-gray-500 text-sm text-start px-4 py-2">
                    {data?.data?.kk}
                  </td>
                </tr>
                <tr className="border">
                  <th className="text-gray-500 text-sm text-start px-4 py-2">
                    Tanggal Lahir
                  </th>
                  <td className="text-gray-500 text-sm text-start px-4 py-2">
                    {formatDate(data?.data?.tanggalLahir)}
                  </td>
                </tr>
                <tr className="border">
                  <th className="text-gray-500 text-sm text-start px-4 py-2">
                    No Telepon
                  </th>
                  <td className="text-gray-500 text-sm text-start px-4 py-2">
                    {data?.data?.telepon}
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 mt-2 self-center">
              Ganti Password
            </button>
            <button className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 mt-2 self-center">
              Logout
            </button>
          </div>
          <div className="flex flex-col justify-center items-center border p-8 border-gray-300 rounded-lg lg:w-[60vw] md:max-w-[70vw] w-[90vw] gap-4 overflow-x-hidden">
            <div className="w-full flex flex-col">
              <span className="text-2xl font-bold">UMKM Saya</span>
              <div className="horizontal-scroll">
                <div className="scroll-container">
                  {data?.data?.umkm?.map((item: Umkm) => (
                    <ItemScroll
                      key={item.umkmId}
                      picture={item.gambar}
                      text={item.nama}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col">
              <span className="text-2xl font-bold">Riwayat Pengaduan</span>
              <div className="horizontal-scroll">
                <div className="scroll-container">
                  {data?.data?.pengaduanMasyarakat?.map((item: PengaduanMasyarakat) => (
                    <ItemScroll
                      key={item.pengaduanMasyarakatId}
                      picture={item.foto || "/images/placeholder.svg"}
                      text={item.isi}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ItemScroll = ({ picture, text }: { picture: string; text: string }) => {
  return (
    <div className="w-40 h-40 rounded-lg overflow-hidden relative group flex-shrink-0">
      <Image
        src={picture}
        alt={text}
        width={300}
        height={300}
        className="w-full h-full object-cover rounded-lg transition-all duration-300 group-hover:scale-110"
      />
      <div className="absolute bottom-0 left-0 w-full h-full object-cover rounded-lg transition-all duration-300 bg-black opacity-0 group-hover:scale-110 group-hover:opacity-20"></div>
      <span className="absolute text-white font-bold bottom-2 left-2 line-clamp-1">
        {text}
      </span>
    </div>
  );
};

export default ProfilePage;
