import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

export async function POST(request: Request) {
  const {
    tripId,
    userId,
    startDate,
    endDate,
    guests,
    name,
    description,
    coverImage,
    totalPrice,
  } = await request.json();

  const session = await stripe.checkout.sessions.create({
    success_url: process.env.SUCCESS_URL!,
    metadata: {
      tripId,
      userId,
      startDate,
      endDate,
      guests,
      totalPaid: totalPrice,
    },
    line_items: [
      {
        price_data: {
          currency: "brl",
          unit_amount: totalPrice * 100,
          product_data: {
            name,
            description,
            images: [coverImage],
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
  });

  return new NextResponse(JSON.stringify({ sessionId: session.id }), {
    status: 200,
  });
}
