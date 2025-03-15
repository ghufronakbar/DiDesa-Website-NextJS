import { JenisUmkm } from "./JenisUmkm";
import { Warga } from "./Warga";

export interface Umkm {
  umkmId: number;
  nama: string;
  jenisUmkmId: number;
  deskripsi: string;
  gambar: string;
  lokasi: string;
  approve: boolean;
  status: boolean;
  wargaId: number;
  jenisUmkm: JenisUmkm;
  warga: Warga;
  isEditable?: boolean;
  urlMap: string;
  latitude: number;
  longitude: number;
}
