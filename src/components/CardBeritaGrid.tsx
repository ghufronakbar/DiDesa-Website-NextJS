import { Berita } from "@/models/Berita";
import formatDate from "@/utils/format/formatDate";
import Image from "next/image";
import Link from "next/link";
import { LiaCommentSolid } from "react-icons/lia";

const CardBeritaGrid = ({ beritaId,gambar,judul,subjudul,tanggal,_count }: Berita) => {
    return (
        <Link href={`/berita/${beritaId}?judul=${encodeURIComponent(judul)}`}>
        <div className={`relative w-full h-96 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 hover:scale-105 transition-transform duration-300`}>
            <Image src={gambar} alt={judul} layout="fill" objectFit="cover" className="rounded-2xl" />
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

export default CardBeritaGrid