import { PROFILE_PLACEHOLDER } from "@/constant/imagePlaceholder";
import { getProfile } from "@/services/user/profile";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

const ProfileButton = () => {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["user"],
    queryFn: () => getProfile(),
  });

  if (isLoading || isFetching) {
    return (
      <>
        <Image
          src={PROFILE_PLACEHOLDER}
          alt="profile"
          width={40}
          height={40}
          className="object-cover rounded-full w-8 h-8 hidden md:block"
        />
        <div className="block md:hidden text-black hover:text-primary font-rubik transition-colors duration-300 p-4">
          Login
        </div>
      </>
    );
  }
  return (
    <Link href={!data || error ? "/login" : "/profile"}>
      {data && !error ? (
        <>
          <Image
            src={data?.data?.foto ?? PROFILE_PLACEHOLDER}
            alt="profile"
            width={30}
            height={30}
            className="object-cover rounded-full w-8 h-8 hidden md:block"
          />
          <div className="block md:hidden text-black hover:text-primary font-rubik transition-colors duration-300 p-4">
            Profile
          </div>
        </>
      ) : (
        <>
          <Image
            src={PROFILE_PLACEHOLDER}
            alt="profile"
            width={40}
            height={40}
            className="object-cover rounded-full w-8 h-8 hidden md:block"
          />
          <div className="block md:hidden text-black hover:text-primary font-rubik transition-colors duration-300 p-4">
            Login
          </div>
        </>
      )}
    </Link>
  );
};

export default ProfileButton;
