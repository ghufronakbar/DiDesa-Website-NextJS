import { Warga } from "./Warga";

export interface PengurusDesa {
    pengurusDesaAnggotaId: number;
    wargaId: number;
    jabatan: string;
    aksesAdmin: boolean;
    warga: Warga;
}