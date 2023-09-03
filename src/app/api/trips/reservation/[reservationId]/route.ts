import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  _request: Request,
  { params: { reservationId } }: { params: { reservationId: string } }
) {
  if (!reservationId) {
    return new NextResponse(
      JSON.stringify({
        message: "ReservationId is missing!",
        status: 400,
      })
    );
  }

  const res = await prisma.tripReservation.delete({
    where: {
      id: reservationId,
    },
  });

  return new NextResponse(JSON.stringify(res), { status: 200 });
}
