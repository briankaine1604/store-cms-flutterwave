import { db } from "@/lib/db";

export const getTotalProducts = async (storeId: string) => {
  const count = await db.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });

  return count;
};
