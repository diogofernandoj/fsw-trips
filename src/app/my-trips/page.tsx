"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";
import Link from "next/link";

import UserReservationItem from "./components/UserReservationItem";
import Button from "@/components/Button";

const MyTrips = () => {
  const [reservations, setReservations] = useState<
    Prisma.TripReservationGetPayload<{
      include: { trip: true };
    }>[]
  >([]);

  const { status, data } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/");
    }

    const fetchReservations = async () => {
      const response = await fetch(
        `/api/user/${(data?.user as any)?.id}/reservations`
      );

      const json = await response.json();

      setReservations(json);
    };

    fetchReservations();
  }, [status, data?.user, router, reservations]);

  return (
    <div className="w-full max-w-6xl mx-auto p-5">
      <h1 className="text-xl text-primaryDark font-semibold">Minhas viagens</h1>
      {reservations.length > 0 ? (
        reservations.map((reservation) => (
          <UserReservationItem key={reservation.id} reservation={reservation} />
        ))
      ) : (
        <div className="flex flex-col">
          <p className="text-primaryDark font-medium mt-4">
            Você ainda não tem reservas adicionadas.
          </p>

          <Link href="/">
            <Button className="w-full mt-2">Adicionar reserva</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyTrips;
