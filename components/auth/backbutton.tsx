"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  href: string;
  label: string;
}

export const Backbutton = ({ href, label }: Props) => {
  return (
    <div className=" mx-auto">
      <Button
        variant={"link"}
        className=" font-normal w-full"
        size={"sm"}
        asChild
      >
        <Link href={href}>{label}</Link>
      </Button>
    </div>
  );
};
