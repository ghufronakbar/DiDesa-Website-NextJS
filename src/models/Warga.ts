import { PengaduanMasyarakat } from "./PengaduanMasyarakat";
import { Umkm } from "./Umkm";

export interface Warga {
  wargaId: number;
  nik: string;
  kk: string | null;
  rw: string;
  namaLengkap: string;
  tanggalLahir: string;
  telepon: string;
  foto: string;
  umkm?: Umkm[];
  pengaduanMasyarakat?: PengaduanMasyarakat[];
  isPicDeletable: boolean;
}
