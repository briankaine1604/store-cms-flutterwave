import { db } from "@/lib/db";
import { SizesClient } from "./components/client";
import { SizeColumn } from "./components/columns";
import { format } from "date-fns";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await db.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col max-w-6xl mx-auto">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <SizesClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
