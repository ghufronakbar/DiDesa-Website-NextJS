import { useEffect, useState } from "react";
import ProfileButton from "./ProfileButton";
import { NavList } from "./NavbarUser";

const NavbarLanding = () => {
  const [showNavbar, setShowNavbar] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("");

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

      const sections: string[] = NavList.map((item) => item.name.toLowerCase());
      let currentSection = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (
          element &&
          scrollTop >= element.offsetTop - 100 &&
          scrollTop < element.offsetTop + element.offsetHeight
        ) {
          currentSection = section;
          break;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 ${
        showNavbar ? "top-0" : "-top-20"
      } transition-top duration-300 ${
        isScrolled
          ? "bg-white text-black shadow-md"
          : isMobileMenuOpen
          ? "bg-white text-black shadow-md"
          : "bg-transparent text-white"
      }`}
    >
      <div className="mx-auto flex justify-between items-center p-4 font-rubik">
        <div className="text-xl font-bold font-poppins">
          <span className="text-primary">Di</span>
          <span className="text-secondary">Desa</span>
        </div>
        <div className="hidden md:flex space-x-4 items-center">
          {NavList.map((item) => (
            <button
              key={item.name.toLowerCase()}
              onClick={() => handleScroll(item.name.toLowerCase())}
              className={`font-rubik transition-colors duration-300 ${
                activeSection === item.name.toLowerCase()
                  ? "underline underline-offset-8"
                  : "underline-offset-4"
              } hover:text-primary`}
            >
              {item.name}
            </button>
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
                  : "text-white"
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
          className={`md:hidden bg-white shadow-md transition-all duration-300`}
        >
          {NavList.map((item) => (
            <button
              key={item.name.toLowerCase()}
              onClick={() => {
                handleScroll(item.name.toLowerCase());
                handleMenuToggle(); // Close the menu after scrolling
              }}
              className="block text-black hover:text-primary font-rubik transition-colors duration-300 p-4"
            >
              {item.name}
            </button>
          ))}
          <ProfileButton />
        </div>
      )}
    </nav>
  );
};

export default NavbarLanding;
