import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendPaymentSuccessfulEmail } from "@/lib/mail";

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
  const body = await req.text();
  const secretKey = process.env.PAYSTACK_SECRET_KEY!;
  const signature = req.headers.get("x-paystack-signature");
  const hash = crypto
    .createHmac("sha512", secretKey)
    .update(body)
    .digest("hex");

  if (hash !== signature) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  const event = JSON.parse(body);

  // Process the event based on its type
  switch (event.event) {
    case "charge.success":
      //Handle sucess
      await db.order.updateMany({
        where: {
          paystackReference: event.data.reference,
          email: event.data.customer.email,
        },
        data: {
          isPaid: true,
        },
      });
      const email = event.data.customer.email;
      const ref = event.data.reference;
      await sendPaymentSuccessfulEmail(email, ref);
      return new NextResponse("Payment successful", { status: 200 });
    case "charge.failure":
      // Handle failed payment
      return new NextResponse(
        JSON.stringify({ success: false, message: "Payment failed" }),
        { status: 200 }
      );
    default:
      console.log("Unhandled event:", event.event);
  }

  return new NextResponse("Webhook received", { status: 200 });
}
