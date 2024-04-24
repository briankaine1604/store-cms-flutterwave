"use client";
import { Button } from "./ui/button";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { Settings } from "lucide-react";
import { UserButton } from "./auth/userButton";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

export const MainNav = () => {
  const params = useParams();
  const pathname = usePathname();
  return (
    <div className="flex gap-x-5 items-center ml-auto">
      <ThemeToggle />
      <Button
        variant={"ghost"}
        asChild
        className={cn(
          "rounded",
          pathname === `/${params.storeId}/settings` && "bg-gray-200"
        )}
      >
        <Link href={`/${params.storeId}/settings`}>
          <Settings className="h-7 w-7" />
          <span className="ml-2 font-bold sm:flex hidden"> Settings</span>{" "}
        </Link>
      </Button>
      <UserButton />
    </div>
  );
};
