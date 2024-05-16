//"use client";
import React from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { currentUser } from "@/lib/auth";
import { userRole } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
//import UserInfo from "./_components/user-info";
import UserInfo from "./_components/user-info-server";
type Props = {};

// async
const MainPage = (props: Props) => {
  //const user = useCurrentUser();
  //console.log("user form  MainPage: ", user);

  return <UserInfo />;
};

export default MainPage;

/* border-2 border-white
ring-2 ring-offset-[-1] ring-white  */
