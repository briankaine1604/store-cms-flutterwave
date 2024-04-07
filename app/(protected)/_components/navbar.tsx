"use client";
import { UserButton } from "@/components/auth/userButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className=" bg-secondary flex justify-between items-center rounded-xl p-2 sm:p-4 shadow-sm md:w-[600px] mt-5">
      <div className="flex sm:gap-x-3 mr-3">
        <Button
          asChild
          size={"sm"}
          variant={pathname === "/server" ? "default" : "outline"}
        >
          <Link href={"/server"}>Server</Link>
        </Button>
        <Button
          asChild
          size={"sm"}
          variant={pathname === "/client" ? "default" : "outline"}
        >
          <Link href={"/client"}>Client</Link>
        </Button>
        <Button
          asChild
          size={"sm"}
          variant={pathname === "/admin" ? "default" : "outline"}
        >
          <Link href={"/admin"}>Admin</Link>
        </Button>
        <Button
          asChild
          size={"sm"}
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href={"/settings"}>Settings</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};
