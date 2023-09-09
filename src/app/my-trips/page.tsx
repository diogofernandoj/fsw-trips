"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Trip, TripReservation } from "@prisma/client";
import Link from "next/link";

import UserReservationItem from "./components/UserReservationItem";
import Button from "@/components/Button";

const MyTrips = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [reservations, setReservations] = useState<
    (TripReservation & { trip: Trip })[] | null
  >(null);

  const { status, data } = useSession();

  const router = useRouter();

  useEffect(() => {
    const fetchReservations = async () => {
      const response = await fetch(`/api/user/${data?.user.id}/reservations`);

      const json = await response.json();

      setReservations(json);
      setLoading(false);
    };

    fetchReservations();
  }, [status, router, data?.user]);

  if (status === "unauthenticated") return router.push("/");

  return (
    <div className="container mx-auto p-5 pb-14 relative">
      <h1 className="font-semibold text-primaryDarker text-xl lg:mb-5">
        Minhas reservas
      </h1>
      {!!loading ? (
        ""
      ) : !reservations ? (
        <div className="flex flex-col lg:max-w-[500px]">
          <p className="mt-2 font-medium text-primaryDarker">
            Você ainda não tem nenhuma reserva! =(
          </p>

          <Link href="/">
            <Button className="w-full mt-2 lg:mt-5">Fazer reserva</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-14">
          {reservations?.map((reservation) => (
            <UserReservationItem
              key={reservation.id}
              reservation={reservation}
              reservations={reservations}
              setReservations={setReservations}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTrips;
