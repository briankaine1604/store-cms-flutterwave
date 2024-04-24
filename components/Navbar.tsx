import { currentUserId } from "@/hooks/current-user-id";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { MainNav } from "./MainNav";
import { MobileSidebar } from "./mobile-sidebar";
import StoreSwitcher from "./store-switcher";

const Navbar = async () => {
  const userId = await currentUserId();

  if (!userId) {
    redirect("/auth/login");
  }

  const stores = await db.store.findMany({
    where: {
      userId,
    },
  });
  return (
    <nav className="p-3 px-5 text-xl font-semibold flex-no-wrap sticky top-0 border-b bg-opacity-100 z-50 h-16 items-center bg-primary-foreground">
      <div className="max-w-7xl flex items-center mx-auto">
        <div className="z-50">
          <MobileSidebar />
        </div>
        <StoreSwitcher items={stores} />
        <MainNav />
      </div>
    </nav>
  );
};

export default Navbar;
