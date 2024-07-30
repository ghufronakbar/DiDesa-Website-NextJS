import { Berita } from "./Berita";
import { Warga } from "./Warga";

export interface Komentar {
    komentarId: number;
    wargaId: number;
    isi: string;
    tanggal: string;
    beritaId: number;
    warga: Warga;
    berita: Berita;
}