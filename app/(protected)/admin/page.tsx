"use client";
import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentRole } from "@/hooks/use-current-role-server";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

type Props = {};

const AdminPage = (props: Props) => {
  const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Pemitted Route");
      } else {
        toast.error("Forbidden route");
      }
    });
  };

  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
      }
    });
  };

  return (
    <Card className="px-1 md:px-0 md:w-[600px]">
      <CardHeader>
        <p className="text-xl md:text-2xl font-semibold text-center">Admin</p>
      </CardHeader>
      <CardContent className=" space-y-4 text-sm">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content" />
        </RoleGate>
        <div className=" flex flex-row justify-between rounded-lg border p-3 shadow-md items-center">
          <p className="text-sm font-medium">Admin only API Route</p>
          <Button size={"sm"} onClick={onApiRouteClick}>
            Click to test
          </Button>
        </div>
        <div className=" flex flex-row justify-between rounded-lg border p-3 shadow-md items-center">
          <p className="text-sm font-medium">Admin only Server Action</p>
          <Button size={"sm"} onClick={onServerActionClick}>
            Click to test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
