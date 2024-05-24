"use client";

import * as React from "react";
import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  SortingState,
  getSortedRowModel,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { BsEyeSlash } from "react-icons/bs";
import { OfferModal } from "./offer-modal";

import { useCurrentUser } from "@/hooks/use-current-user";
import { DataTablePagination } from "./pagination";
import SwipeContainer from "../../../../components/swipe-container";
import { OfferCard } from "./offer-card";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  headerText?: string;
}

export function DataTableOffers<TData, TValue>({
  columns,
  data,
  searchKey,
  headerText = "",
}: DataTableProps<TData, TValue>) {
  const user = useCurrentUser();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const [open, setOpen] = useState(false);
  /*  const [triggerForSwipeContainer, setTriggerForSwipeContainer] =
    useState(false);
  console.log(
    "triggerForSwipeContainer from DataTableOffers:",
    triggerForSwipeContainer
  ); */

  //console.log("table.getRowModel() from DataTableOffers:", table.getRowModel());
  /*  console.log(
    "table.getPrePaginationRowModel() from DataTableOffers:",
    table.getPrePaginationRowModel()
  ); */
  let offers = table.getPrePaginationRowModel().rows.map((row) => row.original);
  //console.log("offers from DataTableOffers:", offers);

  // placeholder="🔍&#xF002; Search3"
  return (
    <div className="w-full">
      <OfferModal isOpen={open} onClose={() => setOpen(false)} />
      <div className="flex flex-col md:flex-row items-start md:items-center  md:justify-between mb-2 gap-2 ">
        <div className=" bg-white text-lg py-2 px-6 rounded-lg  ">
          {/* {headerText.split(" ").join("\u00A0")} */}
          {headerText}
        </div>
        <div className="flex flex-row justify-between md:justify-center w-full md:w-fit items-center gap-2">
          <div className="relative">
            <Input
              placeholder="Пошук"
              value={
                (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
              }
              onChange={(event) => {
                table.getColumn(searchKey)?.setFilterValue(event.target.value);
              }}
              className="max-w-sm bg-white shadow-none border-0 pl-[35px]"
            />
            {/*  <p className="absolute l-[10px] t-[5px]">S</p> */}
            <p className="absolute left-[10px] top-[10px] h-10 w-12 border-none text-xl">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4999 11.8031L14.2363 14.4811M7.1454 3.96017C8.71187 3.96017 9.98174 5.24482 9.98174 6.82952M13.3538 7.33963C13.3538 10.7907 10.5883 13.5884 7.17692 13.5884C3.7655 13.5884 1 10.7907 1 7.33963C1 3.88851 3.7655 1.09082 7.17692 1.09082C10.5883 1.09082 13.3538 3.88851 13.3538 7.33963Z"
                  stroke="#A3AED0"
                  strokeLinecap="round"
                />
              </svg>
            </p>
          </div>
          {user && (user.role == "MANAGER" || user.role == "BRAND") && (
            <Button
              size="sm"
              onClick={() => setOpen(true)}
              className=" main-button  !px-5 md:!px-10  "
            >
              Додати офер
            </Button>
          )}
        </div>
      </div>
      {/* <div className="rounded-md border"> */}

      <div className="md:hidden w-full px-0 bg-white  rounded-lg relative">
        {offers && offers.length == 0 && (
          <div className=" w-full p-4 text-center">
            Немає відповідних оферів
          </div>
        )}
        {offers && offers.length > 0 && (
          <SwipeContainer
            list={offers.map((offer, i) => (
              /*  @ts-ignore */
              <OfferCard key={i} offer={offer} />
            ))}
          />
        )}
      </div>

      {/*  <DataTablePagination table={table} /> */}
      <div className="hidden md:block rounded-md border-0 ">
        <Table /* className="overflow-hidden" */
        /* className=" !overflow-y-visible" */
        >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="hidden md:flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
