import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import Stripe from "stripe";



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function POST(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();
    console.log(process.env.STRIPE_SECRET_KEY);
    

    console.log(params.courseId);
    console.log(user?.id);
    
    if (!user || !user.id || !user.emailAddresses[0].emailAddress) {
      return NextResponse.json("Unauthorized user", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      },
    });

    console.log(course, "course");

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId,
        },
      },
    });

    console.log("purcahse", purchase);

    if (!course) {
      return NextResponse.json("Course not found", { status: 404 });
    }

    if (purchase) {
      return NextResponse.json("You already purchased this course", {
        status: 200,
      });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: course.title,
            description: course.description!,
          },
          unit_amount: Math.round(course.price!),
        },
      },
    ];

    console.log("line_items", line_items[0].price_data?.product_data);

    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        StripeCustomerId: true,
      },
    });

    console.log("strippecustome", stripeCustomer);
  

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
      });


      
      
      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: user.id,
          StripeCustomerId: customer.id,
        },
      });


      return NextResponse.json("stripe customer is createdd",{status:200})
    }


   
  try {
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.StripeCustomerId,
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/courses/${course.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      metadata: {
      courseId: course.id,
      userId: user.id,
      },
    });
    console.log(session);
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log(error);
    
  }
 

    
    
    

  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
}
