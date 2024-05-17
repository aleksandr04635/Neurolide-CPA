"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { formatter } from "@/lib/utils";

import { CellAction } from "./cell-action";
import Image from "next/image";
import { DEFAULT_MEDIA_CHANNEL_IMAGE } from "@/lib/utils";
import { Button } from "@/components/ui/button";
//import { DataCell } from "./data-cell";

export type MediaChannelColumn = {
  id: number;
  name: string;
  userId: string;
  description: string;
  image: string;
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
          className="hover:bg-white space-x-2 pl-1 pr-0 "
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
        <Button variant="ghost" className="hover:bg-white space-x-2 pl-1 pr-0 ">
          <p className="text-base font-semibold">Image</p>
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
          className="hover:bg-white space-x-2 pl-1 pr-0 "
        >
          <p className="text-base font-semibold">Name</p>

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
        <div className="font-semibold text-base">{row.original.name}</div>{" "}
        <div>{row.original.description}</div>
      </div>
    ),
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
          className="hover:bg-white space-x-2 pl-0 pr-0 "
        >
          <p className="text-base font-semibold">Subscribers</p>

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
          className="hover:bg-white space-x-2 pl-0 pr-0 "
        >
          <p className="text-base font-semibold">Views</p>

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
          className="hover:bg-white space-x-2 pl-0 pr-0 "
        >
          <p className="text-base font-semibold">Price</p>

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
    id: "actions",
    header: "Дії",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
