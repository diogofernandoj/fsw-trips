"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Trip } from "@prisma/client";
import TripItem from "@/components/TripItem";

const Trips = () => {
  const { get } = useSearchParams();

  const destination = get("destination");
  const startDate = get("startDate");
  const budget = get("budget");

  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const getTrips = async () => {
      const res = await fetch(
        `http://localhost:3000/api/trips/search?destination=${destination}${
          startDate ? `&startDate=${startDate}` : ""
        }${budget ? `&budget=${budget}` : ""}`
      );

      const data = await res.json();

      setTrips(data);
    };

    getTrips();
  }, [destination, startDate, budget]);

  return (
    <div className="w-full max-w-6xl p-5 mx-auto">
      <h1 className="text-center text-primaryDark font-semibold text-xl">
        Viagens encontradas
      </h1>
      <p className="text-center text-grayPrimary font-medium mb-5">
        {trips.length > 0
          ? "Listamos as melhores viagens para você!"
          : "Não encontramos nenhuma viagem! =("}
      </p>

      <div className="flex justify-center items-center flex-wrap gap-5">
        {trips.map((trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default Trips;
