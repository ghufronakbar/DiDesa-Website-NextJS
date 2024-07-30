import { Warga } from "./Warga";

export interface CalonKetua {
  calonKetuaId: number;
  pemilihanKetuaId: number;
  wargaId: number;
  deskripsi: string;
  _count: {
    vote: number;
  };
  warga: Warga;
  rank: number;
}
