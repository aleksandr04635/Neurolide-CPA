"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { MediaChannelColumn, columns } from "./columns";
import MyButton from "@/components/ui/my-button";
import Link from "next/link";
import { DataTableMediaChannels } from "./data-table-media-channels";

interface MediaChannelsClientProps {
  data: MediaChannelColumn[];
  text?: string;
}

export const MediaChannelsClient: React.FC<MediaChannelsClientProps> = ({
  data,
  text,
}) => {
  const params = useParams();
  const router = useRouter();

  //Manage products for your store
  return (
    <>
      {/*   <div className="flex items-center justify-between mt-3 mb-2">
        <Heading
          title={`There are ${data.length} media channels`}
          description=""
        />
        <Link href="/media-channels/new">
          <Button size="sm" className=" main-button        ">
            New media channel
          </Button>
        </Link>
      </div>
      <Separator /> */}
      <DataTableMediaChannels
        searchKey="name"
        columns={columns}
        data={data}
        headerText={`${text || "Медіа канали"}: ${data.length}`}
      />
    </>
  );
};

/* headerText?: string;
  buttonText?: string;
  buttonLink?: string; */
