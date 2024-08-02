import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { FaGooglePlay } from "react-icons/fa";

const HeroLandingPage = () => {
  return (
    <>
      <section
        id="hero"
        className="w-full h-fit min-h-screen bg-didesa bg-cover md:bg-fixed"
      >
        <div className="w-full h-full min-h-screen pt-32 lg:px-32 md:px-20 px-8 gap-2 bg-black bg-opacity-25 backdrop-blur-sm">
          <div className="w-full h-full flex flex-col gap-2 ">
            <div className="font-playfair text-white lg:text-6xl md:text-5xl text-4xl md:max-w-[40vw] drop-shadow-lg">
              Membawa Desa ke Era Digital.
            </div>
            <div className="font-rubik text-white text-base md:text-lg drop-shadow-lg">
              Di Desa - Digitalisasi Desa
            </div>
          </div>
          <div className="flex md:w-1/2 w-full mt-8 mx-auto">
            <input
              className="w-10/12 h-10 px-4 !rounded-l-lg focus:outline-none bg-white bg-opacity-20 backdrop-blur-sm text-white font-rubik placeholder:text-white"
              type="text"
              placeholder="Cari"
            />
            <div className="w-2/12 h-10 px-4 !rounded-r-lg focus:outline-none bg-primary text-white items-center flex font-rubik">
              <CiSearch className="w-6 h-6 mx-auto " />
            </div>
          </div>
          <Link
            href={"https://play.google.com/store/apps/details?id=com.didesa"}
            target="_blank"
          >
            <button className="w-fit h-fit py-2 px-4 mt-8 mx-auto bg-primary text-white text-sm items-center flex  backdrop-blur-sm rounded-lg font-rubik gap-2 hover:scale-105 transition-all duration-300">
              {" "}
              <FaGooglePlay />
              Unduh Aplikasi
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default HeroLandingPage;
