import { PROFILE_PLACEHOLDER } from "@/constant/imagePlaceholder";
import { getProfile } from "@/services/user/profile";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ProfileButton = () => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["user"],
    queryFn: () => getProfile(),
    refetchOnWindowFocus: false,
  });

  const [isHovered, setIsHovered] = useState(false);

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
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={!data || isError || data?.status !== 200 ? "/login" : "/profile"}>
        {data && !isError && data?.status === 200 ? (
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

      {/* Tooltip */}
      {isHovered && data && !isError && data?.status === 200 && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
          <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            Profile
          </Link>
          <Link href="/logout" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
