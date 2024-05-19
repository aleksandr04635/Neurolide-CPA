"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import { formatter } from "@/lib/utils";
import { CellAction } from "./cell-action";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { StatusCell } from "./status-cell";

export type OfferColumns = {
  id: number;
  name: string;
  brand: string;
  authorId: string;
  price: number;
  balance: number;
  createdAt: string;
  accepted?: boolean;
  link: string;
  isVerified: boolean;
  isVIP: boolean;
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
        <div className="font-semibold text-base">{row.original.name}</div>{" "}
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
  {
    accessorKey: "brand",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" space-x-2 pl-1 pr-0 "
        >
          <p className="text-base font-semibold">Бренд</p>

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
          className=" space-x-2 pl-0 pr-0 "
        >
          <p className="text-base font-semibold">Виплати</p>

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
          className=" space-x-2 pl-0 pr-0 "
        >
          <p className="text-base font-semibold">Баланс</p>

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
