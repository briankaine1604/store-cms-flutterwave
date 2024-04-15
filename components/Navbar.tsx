import { currentUserId } from "@/hooks/current-user-id";
import { MainNav } from "./MainNav";
import StoreSwitcher from "./store-switcher";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { MobileSidebar } from "./mobile-sidebar";

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
    <nav className="p-3 px-5 text-xl font-semibold flex-no-wrap sticky top-0 border-b bg-white opacity-100 z-50 h-16 items-center">
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
