"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Trip } from "@prisma/client";
import TripItem from "@/components/TripItem";
import SkeletonTripItem from "@/components/SkeletonTripItem";

const Trips = () => {
  const { get } = useSearchParams();

  const destination = get("destination");
  const startDate = get("startDate");
  const budget = get("budget");

  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getTrips = async () => {
      const res = await fetch(
        `/api/trips/search?destination=${destination}${
          startDate ? `&startDate=${startDate}` : ""
        }${budget ? `&budget=${budget}` : ""}`
      );

      const data = await res.json();

      setTrips(data);
      setLoading(false);
    };

    getTrips();
  }, [destination, startDate, budget]);

  return (
    <div className="w-full max-w-6xl p-5 mx-auto">
      <h1 className="text-center text-primaryDark font-semibold text-xl">
        Viagens encontradas
      </h1>
      {!!loading ? (
        <div className="flex justify-center items-center flex-wrap gap-5 mt-12">
          {new Array(6).fill("").map((item, index) => (
            <SkeletonTripItem key={index} />
          ))}
        </div>
      ) : (
        <div>
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
      )}
    </div>
  );
};

export default Trips;
