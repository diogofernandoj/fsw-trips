"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trip } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import ReactCountryFlag from "react-country-flag";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import Button from "@/components/Button";
import { useSession } from "next-auth/react";

const TripConfirmation = ({ params }: { params: { tripId: string } }) => {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const searchParams = useSearchParams();

  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const getTrip = async () => {
      const response = await fetch("http://localhost:3000/api/trips/check", {
        method: "POST",
        body: JSON.stringify({
          tripId: params.tripId,
          startDate: searchParams.get("startDate"),
          endDate: searchParams.get("endDate"),
        }),
      });

      const { trip, totalPrice } = await response.json();

      setTrip(trip);
      setTotalPrice(totalPrice);
    };
    if (status === "unauthenticated") {
      router.push("/");
    }

    getTrip();
  }, [status]);

  if (!trip) return null;

  const startDate = new Date(searchParams.get("startDate") as string);
  const endDate = new Date(searchParams.get("endDate") as string);
  const guests = searchParams.get("guests");

  return (
    <div className="w-full max-w-6xl p-5 mx-auto">
      <h2 className="font-semibold font-xl text-primaryDark">Sua viagem</h2>

      {/* CARD */}
      <div className="flex flex-col p-5 mt-5 border-grayLight border-solid border shadow-lg rounded-lg">
        <div className="flex items-center gap-3 pb-5 border-b border-grayLight border-solid">
          <div className="relative h-[106px] w-[124px]">
            <Image
              src={trip?.coverImage}
              alt={trip?.name}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl text-primaryDark font-semibold">
              {trip.name}
            </h2>
            <div className="flex items-center gap-1">
              <ReactCountryFlag countryCode={trip.countryCode} svg />
              <p className="text-xs text-grayPrimary">{trip.location}</p>
            </div>
          </div>
        </div>

        <h3 className="font-semibold text-base text-primaryDark mt-4">
          Informações da reserva
        </h3>

        <div className="flex justify-between mt-2">
          <p className="text-primaryDark font-medium">Total:</p>
          <p className="font-medium">
            R${totalPrice.toFixed(2).replace(".", ",")}
          </p>
        </div>
      </div>

      <div className="flex flex-col mt-5 text-primaryDark">
        <h3 className="font-semibold">Data</h3>
        <div className="flex gap-1 mt-1">
          <p>{format(startDate, "dd 'de' MMMM", { locale: ptBR })}</p>
          {" - "}
          <p>{format(endDate, "dd 'de' MMMM", { locale: ptBR })}</p>
        </div>

        <h3 className="font-semibold mt-5">Hóspedes</h3>
        <p>{guests} hóspedes</p>

        <Button className="mt-5">Finalizar compra</Button>
      </div>
    </div>
  );
};

export default TripConfirmation;
