"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { OfferColumns, columns } from "./columns";
import MyButton from "@/components/ui/my-button";
import Link from "next/link";
import { DataTableOffers } from "./data-table-offers";

interface OffersClientProps {
  data: OfferColumns[];
  text?: string;
}

export const OffersClient: React.FC<OffersClientProps> = ({ data, text }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <DataTableOffers
        searchKey="name"
        columns={columns}
        data={data}
        headerText={`${text || "Офери"}: ${data.length}`}
      />
    </>
  );
};
