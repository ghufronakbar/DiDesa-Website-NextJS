import { useToast } from "@/components/Toast";
import { IMAGE_PLACEHOLDER } from "@/constant/imagePlaceholder";
import { ApiError } from "@/models/ApiError";
import { createPengaduan } from "@/services/user/pengaduan";
import Image from "next/image";
import { useState } from "react";
import { BiSolidTrash } from "react-icons/bi";

interface FormPengaduan {
  subjek: string;
  isi: string;
  image?: File;
}

const PengaduanSection = () => {
  const [formPengaduan, setFormPengaduan] = useState<FormPengaduan>({
    subjek: "",
    isi: "",
    image: undefined,
  });
  const { showToast } = useToast();

  const handlePickImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement)?.files?.[0];
      if (file) {
        setFormPengaduan({ ...formPengaduan, image: file });
      }
    };
    input.click();
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formPengaduan.subjek === "" || formPengaduan.isi === "") {
      return showToast("Subjek dan Isi wajib diisi", "error");
    }
    try {
      const response = await createPengaduan(
        formPengaduan.subjek,
        formPengaduan.isi,
        formPengaduan.image
      );
      showToast(response.message || "Berhasil mengirim pengaduan", "info");
      setFormPengaduan({
        subjek: "",
        isi: "",
        image: undefined,
      });
    } catch (error) {
      console.log(error);
      const apiError = error as ApiError;
      showToast(
        apiError.response?.data?.message || "Terjadi kesalahan",
        "error"
      );
    }
  };
  return (
    <>
      <section id="pemilihan" className="w-full pt-16 pb-40 bg-gray-100">
        <div className="w-full h-full lg:px-32 md:px-20 px-8 gap-2">
          <div className="w-full h-full flex flex-col md:flex-row justify-between gap-4">
            <div className="w-full h-full flex flex-col gap-2">
              <div className="font-playfair text-black lg:text-6xl md:text-5xl text-4xl">
                Pengaduan Masyarakat
              </div>
              <div className="md:w-1/4 w-1/2 h-[2px] bg-primary" />
              <span className="font-rubik text-gray-500 text-sm md:text-base ">
                Beri aspirasi / kritik & saran-mu untuk kami disini
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
                  formPengaduan.image
                    ? URL.createObjectURL(formPengaduan.image)
                    : IMAGE_PLACEHOLDER
                }
                alt="wallpaper"
                width={800}
                height={800}
                className="w-full h-full object-cover rounded-md group-hover:scale-110 duration-300 cursor-pointer"
              />
              <div className="absolute top-0 left-0 w-full h-full text-white bg-black opacity-0 bg-opacity-0 group-hover:bg-opacity-50 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center items-center font-semibold cursor-pointer">
                {formPengaduan.image ? "Ubah " : "Unggah "}Gambar
              </div>
            </div>
            <div className="w-full flex flex-row justify-between mt-2">
              <span className="font-rubik text-gray-500 text-sm">
                {formPengaduan.image
                  ? "*Klik untuk ubah gambar"
                  : "*Klik untuk unggah gambar (opsional)"}
              </span>
              {formPengaduan.image && (
                <button
                  className="w-fit h-fit bg-secondary text-white px-4 py-2 rounded-md hover:bg-primary flex flex-row items-center gap-2 text-xs transition-all duration-300"
                  onClick={() =>
                    setFormPengaduan({ ...formPengaduan, image: undefined })
                  }
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
                Formulir Pengaduan
              </h2>
              <div className="font-rubik text-black text-base">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-rubik text-black">Subjek</label>
                    <input
                      type="text"
                      value={formPengaduan?.subjek}
                      placeholder="Subjek Pengaduan"
                      onChange={(e) =>
                        setFormPengaduan({
                          ...formPengaduan,
                          subjek: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-rubik text-black">Isi</label>
                    <textarea
                      value={formPengaduan?.isi}
                      placeholder="Isi Pengaduan"
                      onChange={(e) =>
                        setFormPengaduan({
                          ...formPengaduan,
                          isi: e.target.value,
                        })
                      }
                      rows={5}
                      className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                  </div>
                </div>
              </div>
              <button
                className="w-fit h-fit bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-all duration-300 self-center md:self-end"
                onClick={(e) => handleSend(e)}
              >
                Kirim
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default PengaduanSection;
