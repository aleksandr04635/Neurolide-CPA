"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { UsersColumn, columns } from "./columns";
import MyButton from "@/components/ui/my-button";
import Link from "next/link";
import { domainFromURL, formatter, userRole } from "@/lib/utils";
import { LinkTable } from "@/components/link-table";

import { CellAction } from "./cell-action";

interface UsersCartProps {
  user: UsersColumn;
}

export const UserCard: React.FC<UsersCartProps> = ({ user }) => {
  const params = useParams();
  const router = useRouter();
  //console.log("user from UserCard: ", user);

  //max-w-[350px]
  return (
    <div className="flex flex-col items-start w-full gap-2 py-2 pl-4 pr-0  ">
      <div className="flex flex-row items-center justify-between w-full gap-2  ">
        <div>Id: {user.numId}</div>
        <div className="flex flex-row items-center  w-fit gap-2  ">
          <CellAction data={user} />
        </div>
      </div>
      <div className="flex flex-col items-start w-full gap-0">
        <div className="text-lg">Статус:</div>
        <div className="text-gray-text">{userRole(user.role)}</div>
      </div>
      <div className="flex flex-col items-start w-full gap-0">
        <div className="text-lg">Нікнейм:</div>
        <div className="text-gray-text">{user.name}</div>
      </div>
      <div className="flex flex-col items-start w-full gap-0">
        <div className="text-lg">Email:</div>
        <div className="text-gray-text">{user.email}</div>
      </div>
      <div className="flex flex-col items-start w-full gap-0">
        <div className="text-lg">Номер телефону:</div>
        <div className="text-gray-text">{user.phoneNumber}</div>
      </div>
      {/* <div className="flex flex-col items-start w-full gap-0">
        <div className="text-lg">Посилання:</div>
        <LinkTable str={user.link} />
      </div>
      <div className="flex flex-col items-start w-full gap-0">
        <div className="text-lg">Бренд:</div>
        <div className="text-gray-text">{user.brand}</div>
      </div> */}
      <div className="flex flex-col items-start w-full gap-0">
        <div className="text-lg">Виплати:</div>
        <div className="text-gray-text">{formatter.format(user.payments)}</div>
      </div>
      <div className="flex flex-col items-start w-full gap-0">
        <div className="text-lg">Баланс:</div>
        <div className="text-gray-text">{formatter.format(user.balance)}</div>
      </div>
    </div>
  );
};
