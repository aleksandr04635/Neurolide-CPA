import Image from "next/image";

import { Menu } from "./menu";
import Link from "next/link";
export const Sidebar = () => {
  return (
    <nav
      className="hidden lg:block  grow-0 shrink-0   p-3
  min-h-screen md:w-[250px] shadow-sm 
  border-0 border-layout-border bg-white  
  bg-gradient-to-b from-blue-from via-blue-via to-blue-to"
    >
      {/*  <div className=" flex flex-row items-center justify-center w-full  py-[48px]  gap-3   ">
        <Image
          src={"/photo_2024-03-26_14-23-49-Photoroom 2.png"}
          alt="Logo"
          width={50}
          height={41}
          className=" object-contain  border-0"
        />
        <div className=" text-black font-bold text-[20px] w-fit">Analytix</div>
      </div> */}
      <Link href="/">
        <div className=" flex flex-row items-center justify-center w-full bg-white rounded-lg py-[20px] mb-10 gap-3   ">
          <Image
            src={"/Image.png"}
            alt="Logo"
            width={50}
            height={41}
            className=" object-contain  border-0"
          />
          <div className=" text-black font-bold text-[20px] w-fit">
            Neurolide
          </div>
        </div>
      </Link>
      <Menu />
    </nav>
  );
};
