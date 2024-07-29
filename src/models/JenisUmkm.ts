import { Umkm } from "./Umkm";

export interface JenisUmkm {
  jenisUmkmId: number;
  namaJenisUmkm: string;
  _count?: {
    umkm: number;
  };
  umkm?: Umkm[];
}
