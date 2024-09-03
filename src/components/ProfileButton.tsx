import { PROFILE_PLACEHOLDER } from "@/constant/imagePlaceholder";
import { getProfile, logoutUser } from "@/services/user/profile";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CgLogOut, CgProfile } from "react-icons/cg";

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
      <Link
        href={!data || isError || data?.status !== 200 ? "/login" : "/profile"}
      >
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
      {data && !isError && data?.status === 200 ? (
        <div className="block md:hidden text-black hover:text-primary font-rubik transition-colors duration-300 p-4" onClick={()=>{logoutUser()}}>
          Logout
        </div>
      ) : null}

      {/* Tooltip */}
      {isHovered && data && !isError && data?.status === 200 && (
        <>          
          <div className="hidden md:block absolute right-0 w-32 h-12 bg-transparent"></div>

          {/* Actual Tooltip */}
          <div className="hidden md:block absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10">
            <Link
              href="/profile"
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <CgProfile />
              <span>Profile</span>
            </Link>
            <div
            onClick={()=>{logoutUser()}}              
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
            >
              <CgLogOut />
              <span>Logout</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileButton;
