import { OrderClient } from "./components/client";
import { OrderColumn } from "./components/columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import { db } from "@/lib/db";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await db.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    name: item.name,
    ref: item.paystackReference,
    address: item.address,
    products: item.orderItems
      .map((orderItem) => `${orderItem.product?.name} (${orderItem.quantity})`)
      .join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product?.price) * item.quantity;
      }, 0)
    ),
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    isPaid: item.isPaid,
  }));
  return (
    <div className="flex-col max-w-6xl mx-auto">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
