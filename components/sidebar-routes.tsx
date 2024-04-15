"use client";
import {
  Home,
  FileImage,
  Layers2,
  Layers3,
  Palette,
  Ruler,
  ReceiptText,
  PackageOpen,
  AreaChart,
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

export const SidebarRoutes = () => {
  const pathname = usePathname();
  const params = useParams();
  const navigation = [
    {
      id: 1,
      name: "Billboards",
      href: "/billboards",
      icon: <FileImage className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 2,
      name: "Categories",
      href: "/categories",
      icon: <Layers2 className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 3,
      name: "Colors",
      href: "/colors",
      icon: <Palette className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 4,
      name: "Sizes",
      href: "/sizes",
      icon: <Ruler className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 5,
      name: "Products",
      href: "/products",
      icon: <ReceiptText className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 6,
      name: "Orders",
      href: "/orders",
      icon: <PackageOpen className="h-4 w-4 text-blue-500" />,
    },
  ];

  return (
    <div className="flex flex-col gap-y-5 font-semibold p-5">
      <div>
        <Link className="text-2xl font-bold px-4" href={"/"}>
          STORE
        </Link>
      </div>
      <div className="mt-3">
        <Link
          href={`/${params.storeId}`}
          className={`${
            pathname === `/${params.storeId}` ? "bg-slate-100" : ""
          } flex items-center gap-x-2 p-2 px-4 rounded-lg`}
        >
          <AreaChart className="h-4 w-4 text-blue-500" />
          <div>Overview</div>
        </Link>
      </div>
      {navigation.map((nav) => (
        <div key={nav.id}>
          <Link
            href={`/${params.storeId}${nav.href}`}
            className={`flex items-center gap-x-2 p-2 px-4 rounded-lg ${
              pathname.includes(nav.href) ? " bg-slate-100 " : ""
            }`}
          >
            <div>{nav.icon}</div>
            <div> {nav.name}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};
