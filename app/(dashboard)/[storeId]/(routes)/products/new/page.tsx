import { db } from "@/lib/db";
import ProductForm from "../[productId]/components/product-form";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const categories = await db.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const sizes = await db.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await db.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 max-w-6xl mx-auto">
        <ProductForm categories={categories} colors={colors} sizes={sizes} />
      </div>
    </div>
  );
};

export default ProductPage;
