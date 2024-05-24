"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { OfferColumns, columns } from "./columns";
import MyButton from "@/components/ui/my-button";
import Link from "next/link";
import { domainFromURL, formatter } from "@/lib/utils";
import { LinkTable } from "@/components/link-table";
import { StatusCell } from "./status-cell";
import { CellAction } from "./cell-action";

interface OffersCartProps {
  offer: OfferColumns;
}

export const OfferCard: React.FC<OffersCartProps> = ({ offer }) => {
  const params = useParams();
  const router = useRouter();
  //console.log("offer from OfferCard: ", offer);

  //max-w-[350px]
  return (
    <div className="flex flex-col items-start w-full gap-2 py-2 pl-4 pr-0  ">
      <div className="flex flex-row items-center justify-between w-full gap-2  ">
        <div>{offer.id}</div>
        <div className="flex flex-row items-center  w-fit gap-2  ">
          <StatusCell data={offer} />
          <CellAction data={offer} />
        </div>
      </div>
      <div className="flex flex-col items-start w-full gap-0">
        <div className="text-lg">Назва:</div>
        <div className="text-gray-text">{offer.name}</div>
      </div>
      <div className="flex flex-col items-start w-full gap-0">
        <div className="text-lg">Посилання:</div>
        <LinkTable str={offer.link} />
      </div>
      <div className="flex flex-col items-start w-full gap-0">
        <div className="text-lg">Бренд:</div>
        <div className="text-gray-text">{offer.brand}</div>
      </div>
      <div className="flex flex-col items-start w-full gap-0">
        <div className="text-lg">Виплати:</div>
        <div className="text-gray-text">{formatter.format(offer.price)}</div>
      </div>
      <div className="flex flex-col items-start w-full gap-0">
        <div className="text-lg">Баланс:</div>
        <div className="text-gray-text">{formatter.format(offer.balance)}</div>
      </div>
    </div>
  );
};
