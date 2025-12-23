import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      serviceId,
      serviceName,
      durationUnit,
      durationValue,
      location,
      totalCost,
    } = body;

    if (!serviceId || !totalCost) {
      return NextResponse.json(
        { message: "Invalid data" },
        { status: 400 }
      );
    }

    const successUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/booking/${serviceId}?cancelled=true`;

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: session.user.email,
      line_items: [
        {
          price_data: {
            currency: "BDT",
            product_data: {
              name: serviceName,
            },
            unit_amount: totalCost * 100,
          },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId: session.user.id,
        serviceId,
        serviceName,
        durationUnit,
        durationValue: String(durationValue),
        location: JSON.stringify(location),
        totalCost: String(totalCost),
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Stripe error" },
      { status: 500 }
    );
  }
}