import { initializeTransaction } from "@/actions/paystack";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface Products {
  productId: string;
  quantity: number;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS(req: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const body = await req.json();
  const { email, name, address, region, phonenumber, products } = body;

  const dbProducts = await db.product.findMany({
    where: {
      id: {
        in: products.map((product: Products) => product.productId),
      },
    },
    select: {
      id: true,
      price: true,
    },
  });

  try {
    const amount = products.reduce((total: number, product: Products) => {
      const dbProduct = dbProducts.find((p) => p.id === product.productId);
      if (!dbProduct) {
        throw new Error(`Product with ID ${product.productId} not found`);
      }
      return total + product.quantity * Number(dbProduct.price) * 100;
    }, 0);

    const secretKey = process.env.PAYSTACK_SECRET_KEY!;
    const callback = `${process.env.FRONTEND_URL}/orders`;

    const transactionData = await initializeTransaction({
      email,
      amount,
      secretKey: secretKey,
      callback,
    });
    console.log("Transaction initialized:", transactionData);

    const order = await db.order.create({
      data: {
        storeId: params.storeId,
        isPaid: false,
        email,
        name,
        paystackReference: transactionData.data.reference,
        address,
        state: region,
        phone: phonenumber,
        orderItems: {
          create: products.map((product: Products) => ({
            product: { connect: { id: product.productId } },
            quantity: product.quantity,
          })),
        },
      },
    });

    console.log("Order created:", order);

    return NextResponse.json(
      { paymentUrl: transactionData },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.log("Error initializing transaction:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
