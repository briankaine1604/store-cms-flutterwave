import { db } from "@/lib/db";
import { CategoryForm } from "../[categoryId]/components/category-form";

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 max-w-6xl mx-auto">
        <CategoryForm billboards={billboards} />
      </div>
    </div>
  );
};

export default CategoryPage;
