import { Berita } from "@/models/Berita";
import formatDate from "@/utils/format/formatDate";
import Image from "next/image";
import Link from "next/link";
import { LiaCommentSolid } from "react-icons/lia";

const CardBerita = ({ beritaId,gambar,judul,subjudul,tanggal,_count }: Berita) => {
    return (
        <Link href={`/berita/${beritaId}?judul=${encodeURIComponent(judul)}`} passHref>
        <div className={`relative w-[50vw] h-[80vw] sm:w-[30vw] sm:h-[50vw] md:w-[25vw] md:h-[44vw] lg:w-[30vw] lg:h-[40vw] xl:w-[20vw] xl:h-[30vw] rounded-2xl overflow-hidden shadow-lg flex-shrink-0 group my-2`}>
            <Image src={gambar} alt={judul} width={600} height={1200} className="w-full h-full group-hover:scale-105 transition-transform duration-300 rounded-2xl object-cover" />
            <div className="absolute bottom-0 left-0 w-full h-full object-cover rounded-lg transition-all duration-300 bg-black opacity-0 group-hover:scale-110 group-hover:opacity-30"></div>
            <div className="absolute inset-0 flex flex-col items-start justify-end bg-black bg-opacity-25 p-4 rounded-2xl">
                <div className="flex flex-row justify-between w-full items-center gap-2">
                    <div className="text-white font-playfair text-2xl line-clamp-1">{judul}</div>
                </div>
                <div className="text-white line-clamp-1 font-rubik text-xs">{subjudul}</div>
                <div className="flex flex-row justify-between w-full items-center gap-2">
                    <div className="text-white font-rubik text-xs">{formatDate(tanggal)}</div>
                    <div className="text-white font-rubik text-xs flex gap-1 items-center">{_count?.komentar}<LiaCommentSolid /></div>
                </div>
            </div>
        </div>
        </Link>
    );
};

export default CardBerita