import { COOKIES_KEY } from "@/constant/keyStore";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const LogoutAdmin = () => {
  const router = useRouter();
  router.push("/admin/login");
  Cookies.remove(COOKIES_KEY);
};

export { LogoutAdmin };
