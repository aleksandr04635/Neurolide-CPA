"use client";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

//import { CellAction } from "./cell-action";
//import { DataCell } from "./data-cell";

export type UsersColumn = {
  numId: number;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  role: string;
};

/* numId: item.numId,
    name: item.name,
    email: item.email,
    address: item.address || "Not entered",
    phoneNumber: item.phoneNumber || "Not entered",
    role: userRole(item.role),*/

export const columns: ColumnDef<UsersColumn>[] = [
  {
    accessorKey: "numId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-white space-x-2 pl-1 pr-0 "
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
          className="hover:bg-white space-x-2"
        >
          <p>Name </p>

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
          className="hover:bg-white space-x-2"
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
          className="hover:bg-white space-x-2 pl-1 "
        >
          <p>Address </p>

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
          className="hover:bg-white space-x-2 pl-0 pr-0 "
        >
          <p>Phone number </p>
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-white space-x-2 pl-1"
        >
          <p>Role </p>
          {column.getIsSorted() === "asc" ? (
            <IoIosArrowDown />
          ) : (
            <IoIosArrowUp />
          )}
        </Button>
      );
    },
  },
  /* {
    header: "Properties and their variants",
    id: "data",
    cell: ({ row }) => <DataCell data={row.original} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  }, */
];
