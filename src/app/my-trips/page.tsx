"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Trip, TripReservation } from "@prisma/client";
import Link from "next/link";

import UserReservationItem from "./components/UserReservationItem";
import Button from "@/components/Button";
import { motion } from "framer-motion";
import { fadeIn } from "@/animation/variants";
import SkeletonReserveCard from "./components/SkeletonReserveCard";

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
      <motion.h1
        variants={fadeIn("up", 0.4)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="font-semibold text-primaryDarker text-xl lg:mb-5"
      >
        Minhas reservas
      </motion.h1>
      {!!loading ? (
        <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-14">
          {new Array(3).fill("").map((item, index) => (
            <SkeletonReserveCard key={index} />
          ))}
        </div>
      ) : !reservations?.length ? (
        <motion.div
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="flex flex-col lg:max-w-[500px]"
        >
          <p className="mt-2 font-medium text-primaryDarker">
            Você ainda não tem nenhuma reserva! =(
          </p>

          <Link href="/">
            <Button className="w-full mt-2 lg:mt-5">Fazer reserva</Button>
          </Link>
        </motion.div>
      ) : (
        <motion.div
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-14"
        >
          {reservations?.map((reservation) => (
            <UserReservationItem
              key={reservation.id}
              reservation={reservation}
              reservations={reservations}
              setReservations={setReservations}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MyTrips;
