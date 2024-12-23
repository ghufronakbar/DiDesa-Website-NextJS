import Footer from "@/components/Footer";
import LoadingPage from "@/components/LoadingPage";
import NavbarUser from "@/components/NavbarUser";
import { useToast } from "@/components/Toast";
import { IMAGE_PLACEHOLDER } from "@/constant/imagePlaceholder";
import { ApiError } from "@/models/Response";
import { JenisUmkm } from "@/models/JenisUmkm";
import { getProfile } from "@/services/user/profile";
import { createUmkm, getJenisUmkm } from "@/services/user/umkm";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiSolidTrash } from "react-icons/bi";

interface FormUmkm {
  nama: string;
  deskripsi: string;
  lokasi: string;
  jenisUmkmId: number;
  image?: File;
}

const FormUmkmPage = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
  const [formUmkm, setFormUmkm] = useState<FormUmkm>({
    nama: "",
    deskripsi: "",
    lokasi: "",
    jenisUmkmId: 0,
    image: undefined,
  });
  const { showToast } = useToast();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["umkm/jenis"],
    queryFn: () => getJenisUmkm(),
    refetchOnWindowFocus: false,
    staleTime: 100000 * 60 * 60,
    placeholderData: keepPreviousData,
  });

  const handlePickImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement)?.files?.[0];
      if (file) {
        setFormUmkm({ ...formUmkm, image: file });
      }
    };
    input.click();
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formUmkm.nama === "" ||
      formUmkm.deskripsi === "" ||
      formUmkm.lokasi === "" ||
      formUmkm.jenisUmkmId === 0 ||
      formUmkm.image === undefined
    ) {
      return showToast("Semua data wajib diisi", "error");
    }
    showToast("Mendaftarkan UMKM...", "info");
    setIsPending(true);
    try {
      const response = await createUmkm(
        formUmkm.nama,
        formUmkm.deskripsi,
        formUmkm.lokasi,
        formUmkm.jenisUmkmId,
        formUmkm.image
      );
      showToast(response.message || "Berhasil mendaftarkan UMKM", "success");
      setFormUmkm({
        nama: "",
        deskripsi: "",
        lokasi: "",
        jenisUmkmId: 0,
        image: undefined,
      });
      router.push("/profile");
    } catch (error) {
      console.log(error);
      const apiError = error as ApiError;
      showToast(
        apiError.response?.data?.message || "Terjadi kesalahan",
        "error"
      );
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    const fetchProfileFirst = async () => {
      try {
        const response = await getProfile();
        setLoadingProfile(false);
      } catch (error) {
        showToast("Silahkan login terlebih dahulu", "error");
        router.push("/login");
      }
    };
    if (router.isReady) {
      fetchProfileFirst();
    }
    return () => {};
  }, [router, showToast]);

  if (loadingProfile) {
    return <LoadingPage />;
  }

  return (
    <>
      <NavbarUser />
      <section id="form-umkm" className={"w-full pt-16 pb-40 bg-gray-100 mt-7"}>
        <div className="w-full h-full lg:px-32 md:px-20 px-8 gap-2">
          <div className="w-full h-full flex flex-col md:flex-row justify-between gap-4">
            <div className="w-full h-full flex flex-col gap-2">
              <div className="font-playfair text-black lg:text-6xl md:text-5xl text-4xl">
                Pendaftaran UMKM
              </div>
              <div className="md:w-1/4 w-1/2 h-[2px] bg-primary" />
              <span className="font-rubik text-gray-500 text-sm md:text-base ">
                Daftarkan UMKM-mu disini agar dapat dilihat oleh pengguna lain
              </span>
            </div>
          </div>
        </div>

        <div className="w-full h-full mt-8 flex md:flex-row flex-col lg:px-32 md:px-20 px-8 gap-8">
          <div className="w-full h-full">
            <div
              className="object-cover rounded-lg self-center mx-auto w-full overflow-hidden h-[400px] border-2 relative group"
              onClick={handlePickImage}
            >
              <Image
                src={
                  formUmkm.image
                    ? URL.createObjectURL(formUmkm.image)
                    : IMAGE_PLACEHOLDER
                }
                alt="wallpaper"
                width={800}
                height={800}
                className="w-full h-full object-cover rounded-md group-hover:scale-110 duration-300 cursor-pointer"
              />
              <div className="absolute top-0 left-0 w-full h-full text-white bg-black opacity-0 bg-opacity-0 group-hover:bg-opacity-50 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center items-center font-semibold cursor-pointer">
                {formUmkm.image ? "Ubah " : "Unggah "}Gambar
              </div>
            </div>
            <div className="w-full flex flex-row justify-between mt-2">
              <span className="font-rubik text-gray-500 text-sm">
                {formUmkm.image
                  ? "*Klik untuk ubah gambar"
                  : "*Klik untuk unggah gambar"}
              </span>
              {formUmkm.image && (
                <button
                  className="w-fit h-fit bg-secondary text-white px-4 py-2 rounded-md hover:bg-primary flex flex-row items-center gap-2 text-xs transition-all duration-300"
                  onClick={() => setFormUmkm({ ...formUmkm, image: undefined })}
                >
                  <BiSolidTrash className="w-4 h-4 cursor-pointer" />
                  <span className="hidden md:block">Hapus Gambar</span>
                </button>
              )}
            </div>
          </div>
          <form className="w-full h-full" onSubmit={(e) => handleSend(e)}>
            <div className="w-full flex flex-col gap-4">
              <h2 className="font-playfair text-black lg:text-4xl md:text-3xl text-2xl">
                Formulir Pendaftaran UMKM
              </h2>
              <div className="font-rubik text-black text-base">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-rubik text-black">Nama</label>
                    <input
                      type="text"
                      value={formUmkm?.nama}
                      placeholder="Nama UMKM"
                      onChange={(e) =>
                        setFormUmkm({
                          ...formUmkm,
                          nama: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-rubik text-black">Deskripsi</label>
                    <textarea
                      value={formUmkm?.deskripsi}
                      placeholder="Deskripsi UMKM"
                      onChange={(e) =>
                        setFormUmkm({
                          ...formUmkm,
                          deskripsi: e.target.value,
                        })
                      }
                      rows={5}
                      className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-rubik text-black">Lokasi</label>
                    <input
                      type="text"
                      value={formUmkm?.lokasi}
                      placeholder="Lokasi UMKM"
                      onChange={(e) =>
                        setFormUmkm({
                          ...formUmkm,
                          lokasi: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <select
                      className="w-full self-end  h-10 px-4 !rounded-lg focus:outline-none bg-white text-black font-rubik placeholder:text-gray-500 border-primary border"
                      onChange={(e) => {
                        setFormUmkm({
                          ...formUmkm,
                          jenisUmkmId: Number(e.target.value),
                        });
                      }}
                    >
                      <option value={0}>
                        {isLoading || isFetching ? "Loading..." : "Pilih Jenis"}
                      </option>
                      {data?.data.map((item: JenisUmkm) => (
                        <option key={item.jenisUmkmId} value={item.jenisUmkmId}>
                          {item.namaJenisUmkm}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <button
                className="w-fit h-fit bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-all duration-300 self-center md:self-end"
                onClick={(e) => handleSend(e)}
                disabled={isPending}
              >
                {isPending ? "Loading..." : "Kirim"}
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default FormUmkmPage;
