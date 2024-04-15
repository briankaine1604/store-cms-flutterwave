import { currentUserId } from "@/hooks/current-user-id";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const SetupLayout = async ({ children }: { children: React.ReactNode }) => {
  const userId = await currentUserId();

  if (!userId) {
    redirect("/auth/login");
  }

  const store = await db.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
};

export default SetupLayout;
