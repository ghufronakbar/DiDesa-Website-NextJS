import { getProfile } from "@/services/user/profile";
import { useRouter } from "next/router";
import { useEffect } from "react";

const PengaduanPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      router.push("/pengaduan/form");
    }
  }, [router]);  
};

export default PengaduanPage;
