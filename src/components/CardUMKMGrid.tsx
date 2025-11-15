import { IMAGE_PLACEHOLDER } from "@/constant/imagePlaceholder";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CardUMKMProps {
  umkmId: number;
  deskripsi: string;
  gambar: string;
  jenisUmkm: string;
  lokasi: string;
  nama: string;
}

const CardUMKMGrid = ({
  umkmId,
  deskripsi,
  gambar,
  jenisUmkm,
  lokasi,
  nama,
}: CardUMKMProps) => {
  const [gambarState, setGambarState] = useState<string>(gambar || IMAGE_PLACEHOLDER);
  return (
    <Link href={`/umkm/${umkmId}?umkm=${encodeURIComponent(nama)}`} passHref>
      <div
        className={`w-full h-96 rounded-2xl overflow-hidden shadow-lg flex flex-col bg-white relative group`}
      >
        <div className="h-2/5 overflow-hidden relative">
          <Image
            src={gambarState}
            onError={() => {
              setGambarState(IMAGE_PLACEHOLDER);
            }}
            alt={nama}
            width={500}
            height={500}
            className="group-hover:scale-105 transition-transform duration-300 object-cover rounded-t-2xl w-full h-48"
          />
          <div className="absolute bottom-0 left-0 w-full h-full object-cover rounded-lg transition-all duration-300 bg-black opacity-0 group-hover:scale-110 group-hover:opacity-30"></div>
        </div>
        <div className="p-4 h-3/5 flex flex-col justify-between bg-white">
          <div>
            <div className="md:text-2xl text-xl font-bold font-rubik text-black line-clamp-1">
              {nama}
            </div>
            <div className="bg-primary text-white text-2xs px-2 py-1 rounded-full inline-block mt-2 font-rubik uppercase">
              {jenisUmkm}
            </div>
            <div className="text-xs md:text-sm mt-2 line-clamp-3 font-rubik text-black">
              {deskripsi}
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="md:text-xs text-2xs text-gray-600 font-rubik">
              {lokasi}
            </div>
            <button className="bg-primary text-white text-xs md:px-4 md:py-2 px-2 py-1 rounded-lg font-rubik">
              Detail
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardUMKMGrid;
