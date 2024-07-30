import { Warga } from "./Warga";

export interface PengaduanMasyarakat {
  pengaduanMasyarakatId: number;
  wargaId: number;
  subjek: string;
  isi: string;
  foto: string | null;
  tanggal: string;
  warga: Warga;
}
