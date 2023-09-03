import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params: { userId } }: { params: { userId: string } }
) {
  if (!userId) {
    return new NextResponse(
      JSON.stringify({
        message: "UserId is missing!",
        status: 400,
      })
    );
  }

  const reservations = await prisma.tripReservation.findMany({
    where: {
      userId: userId,
    },
    include: {
      trip: true,
    },
  });

  return new NextResponse(JSON.stringify(reservations), { status: 200 });
}
