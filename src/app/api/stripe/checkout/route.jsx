import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getDb } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { ObjectId } from "mongodb";
import { calculateTotalCost } from "@/lib/cost";

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
    const { serviceId, duration, unit, location } = body;

    const db = await getDb();
    const servicesCol = db.collection("services");

    const service = await servicesCol.findOne({
      _id: new ObjectId(serviceId),
    });

    if (!service) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 }
      );
    }

    const totalCost = calculateTotalCost({
      duration,
      unit,
      ratePerHour: service.ratePerHour,
    });

    const amountInPaisa = totalCost * 100; // যদি টাকা হয়, Stripe expects smallest unit

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "bdt",
            product_data: {
              name: `${service.name} (${duration} ${unit})`,
            },
            unit_amount: amountInPaisa,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/cancel`,
      metadata: {
        userEmail: session.user.email,
        userId: session.user.id || "",
        serviceId: service._id.toString(),
        duration: String(duration),
        unit,
        location: JSON.stringify(location),
        totalCost: String(totalCost),
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Stripe error" },
      { status: 500 }
    );
  }
}