import Image from "next/image";
import Link from "next/link";

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
  return (
    <Link href={`/umkm/${umkmId}?umkm=${encodeURIComponent(nama)}`} passHref>
      <div
        className={`w-full h-96 rounded-2xl overflow-hidden shadow-lg flex flex-col bg-white hover:scale-105 transition-transform duration-300`}
      >
        <div className="h-2/5">
          <Image
            src={gambar}
            alt={nama}
            width={500}
            height={500}            
            className="object-cover rounded-t-2xl w-full h-48"
          />
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
