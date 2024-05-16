import * as React from "react";

import { cn } from "@/lib/utils";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn(
        " border-separate border-spacing-y-2 border-spacing-x-0 w-full caption-bottom text-sm " +
          " ",
        className
      )}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

//[&_tr]:bg-white"hover:text-white
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      " font-semibold text-base text-gray-text  [&_tr]:border-b ",
      className
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      " border-separate [&_tr:last-child]:border-0 " +
        " [&_tr]:hover:bg-gradient-to-r hover:[&_tr]:from-blue-from hover:[&_tr]:via-blue-via hover:[&_tr]:to-blue-to " +
        " hover:[&_tr]:text-white ",
      className
    )}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

//hover:bg-muted/50 border-b transition-colors
// border-0 outline outline-1 outline-gray-400 overflow-hidden
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  /* <div className="rounded-lg overflow-hidden w-full"> */
  <tr
    ref={ref}
    className={cn(
      " table-row-class rounded-lg  overflow-hidden data-[state=selected]:bg-muted " +
        " bg-white  " +
        " text-gray-text  " +
        " ",
      className
    )}
    {...props}
  />
  /*  </div> */
));
TableRow.displayName = "TableRow";

//text-muted-foreground text-black
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "  h-fit py-3 px-2 text-left align-middle font-medium " +
        "  dark:text-white " +
        " [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

//rounded-lg  overflow-hidden
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "   p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
