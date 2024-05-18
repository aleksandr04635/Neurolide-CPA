"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { formatter } from "@/lib/utils";

import { CellAction } from "./cell-action";
import Image from "next/image";
import { DEFAULT_MEDIA_CHANNEL_IMAGE } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { StatusCell } from "./status-cell";
//import { DataCell } from "./data-cell";

export type MediaChannelColumn = {
  id: number;
  name: string;
  userId: string;
  description: string;
  image: string;
  link: string;
  isVerified: boolean;
  isVIP: boolean;
  subscribers: number;
  views: number;
  price: number;
  createdAt: string;
};

export const columns: ColumnDef<MediaChannelColumn>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" space-x-2 pl-1 pr-0 "
        >
          <p className="text-base font-semibold">Id</p>
          {column.getIsSorted() === "asc" ? (
            <IoIosArrowDown />
          ) : (
            <IoIosArrowUp />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="pl-2">{row.getValue("id")}</div>;
    },
  },
  {
    accessorKey: "image",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className=" space-x-2 pl-0 pr-0 ">
          <p className="text-base font-semibold px-0">Зображення</p>
        </Button>
      );
    },
    cell: ({ row }) => (
      <Image
        src={row.original.image || DEFAULT_MEDIA_CHANNEL_IMAGE}
        alt="Media channel image"
        width={40}
        height={40}
        className=" object-cover  flex h-[40px] w-[40px] shrink-0
   overflow-hidden rounded-full box-border"
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" space-x-2 pl-1 pr-0 "
        >
          <p className="text-base font-semibold">Назва</p>

          {column.getIsSorted() === "asc" ? (
            <IoIosArrowDown />
          ) : (
            <IoIosArrowUp />
          )}
        </Button>
      );
    },
    cell: ({ row }) => (
      //text-gray-text
      <div className="flex flex-col items-start ">
        <div className="font-semibold text-base">{row.original.name}</div>
        <div>{row.original.description}</div>
      </div>
    ),
  },
  {
    accessorKey: "link",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" space-x-2 pl-1 pr-0 "
        >
          <p className="text-base font-semibold">Посилання</p>

          {column.getIsSorted() === "asc" ? (
            <IoIosArrowDown />
          ) : (
            <IoIosArrowUp />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      let domain = "";
      let domain2 = "";
      try {
        const url = new URL(row.original.link);
        domain = url.hostname;
        const matches = row.original.link.match(
          /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im
        );
        //console.log("MATCHES", matches);
        if (matches && matches.length > 0) {
          domain2 = matches[1];
        }
      } catch (error) {}
      return (
        //link-stand !hover:text-white
        <div className="flex flex-col items-start ">
          <a href={row.original.link} className="">
            <div className=" text-sm hover:text-orange-300">{domain2}</div>
          </a>
        </div>
      );
    },
  },
  /*  {
    accessorKey: "createdAt",
    header: "Creation date",
  }, */
  {
    accessorKey: "subscribers",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" space-x-2 pl-0 pr-0 "
        >
          <p className="text-base font-semibold">Підписники</p>

          {column.getIsSorted() === "asc" ? (
            <IoIosArrowDown />
          ) : (
            <IoIosArrowUp />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "views",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" space-x-2 pl-0 pr-0 "
        >
          <p className="text-base font-semibold">Перегляди</p>

          {column.getIsSorted() === "asc" ? (
            <IoIosArrowDown />
          ) : (
            <IoIosArrowUp />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" space-x-2 pl-0 pr-0 "
        >
          <p className="text-base font-semibold">Ціна</p>

          {column.getIsSorted() === "asc" ? (
            <IoIosArrowDown />
          ) : (
            <IoIosArrowUp />
          )}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex flex-col items-start ">
        <div className=" text-sm">{formatter.format(row.original.price)}</div>
      </div>
    ),
  },

  /*   {
    header: "Images",
    accessorKey: "imagesNumber",
    //id: "imagesNumber",
    //cell: ({ row }) => <div>{row.original.imagesNumber}</div>,
  }, */
  {
    id: "isVerified",
    accessorKey: "isVerified",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" space-x-2 pl-1"
        >
          <p>Статус </p>
          {column.getIsSorted() === "asc" ? (
            <IoIosArrowDown />
          ) : (
            <IoIosArrowUp />
          )}
        </Button>
      );
    },
    cell: ({ row }) => <StatusCell data={row.original} />,
  },
  {
    id: "actions",
    header: "Дії",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
