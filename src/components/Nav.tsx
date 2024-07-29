import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineShop } from "react-icons/ai";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import { IoNewspaperOutline } from "react-icons/io5";
import { LiaEnvelopeOpenTextSolid } from "react-icons/lia";
import { MdArrowRight, MdOutlineHowToVote } from "react-icons/md";
import { RiAdminLine, RiLogoutBoxLine } from "react-icons/ri";

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bg-white md:bg-transparent w-full md:h-full md:w-fit z-50">
      <div className="flex items-center ">
        <button
          className=" py-8 text-white bg-black rounded-r-xl hover:scale-110 transition-all duration-300 fixed left-0 top-1/2 hover:bg-gray-900"
          onClick={toggleNavbar}
        >
          {isOpen? null : <MdArrowRight size={30}/>}          
        </button>     
      </div>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm  transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleNavbar}
      />
      <div
        className={`fixed top-0 left-0 h-full min-h-screen w-1/2 md:w-1/4 bg-black bg-opacity-80 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="p-4 text-2xl font-bold tracking-wider font-playfair">
          Di Desa
        </div>       
        <ul className="flex flex-col h-full">
          <Link href="/admin/berita">
            <li className="px-4 py-4 transition-colors duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg">
              <IoNewspaperOutline className="inline-block mr-2" /> Berita
            </li>
          </Link>
          <Link href="/admin/warga">
            <li className="px-4 py-4 transition-colors duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg">
              <GoPeople className="inline-block mr-2" /> Warga
            </li>
          </Link>
          <Link href="/admin/umkm">
            <li className="px-4 py-4 transition-colors duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg">
              <AiOutlineShop className="inline-block mr-2" /> UMKM
            </li>
          </Link>
          <Link href="/admin/pengaduan">
            <li className="px-4 py-4 transition-colors duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg">
              <LiaEnvelopeOpenTextSolid className="inline-block mr-2" /> Pengaduan Masyarakat
            </li>
          </Link>
          <Link href="/admin/pengurus">
            <li className="px-4 py-4 transition-colors duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg">
              <RiAdminLine className="inline-block mr-2" /> Pengurus Desa
            </li>
          </Link>
          <Link href="/admin/pemilihan">
            <li className="px-4 py-4 transition-colors duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg">
              <MdOutlineHowToVote className="inline-block mr-2" /> Pemilihan
            </li>
          </Link>
          <li className="px-4 py-4 transition-colors duration-300 ease-in-out hover:bg-red-700 hover:shadow-lg cursor-pointer fixed bottom-2 w-full">
            <RiLogoutBoxLine className="inline-block mr-2" onClick={() => {}} />{" "}
            Keluar
          </li>       
        </ul>
      </div>
    </div>
  );
};

export default Nav;
