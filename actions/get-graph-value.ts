import { db } from "@/lib/db";

interface graphDataP {
  name: string;
  Total: number;
}

export const getGraphRevenue = async (storeId: string) => {
  const paidOrders = await db.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });
  const monthlyRevenue: { [key: number]: number } = {};

  for (const order of paidOrders) {
    const month = order.createdAt.getMonth();
    let revenueForOrder = 0;

    for (const item of order.orderItems) {
      if (item.product) {
        revenueForOrder += item?.product.price.toNumber() * item.quantity;
      }
    }

    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  const graphData: graphDataP[] = [
    { name: "Jan", Total: 0 },
    { name: "Feb", Total: 0 },
    { name: "Mar", Total: 0 },
    { name: "Apr", Total: 0 },
    { name: "May", Total: 0 },
    { name: "Jun", Total: 0 },
    { name: "Jul", Total: 0 },
    { name: "Aug", Total: 0 },
    { name: "Sep", Total: 0 },
    { name: "Oct", Total: 0 },
    { name: "Nov", Total: 0 },
    { name: "Dec", Total: 0 },
  ];

  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].Total = monthlyRevenue[parseInt(month)];
  }

  return graphData;
};
