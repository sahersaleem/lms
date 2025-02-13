import Stripe from "stripe";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const res = await request.text();

  const signatures = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      res,
      signatures,
      process.env.WEBHOOK_ENDPOINT!
    );
  } catch (error: any) {
    return NextResponse.json({ message: "Error occurred" });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const userId = session?.metadata?.userId;

  const courseId = session?.metadata?.courseId;

  if (event.type === "checkout.session.completed") {
    if (!userId || !courseId) {
      return new NextResponse(`Webhook error Missing metadata`, {
        status: 400,
      });
    }

    await db.purchase.create({
      data: {
          userId:userId,
          courseId:courseId
      },
      
    });
  } else {
    return new NextResponse(`unhandled event error, ${event.type}` , {status:200});
  }

  return NextResponse.json(null ,{status:200})
}
