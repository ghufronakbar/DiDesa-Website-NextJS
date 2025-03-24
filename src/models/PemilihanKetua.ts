import { CalonKetua } from "./CalonKetua";

export type PemilihanKetuaStatus =
  | "Belum Dimulai"
  | "Sedang Berlangsung"
  | "Selesai";

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
  status: PemilihanKetuaStatus;
  rw: string;
  isVoted?: boolean;
  isVoteable?: boolean;
}
