"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import MyButton from "@/components/ui/my-button";
import Link from "next/link";
import { domainFromURL } from "@/lib/utils";

interface LinkTableProps {
  str: string;
}

export const LinkTable: React.FC<LinkTableProps> = ({ str }) => {
  const params = useParams();
  const router = useRouter();
  // console.log("data from LinkTable: ", data);

  return (
    <a href={str} className="">
      <div className=" text-sm text-blue-500 hover:text-cyan-400">
        {domainFromURL(str)}
      </div>
    </a>
  );
};
