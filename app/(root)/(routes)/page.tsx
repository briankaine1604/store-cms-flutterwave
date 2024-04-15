"use client";
import { LoginButton } from "@/components/auth/loginbutton";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { UseStoreModal } from "@/hooks/use-store-modal";
import Image from "next/image";
import { useEffect } from "react";

export default function Rootpage() {
  const onOpen = UseStoreModal((state) => state.onOpen);
  const isOpen = UseStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  return null;
}
