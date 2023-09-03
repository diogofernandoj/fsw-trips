"use client";

import Image from "next/image";
import { format } from "date-fns";
import ReactCountryFlag from "react-country-flag";
import { Prisma } from "@prisma/client";
import ptBR from "date-fns/locale/pt-BR";

import Button from "@/components/Button";
import { toast } from "react-toastify";

type UserReservationProps = {
  reservation: Prisma.TripReservationGetPayload<{
    include: { trip: true };
  }>;
};

const UserReservationItem = ({ reservation }: UserReservationProps) => {
  const { trip } = reservation;

  const handleDeleteClick = async () => {
    const res = await fetch(
      `http://localhost:3000/api/trips/reservation/${reservation.id}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      return toast.error("Ocorreu um erro ao cancelar a reserva!", {
        position: "bottom-center",
      });
    }

    toast.success("Reserva cancelada com sucesso!", {
      position: "bottom-center",
    });
  };

  return (
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

      <div className="flex flex-col mt-5 text-primaryDark">
        <h3 className="text-sm font-medium">Data</h3>
        <div className="flex gap-1">
          <p className="text-sm">
            {format(reservation.startDate, "dd 'de' MMMM", { locale: ptBR })}
          </p>
          {" - "}
          <p className="text-sm">
            {format(reservation.endDate, "dd 'de' MMMM", { locale: ptBR })}
          </p>
        </div>

        <h3 className="text-sm font-medium mt-5">Hóspedes</h3>
        <p className="text-sm pb-5 border-b border-grayLight border-solid">
          {reservation.guests} hóspedes
        </p>

        <h2 className="text-primaryDark font-semibold mt-3">
          Informações sobre o preço
        </h2>
        <div className="flex justify-between mt-2">
          <p className="text-primaryDark text-sm">Total:</p>
          <p className="font-medium text-sm">
            R${Number(reservation.totalPaid).toFixed(2).replace(".", ",")}
          </p>
        </div>

        <Button variant="danger" className="mt-5" onClick={handleDeleteClick}>
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default UserReservationItem;
