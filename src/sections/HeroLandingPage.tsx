import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaGooglePlay } from "react-icons/fa";

const HeroLandingPage = () => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search === "") return;
    router.push(`/search?q=${search}`);
  };

  return (
    <>
      <section id="hero" className="w-full h-screen bg-didesa bg-cover bg-fixed bg-no-repeat bg-center">
        <div className="w-full h-full pt-32 lg:px-32 md:px-20 px-8 gap-2 bg-black bg-opacity-25 backdrop-blur-sm">
          <div className="w-full flex flex-col gap-2">
            <div className="font-playfair text-white lg:text-6xl md:text-5xl text-4xl md:max-w-[40vw] drop-shadow-lg">
              Membawa Desa ke Era Digital.
            </div>
            <div className="font-rubik text-white text-base md:text-lg drop-shadow-lg">
              Di Desa - Digitalisasi Desa
            </div>
          </div>
          <div className="w-full h-full py-20">
            <form
              className="flex md:w-1/2 w-full mx-auto"
              onSubmit={onSubmitSearch}
            >
              <input
                className="w-10/12 h-10 px-4 !rounded-l-lg focus:outline-none bg-white bg-opacity-20 backdrop-blur-sm font-rubik placeholder:text-white text-black"
                type="text"
                placeholder="Cari"
                value={search}
                onChange={handleSearch}
              />
              <button
                className="w-2/12 h-10 px-4 !rounded-r-lg focus:outline-none bg-primary text-white items-center flex font-rubik"
                type="submit"
              >
                <CiSearch className="w-6 h-6 mx-auto " />
              </button>
            </form>
            <div className="w-fit mx-auto">
              <Link
                href={
                  "https://play.google.com/store/apps/details?id=com.didesa"
                }
                target="_blank"
              >
                <button className="w-fit h-fit py-2 px-4  mt-16 mx-auto bg-primary hover:bg-secondary text-white text-sm items-center flex  backdrop-blur-sm rounded-lg font-rubik gap-2 hover:scale-105 transition-all duration-300">
                  {" "}
                  <FaGooglePlay />
                  Unduh Aplikasi
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroLandingPage;
