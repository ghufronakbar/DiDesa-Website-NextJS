import { CalonKetua } from "./CalonKetua";

export interface PemilihanKetua {
  pemilihanKetuaId: number;
  tanggalMulai: string;
  tanggalSelesai: string;
  judul: string;
  deskripsi: string;
  status: "Belum Dimulai" | "Sedang Berlangsung" | "Selesai";
  _count: {
    calonKetua: number;
  };
  calonKetua: CalonKetua[];
}
