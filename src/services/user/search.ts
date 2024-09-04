import { getBerita } from "./berita";
import { getUmkm } from "./umkm";

const fetchSearch = async (search: string) => {
  const berita = await getBerita(100, search);
  const umkm = await getUmkm(100, 0, search);
  return { berita, umkm };
};

export { fetchSearch };
