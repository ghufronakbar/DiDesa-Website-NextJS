import { CalonKetua } from "./CalonKetua";

export interface PemilihanKetua {
  pemilihanKetuaId: number;
  tanggalMulai: string;
  tanggalSelesai: string;
  judul: string;
  deskripsi: string;
  _count: {
    calonKetua: number;
  };
  calonKetua: CalonKetua[];
  status: "Belum Dimulai" | "Sedang Berlangsung" | "Selesai";
  isVoted?: boolean;
  isVoteable?: boolean;
}
