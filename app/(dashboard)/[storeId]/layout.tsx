import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar";
import { currentUserId } from "@/hooks/current-user-id";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: { storeId: string };
};

const DashboardLayout = async ({ children, params }: Props) => {
  const userId = await currentUserId();

  if (!userId) {
    redirect("/auth/login");
  }

  const store = db.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div>
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="flex">
        <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
          <Sidebar />
        </div>
        <div className="md:pl-56 pt-[80px] h-full w-full">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
