import { db } from "@/lib/db";

export const getTotalCount = async (storeId: string) => {
  const count = await db.order.count({
    where: {
      storeId,
      isPaid: true,
    },
  });

  return count;
};
