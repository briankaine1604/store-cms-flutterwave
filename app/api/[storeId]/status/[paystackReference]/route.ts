import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET(
  req: Request,
  { params }: { params: { paystackReference: string } }
) {
  try {
    if (!params.paystackReference) {
      return new NextResponse("paystackReference Id is Required", {
        status: 400,
      });
    }

    const order = await db.order.findUnique({
      where: {
        id: params.paystackReference,
      },
    });

    if (order?.isPaid) {
      // Payment successful
      return NextResponse.json({ status: "success" }, { headers: corsHeaders });
    } else {
      // Payment not yet successful
      return NextResponse.json({ status: "pending" }, { headers: corsHeaders });
    }
  } catch (error) {
    console.error("Error checking payment status:", error);
    return new NextResponse(
      JSON.stringify({ status: "error", message: "Internal server error" }),
      { status: 500, headers: corsHeaders }
    );
  }
}
