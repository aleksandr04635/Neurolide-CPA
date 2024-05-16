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

export const UserButton = () => {
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
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          {/*  <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback> */}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-fit dark:bg-dark-additional-bg"
        align="end"
      >
        <DropdownMenuLabel>
          <div className=" text-xs">
            <p> {user?.name}</p>
            <p> {user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Menu />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer hover:bg-accent rounded-lg pl-3 ml-2 mr-2 mt-2 mb-1">
            <ExitIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
