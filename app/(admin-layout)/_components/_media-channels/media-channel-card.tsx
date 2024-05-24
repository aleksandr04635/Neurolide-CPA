"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { MediaChannelColumn, columns } from "./columns";
import MyButton from "@/components/ui/my-button";
import Link from "next/link";
import {
  DEFAULT_MEDIA_CHANNEL_IMAGE,
  domainFromURL,
  formatter,
} from "@/lib/utils";
import { LinkTable } from "@/components/link-table";
import { StatusCell } from "./status-cell";
import { CellAction } from "./cell-action";
import Image from "next/image";

interface MediaChannelCartProps {
  mediaChannel: MediaChannelColumn;
}

export const MediaChannelCard: React.FC<MediaChannelCartProps> = ({
  mediaChannel,
}) => {
  const params = useParams();
  const router = useRouter();
  //console.log("mediaChannel from OfferCard: ", mediaChannel);

  //max-w-[350px]
  return (
    <div className="flex flex-col items-start w-full gap-2 py-2 pl-4 pr-0  ">
      <div className="flex flex-row items-center justify-between w-full gap-2  ">
        <div>Id: {mediaChannel.id}</div>
        <div className="flex flex-row items-center  w-fit gap-2  ">
          <StatusCell data={mediaChannel} />
          <CellAction data={mediaChannel} />
        </div>
      </div>
      <Image
        src={mediaChannel.image || DEFAULT_MEDIA_CHANNEL_IMAGE}
        alt="Media channel image"
        width={40}
        height={40}
        className=" object-cover  flex h-[40px] w-[40px] shrink-0
   overflow-hidden rounded-full box-border"
      />
      <div className="flex flex-col items-start  w-full gap-0 ">
        <div className="text-lg">Назва:</div>
        <div className="font-semibold text-base text-gray-text">
          {mediaChannel.name}
        </div>
        <div className="text-gray-text">{mediaChannel.description}</div>
      </div>
      {/* <div className="flex flex-col items-start w-full gap-0">
        <div className="text-lg">Назва:</div>
        <div className="text-gray-text">{mediaChannel.name}</div>
      </div> */}
      <div className="flex flex-col items-start w-full gap-0">
        <div className="text-lg">Посилання:</div>
        <LinkTable str={mediaChannel.link} />
      </div>
      <div className="flex flex-col items-start w-full gap-0">
        <div className="text-lg">Підписники:</div>
        <div className="text-gray-text">{mediaChannel.subscribers}</div>
      </div>
      <div className="flex flex-col items-start w-full gap-0">
        <div className="text-lg">Перегляди:</div>
        <div className="text-gray-text">{mediaChannel.views}</div>
      </div>
      {/*  <div className="flex flex-col items-start w-full gap-0">
        <div className="text-lg">Бренд:</div>
        <div className="text-gray-text">{mediaChannel.brand}</div>
      </div> */}
      <div className="flex flex-col items-start w-full gap-0">
        <div className="text-lg">Ціна:</div>
        <div className="text-gray-text">
          {formatter.format(mediaChannel.price)}
        </div>
      </div>
      {/* <div className="flex flex-col items-start w-full gap-0">
        <div className="text-lg">Баланс:</div>
        <div className="text-gray-text">
          {formatter.format(mediaChannel.balance)}
        </div>
      </div> */}
    </div>
  );
};
