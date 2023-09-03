import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

import { authOptions } from "../api/auth/[...nextauth]/route";
import UserReservationItem from "./components/UserReservationItem";

const getReservations = async (userId: string) => {
  const reseservations = await prisma.tripReservation.findMany({
    where: {
      userId,
    },
    include: {
      trip: true,
    },
  });

  return reseservations;
};

const MyTrips = async () => {
  const data = await getServerSession(authOptions);

  if (!data?.user) {
    redirect("/");
  }

  const reservations = await getReservations((data.user as any).id);

  return (
    <div className="w-full max-w-6xl mx-auto p-5">
      <h1 className="text-xl text-primaryDark font-semibold">Minhas viagens</h1>
      {reservations.map((reservation) => (
        <UserReservationItem key={reservation.id} reservation={reservation} />
      ))}
    </div>
  );
};

export default MyTrips;
