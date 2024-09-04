import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineShop } from "react-icons/ai";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoNewspaperOutline } from "react-icons/io5";
import { LiaEnvelopeOpenTextSolid } from "react-icons/lia";
import { MdArrowRight, MdOutlineHowToVote } from "react-icons/md";
import { RiAdminLine, RiLogoutBoxLine } from "react-icons/ri";
import { TfiCommentAlt } from "react-icons/tfi";
import { VscGroupByRefType } from "react-icons/vsc";
import { useRouter } from "next/router";
import { LogoutAdmin } from "@/services/admin/auth";

const SidebarAdmin: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bg-white md:bg-transparent w-full md:h-full md:w-fit z-50">
      <div className="flex items-center ">
        <button
          className=" py-8 text-primary hover:text-white bg-white rounded-r-xl hover:scale-110 transition-all duration-300 fixed left-0 top-1/3 hover:bg-primary border-2"
          onClick={toggleNavbar}
        >
          {isOpen ? null : <MdArrowRight size={30} />}
        </button>
      </div>
      <div
        className={`fixed inset-0 bg-tertiary bg-opacity-50 backdrop-blur-sm  transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleNavbar}
      />
      <div
        className={`fixed top-0 left-0 h-full min-h-screen w-1/2 lg:w-1/3 xl:w-1/4 bg-white text-black transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="p-4 text-xl font-bold font-poppins">
          <span className="text-primary">Di</span>
          <span className="text-secondary">Desa</span>
        </div>

        <ul className="flex flex-col h-full">
          {menutItem.map((item) => (
            <MenuSidebar key={item.name} item={item} />
          ))}
          <li
            className="px-4 py-4 transition-colors duration-300 ease-in-out hover:bg-secondary hover:text-white hover:shadow-lg cursor-pointer"
            onClick={() => {
              LogoutAdmin();
            }}
          >
            <RiLogoutBoxLine className={classNameIcon} />
            Keluar
          </li>
        </ul>
      </div>
    </div>
  );
};

const classNameIcon = "inline-block mr-2";

type MenuItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

const menutItem: MenuItem[] = [
  {
    name: "Informasi Desa",
    href: "/admin/informasi",
    icon: <IoIosInformationCircleOutline className={classNameIcon} />,
  },
  {
    name: "Berita",
    href: "/admin/berita",
    icon: <IoNewspaperOutline className={classNameIcon} />,
  },
  {
    name: "Komentar",
    href: "/admin/komentar",
    icon: <TfiCommentAlt className={classNameIcon} />,
  },
  {
    name: "Warga",
    href: "/admin/warga",
    icon: <GoPeople className={classNameIcon} />,
  },
  {
    name: "UMKM",
    href: "/admin/umkm",
    icon: <AiOutlineShop className={classNameIcon} />,
  },
  {
    name: "Jenis UMKM",
    href: "/admin/jenis-umkm",
    icon: <VscGroupByRefType className={classNameIcon} />,
  },
  {
    name: "Pengaduan Masyarakat",
    href: "/admin/pengaduan",
    icon: <LiaEnvelopeOpenTextSolid className={classNameIcon} />,
  },
  {
    name: "Pengurus Desa",
    href: "/admin/pengurus",
    icon: <RiAdminLine className={classNameIcon} />,
  },
  {
    name: "Pemilihan",
    href: "/admin/pemilihan",
    icon: <MdOutlineHowToVote className={classNameIcon} />,
  },
];

const MenuSidebar = ({ item }: { item: MenuItem }) => {
  return (
    <Link href={item.href}>
      <li className="px-4 py-4 transition-colors duration-300 ease-in-out hover:bg-primary hover:text-white hover:shadow-lg">
        {item.icon} {item.name}
      </li>
    </Link>
  );
};

export default SidebarAdmin;
