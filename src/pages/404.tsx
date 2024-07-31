import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const PageNotFound = () => {
  const router = useRouter();
  const isAdmin = router.asPath.includes("/admin");
  return (
    <div className="flex justify-center items-center min-h-screen flex-col gap-12 px-12 bg-white">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-black">
        DiDesa: Page 404 - Not Found
      </h1>
      <Image src="/images/404.png" width={500} height={500} alt="404 image" />
      <p className="mt-4 text-black">
        Return to
        <Link href={isAdmin ? "/admin/dashboard" : "/"}>
          <span className="text-blue-500 cursor-pointer text-center ">
            {isAdmin ? " Admin Dashboard" : " Home"}
          </span>
        </Link>
      </p>
    </div>
  );
};

export default PageNotFound;
