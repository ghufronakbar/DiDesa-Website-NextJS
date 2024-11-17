export interface InformasiDesa {
  informasiDesaId: number;
  namaDesa: string;
  deskripsi: string;
  luasWilayah: number;
  lahanPertanian: number;
  lahanPeternakan: number;
}

export const initInformasiDesa: InformasiDesa = {
  informasiDesaId: 0,
  namaDesa: "",
  deskripsi: "",
  luasWilayah: 0,
  lahanPertanian: 0,
  lahanPeternakan: 0,
};