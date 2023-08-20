"use client";

import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Trip } from "@prisma/client";

type TripReservationProps = {
  trip: Trip;
};

const TripReservation = ({ trip }: TripReservationProps) => {
  return (
    <div>
      <div className="flex flex-col px-5">
        <div className="flex gap-2">
          <DatePicker
            className="w-full"
            placeholderText="Data de início"
            onChange={() => {}}
          />
          <DatePicker
            className="w-full"
            placeholderText="Data final"
            onChange={() => {}}
          />
        </div>
        <Input
          className="mt-2"
          placeholder={`Número de hóspedes (máx: ${trip.maxGuests})`}
        />

        <div className="flex justify-between mt-3">
          <p className="font-medium text-sm text-primaryDark">Total: </p>
          <p className="font-medium text-sm text-primaryDark">R$2.660</p>
        </div>

        <Button className="mt-3">Reservar agora</Button>
      </div>
    </div>
  );
};

export default TripReservation;
