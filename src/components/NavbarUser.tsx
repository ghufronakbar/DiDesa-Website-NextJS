import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProfileButton from "./ProfileButton";

const NavbarUser = () => {
  const [showNavbar, setShowNavbar] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const router = useRouter();
  const path = router.pathname;

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      let scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

      if (scrollTop > window.innerHeight) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`fixed w-full z-50 ${
        showNavbar ? "top-0" : "-top-20"
      } transition-top duration-300 bg-white text-black shadow-md border-b border-gray-300 ease-in-out
      }`}
    >
      <div className="mx-auto flex justify-between items-center p-4 font-rubik">
        <Link
          className="text-xl font-bold font-poppins"
          href={"/"}
          prefetch={false}
        >
          <span className="text-primary">Di</span>
          <span className="text-secondary">Desa</span>
        </Link>{" "}
        <div className="hidden md:flex space-x-4 items-center">
          {NavList.map((item) => (
            <NavDekstop
              key={item.name}
              href={item.href}
              name={item.name}
              isActive={path.includes(item.href)}
            />
          ))}
          <ProfileButton />
        </div>
        <div className="md:hidden">
          <button onClick={handleMenuToggle} className="focus:outline-none">
            <svg
              className={`w-6 h-6 ${
                isScrolled
                  ? "text-black"
                  : isMobileMenuOpen
                  ? "text-black"
                  : "text-black"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16m-7 6h7"
                }
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div
          className={`md:hidden bg-white shadow-md transition-all duration-300 `}
        >
          {NavList.map((item) => (
            <NavMobile
              key={item.name}
              href={item.href}
              name={item.name}
              onClick={handleMenuToggle}
            />
          ))}
          <ProfileButton />
        </div>
      )}
    </nav>
  );
};

interface NavItemProps {
  href: string;
  name: string;
  onClick?: () => void;
  isActive?: boolean;
}

export const NavList = [
  { name: "Beranda", href: "/beranda" },
  { name: "Berita", href: "/berita" },
  { name: "UMKM", href: "/umkm" },
  { name: "Pengaduan", href: "/pengaduan" },
  { name: "Pemilihan", href: "/pemilihan" },
];

const NavMobile = ({ href, name, onClick }: NavItemProps) => {
  return (
    <Link
      href={href}
      className="block text-black hover:text-primary font-rubik transition-colors duration-300 p-4"
      onClick={onClick}
    >
      {name}
    </Link>
  );
};

const NavDekstop = ({ href, name, isActive }: NavItemProps) => {
  return (
    <Link
      href={href}
      className={`font-rubik transition-colors duration-300 ${
        isActive ? "underline underline-offset-8" : "underline-offset-4"
      } hover:text-primary`}
    >
      {name}
    </Link>
  );
};

export default NavbarUser;
