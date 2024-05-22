"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon, GearIcon } from "@radix-ui/react-icons";
import { BsBoxArrowInDown } from "react-icons/bs";
import { BsBoxArrowUp } from "react-icons/bs";
import { CgMenuBoxed } from "react-icons/cg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import Link from "next/link";
import { Package } from "lucide-react";

import { useEffect, useState } from "react";
import { Menu } from "./menu";

export const MenuButton = () => {
  const user = useCurrentUser();
  //console.log("user form  UserButton: ", user);
  //w-48
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className=" h-[70px] w-[70px]"></div>;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full !outline-none ">
        <div>
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
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className=" CONTENT w-fit h-full rounded-none border-0
        bg-gradient-to-b from-blue-from via-blue-via to-blue-to "
        align="end"
      >
        {/* <DropdownMenuLabel>
          <div className=" text-xs">
            <p> {user?.name}</p>
            <p> {user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem>
          <Menu />
        </DropdownMenuItem>
        {/*  <DropdownMenuSeparator />
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer hover:bg-accent rounded-lg pl-3 ml-2 mr-2 mt-2 mb-1">
            <ExitIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

//className=" !bg-transparent hover:!bg-transparent"
