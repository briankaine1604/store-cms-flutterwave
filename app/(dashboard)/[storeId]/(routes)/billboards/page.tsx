import { db } from "@/lib/db";
import { BillboardClient } from "./components/client";
import { BillboardColumn } from "./components/columns";
import { format } from "date-fns";

const Billboards = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboard: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col max-w-6xl mx-auto">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <BillboardClient data={formattedBillboard} />
      </div>
    </div>
  );
};

export default Billboards;
