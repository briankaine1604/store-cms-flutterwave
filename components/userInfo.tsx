import { ExtendedUser } from "@/next-auth";
import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

type Props = {
  user?: ExtendedUser;
  label: string;
};

export const UserInfo = ({ user, label }: Props) => {
  return (
    <Card className="px-2 md:w-[600px] shadow-md ">
      <CardHeader>
        <p className="text-xl md:text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4 text-sm md:text-base">
        <div className=" items-center justify-between flex flow-row rounded-lg p-3 border gap-x-2">
          <p className=" text-sm font-medium">ID</p>
          <p className="truncate p-1 font-mono bg-slate-100 max-w-[160px]">
            {user?.id}
          </p>
        </div>
        <div className=" items-center justify-between flex flow-row rounded-lg p-3 border gap-x-2">
          <p className=" text-sm font-medium">Name</p>
          <p className="truncate p-1 font-mono bg-slate-100 max-w-[160px]">
            {user?.name}
          </p>
        </div>
        <div className=" items-center justify-between flex flow-row rounded-lg p-3 border gap-x-2">
          <p className=" text-sm font-medium">Email</p>
          <p className="truncate p-1 font-mono bg-slate-100 max-w-[160px]">
            {user?.email}
          </p>
        </div>
        <div className=" items-center justify-between flex flow-row rounded-lg p-3 border gap-x-2">
          <p className=" text-sm font-medium">Role</p>
          <p className="truncate p-1 font-mono bg-slate-100 max-w-[160px]">
            {user?.role}
          </p>
        </div>
        <div className=" items-center justify-between flex flow-row rounded-lg p-3 border">
          <p className=" text-sm font-medium">Two Factor</p>
          <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
