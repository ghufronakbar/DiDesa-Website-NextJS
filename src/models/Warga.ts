import { PengaduanMasyarakat } from "./PengaduanMasyarakat";
import { Umkm } from "./Umkm";

export interface Warga {
  wargaId: number;
  nik: string;
  kk: string;
  namaLengkap: string;
  tanggalLahir: string;
  telepon: string;
  foto: string;
  umkm?: Umkm[];
  pengaduanMasyarakat?: PengaduanMasyarakat[];
  isPicDeletable: boolean;
}
