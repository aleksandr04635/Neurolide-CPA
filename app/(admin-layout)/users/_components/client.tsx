"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { UsersColumn, columns } from "./columns";
import MyButton from "@/components/ui/my-button";
import Link from "next/link";
import { UsersDataTable } from "./users-data-table";

interface UsersClientProps {
  data: UsersColumn[];
}

export const UsersClient: React.FC<UsersClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  /*  "Manage users for your store" */
  return (
    <>
      {/* <div className="flex items-center justify-between mt-3 mb-2">
        <Heading title={`You have ${data.length} users`} description="" />
      </div>
        <Separator />  */}
      <UsersDataTable
        searchKey="name"
        columns={columns}
        data={data}
        headerText={`Користувачі: ${data.length} `}
        buttonText={""}
        buttonLink={""}
      />
    </>
  );
};
