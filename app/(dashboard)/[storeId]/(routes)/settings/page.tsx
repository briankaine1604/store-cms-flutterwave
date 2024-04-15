import { redirect } from "next/navigation";
import SettingsForm from "./components/Settings-form";
import { currentUserId } from "@/hooks/current-user-id";
import { db } from "@/lib/db";

interface SettingsProps {
  params: {
    storeId: string;
  };
}
const Settings: React.FC<SettingsProps> = async ({ params }) => {
  const userId = await currentUserId();
  if (!userId) {
    redirect("/sign-in");
  }

  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });
  if (!store) {
    redirect("/");
  }
  return (
    <div className="flex-col max-w-6xl">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default Settings;
