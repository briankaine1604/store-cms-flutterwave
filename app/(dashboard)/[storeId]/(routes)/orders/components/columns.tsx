"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
  name: string;
  ref: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products (Q) (S)",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col min-w-[150px]">
          {row.original.products.split(", ").map((item) => (
            <div key={item} className="break">
              {item}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "ref",
    header: "Order reference",
  },
  {
    accessorKey: "name",
    header: "Customer name",
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
    cell: ({ row }) => {
      return (
        <div className="min-w-[150px] flex flex-col justify-center">
          {row.original.phone}
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      return (
        <div className="min-w-[200px] flex flex-col justify-center">
          {row.original.address}
        </div>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
];
