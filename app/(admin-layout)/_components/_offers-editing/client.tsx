"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { OfferColumns, columns } from "./columns";
import MyButton from "@/components/ui/my-button";
import Link from "next/link";
import { DataTableOffersBrand } from "./data-table-offers";

interface OffersClientProps {
  data: OfferColumns[];
}

export const OffersClient: React.FC<OffersClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <DataTableOffersBrand
        searchKey="name"
        columns={columns}
        data={data}
        headerText={`Офери: ${data.length}`}
      />
    </>
  );
};
