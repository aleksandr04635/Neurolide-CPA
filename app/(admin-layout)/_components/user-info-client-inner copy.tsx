"use client";
import React from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { currentUser } from "@/lib/auth";
import { userRole } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";

type Props = { fullUser: User | null };

// async
const UserInfoClientIner = ({ fullUser }: Props) => {
  // const user = await currentUser(); //
  const user = useCurrentUser();
  //console.log("user form  UserInfoClientIner: ", user);
  // console.log("fullUser form  UserInfoClientIner: ", fullUser);

  return (
    <div
      className="p-2 pt-2 flex flex-col gap-3 items-center justify-center 
    w-full h-fit bg-white  rounded-xl relative"
    >
      <div
        className="  w-full h-[70px]  rounded-xl 
      bg-gradient-to-r from-blue-from via-blue-via to-blue-to text-white text-lg font-semibold
      flex flex-row items-center pl-5 "
      >
        Your Profile
      </div>

      <div className="static sm:absolute top-5 right-5 lg:right-14 z-1 flex flex-col gap-4 sm:gap-24 ">
        <div className="p-[2px] bg-white w-fit h-fit rounded-full">
          <Image
            src={user?.image!}
            alt="User image"
            width={200}
            height={200}
            /* fill */
            className=" object-cover  flex h-[150px] w-[150px] shrink-0
           overflow-hidden rounded-full box-border"
          />
        </div>
      </div>

      <div className="w-full flex flex-row justify-start pl-2 lg:pl-[8%] pb-2">
        <div className="w-full flex flex-col items-start">
          <table className="border-0">
            <tbody>
              <tr>
                <td className="py-2 w-[130px] text-sm text-gray-text-2">
                  Role:
                </td>
                <td className=" font-semibold text-sm">
                  {userRole(user?.role || "")}
                </td>
              </tr>
              <tr>
                <td className="py-2 w-[130px] text-sm text-gray-text-2">
                  Admin Id:
                </td>
                <td className=" font-semibold text-sm">{fullUser?.numId}</td>
              </tr>
              <tr>
                <td className="py-2 w-[130px] text-sm text-gray-text-2">
                  Name:
                </td>
                <td className=" font-semibold text-sm">{user?.name}</td>
              </tr>
              <tr>
                <td className="py-2 w-[130px] text-sm text-gray-text-2">
                  Address:
                </td>
                <td className=" font-semibold text-sm">
                  {fullUser?.address || "Не введено"}
                </td>
              </tr>
              <tr>
                <td className="py-2 w-[130px] text-sm text-gray-text-2">
                  Contact No.:
                </td>
                <td className=" font-semibold text-sm">
                  {fullUser?.phoneNumber && fullUser?.phoneNumber != "null"
                    ? fullUser?.phoneNumber
                    : "Не введено"}
                </td>
              </tr>
              <tr>
                <td className="py-2 w-[130px] text-sm text-gray-text-2">
                  Email:
                </td>
                <td className=" font-semibold text-sm">{user?.email}</td>
              </tr>
            </tbody>
          </table>
          <Link
            className=" link-stand text-base text-center mt-2 "
            href={"/settings"}
          >
            <Button
              size="sm"
              type="submit"
              className=" main-button   !text-sm !py-2   !px-10 !rounded-lg       "
            >
              Profile settings
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserInfoClientIner;

/* border-2 border-white
ring-2 ring-offset-[-1] ring-white  */
