"use client";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { CellAction } from "./cell-action";
import { userRole } from "@/lib/utils";

//import { CellAction } from "./cell-action";
//import { DataCell } from "./data-cell";

export type UsersColumn = {
  id: string;
  numId: number;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  role: string;
  index: number;
  payments: number;
  budget: number;
  lids: number;
  writeoffs: number;
  balance: number;
  clicks: number;
  hold: number;
  accruals: number;
  notifications: number;
};

/*  id            String    @id @default(cuid())
  numId         Int       @default(autoincrement())
  name          String?
  address       String?
  phoneNumber   String?
  email         String?   @unique
  emailVerified DateTime?
  image         String    @default("https://res.cloudinary.com/dqwdfhxgl/image/upload/v1712025676/contacts/mtgn8ph1cyvu5hebxf1x.jpg")
  password      String?
  role          UserRole  @default(AFFILIATE)

  index    Decimal @default(0)
  payments Decimal @default(0)
  budget   Decimal @default(0)

    lids    Int     @default(0)
  writeoffs Decimal @default(0)
  balance   Decimal @default(0)

  clicks   Int     @default(0)
  hold     Int     @default(0)
  accruals Decimal @default(0)

  notifications Int @default(0),*/

export const columns: ColumnDef<UsersColumn>[] = [
  {
    accessorKey: "numId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" space-x-2 pl-1 pr-0 "
        >
          <p>Id </p>
          {column.getIsSorted() === "asc" ? (
            <IoIosArrowDown />
          ) : (
            <IoIosArrowUp />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="pl-2">{row.getValue("numId")}</div>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" space-x-2"
        >
          <p>Ім’я </p>

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
    accessorKey: "email",
    //header: "Email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" space-x-2"
        >
          <p>Email </p>
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> , {(column.getIsSorted() === "asc").toString()}*/}
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
    accessorKey: "address",
    //header: "Address",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" space-x-2 pl-1 "
        >
          <p>Адреса </p>

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
    accessorKey: "phoneNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" space-x-2 pl-0 pr-0 "
        >
          <p>Номер телефону </p>
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
    accessorKey: "role",
    /*  header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" space-x-2 pl-1"
        >
          <p>Роль </p>
          {column.getIsSorted() === "asc" ? (
            <IoIosArrowDown />
          ) : (
            <IoIosArrowUp />
          )}
        </div>
      );
    }, */
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
    cell: ({ row }) => {
      return <div className="pl-2">{userRole(row.getValue("role"))}</div>;
    },
  },
  /*   {
    header: "Properties and their variants",
    id: "data",
    cell: ({ row }) => <DataCell data={row.original} />,
  }, */
  {
    id: "actions",
    header: "Дії",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
