import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineShop } from 'react-icons/ai';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { IoNewspaperOutline } from 'react-icons/io5';
import { MdOutlineHowToVote } from 'react-icons/md';
import { RiLogoutBoxLine } from 'react-icons/ri';

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bg-white md:bg-transparent w-full md:h-full md:w-fit">      
    <div className='flex items-center '>
      <button
        className="p-2 text-white bg-black rounded-md m-4 hover:scale-110 transition-transform duration-300"
        onClick={toggleNavbar}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
      <div className='md:hidden text-2xl font-bold text-black font-playfair'>Di Desa</div>
    </div>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleNavbar}
      />
      <div
        className={`fixed top-0 left-0 h-full min-h-screen w-64 bg-blue-600 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}
      >
        <div className="p-4 text-2xl font-bold tracking-wider font-playfair">
          Di Desa
        </div>
        <ul className='flex flex-col h-full'>
          <li className="px-4 py-2 transition-colors duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg">
            <Link href="/admin/berita">
              <IoNewspaperOutline className="inline-block mr-2" /> Berita
            </Link>
          </li>
          <li className="px-4 py-2 transition-colors duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg">
            <Link href="/admin/warga">
              <FaUser className="inline-block mr-2" /> Warga
            </Link>
          </li>
          <li className="px-4 py-2 transition-colors duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg">
            <Link href="/admin/umkm">
              <AiOutlineShop className="inline-block mr-2" /> UMKM
            </Link>
          </li>
          <li className="px-4 py-2 transition-colors duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg">
            <Link href="/admin/pemilihan">
              <MdOutlineHowToVote className="inline-block mr-2" /> Pemilihan
            </Link>
          </li>
          <li className="px-4 py-2 transition-colors duration-300 ease-in-out hover:bg-red-700 hover:shadow-lg cursor-pointer fixed bottom-2 w-full">
            <RiLogoutBoxLine className="inline-block mr-2" onClick={() => {}} /> Keluar
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
