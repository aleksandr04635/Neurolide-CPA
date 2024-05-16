"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import { formatter } from "@/lib/utils";
import { CellAction } from "./cell-action";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export type OfferColumns = {
  id: number;
  name: string;
  brand: string;
  authorId: string;
  price: number;
  balance: number;
  createdAt: string;
  accepted?: boolean;
};
/*  id: item.id,
    name: item.name,
    brand: item.brand,
    authorId: item.authorId,
    price: formatter.format(item.price.toNumber()),
    balance: formatter.format(item.balance.toNumber()),
    createdAt: format(item.createdAt, "MMMM do, yyyy"), */

export const columns: ColumnDef<OfferColumns>[] = [
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
      </div>
    ),
  },
  {
    accessorKey: "brand",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-white space-x-2 pl-1 pr-0 "
        >
          <p className="text-base font-semibold">Brand</p>

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
        <div className="font-semibold text-base">{row.original.brand}</div>{" "}
      </div>
    ),
  },
  /*  {
    accessorKey: "createdAt",
    header: "Creation date",
  }, */

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
  {
    accessorKey: "balance",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-white space-x-2 pl-0 pr-0 "
        >
          <p className="text-base font-semibold">Balance</p>

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
        <div className=" text-sm">{formatter.format(row.original.balance)}</div>
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
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
