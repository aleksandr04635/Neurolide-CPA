"use client";
import Image from "next/image";
import React, { useState } from "react";
/* import { MenuModal } from "./menu-modal-not-used"; */
import { MenuButton } from "./menu-button";
import { UserButton } from "./user-button";

type Props = {};

const Header = (props: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className=" bg-gradient-to-b from-blue-from via-blue-via to-blue-to
flex flex-row items-center justify-between h-fit w-full py-2 px-3"
    >
      {/*  <MenuModal isOpen={open} onClose={() => setOpen(false)} /> */}
      <div className=" flex flex-row items-center justify-start  w-fit    gap-3   ">
        <div className="bg-white p-1 rounded-full">
          <Image
            src={"/Image.png"}
            alt="Logo"
            width={40}
            height={4}
            className=" object-contain  border-0"
          />
        </div>
        <div className=" text-white font-bold text-[20px] w-fit">Neurolide</div>
      </div>
      <div className="lg:hidden flex-0 w-[70px] h-[70px] bg-white rounded-lg">
        <UserButton />
      </div>
      <MenuButton />
      {/*   <div onClick={() => setOpen(true)} className="cursor-pointer">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_5_4771)">
            <path
              d="M4.66675 7H23.3334"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.66675 14H23.3334"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.66675 21H23.3334"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_5_4771">
              <rect width="28" height="28" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div> */}
    </div>
  );
};

export default Header;
