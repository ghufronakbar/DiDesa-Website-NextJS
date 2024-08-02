import { Komentar } from "./Komentar";

export interface Berita {
  beritaId: number;
  judul: string;
  subjudul: string;
  tanggal: string;
  isi: string;
  gambar: string;
  publikasi: boolean;
  prioritas: boolean;
  _count?: {
    komentar: number;
  };
  komentar?: Komentar[];
}
