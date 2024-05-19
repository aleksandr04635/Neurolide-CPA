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
import OffersInWorkList from "./_components/_offers-editing/offers-accepted-by-me";
import OffersCreatedByMeAndAccepted from "./_components/_offers-editing/offers-created-by-me-and-accepted";
type Props = {};

// async
const MainPage = async (props: Props) => {
  //const user = useCurrentUser();
  const user = await currentUser();
  //console.log("user form  MainPage: ", user);

  return (
    <div className="flex flex-col gap-3 w-full">
      <UserInfo />
      {user?.role == "AFFILIATE" && <OffersInWorkList />}
      {(user?.role == "BRAND" || user?.role == "MANAGER") && (
        <OffersCreatedByMeAndAccepted />
      )}
    </div>
  );
};

export default MainPage;

/* border-2 border-white
ring-2 ring-offset-[-1] ring-white  */
