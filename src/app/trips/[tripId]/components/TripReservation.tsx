"use client";

import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { differenceInDays } from "date-fns";
import { Controller, useForm } from "react-hook-form";

type TripReservationProps = {
  tripId: string;
  tripStartDate: Date;
  tripEndDate: Date;
  maxGuests: number;
  pricePerDay: number;
};

type TripReservationForm = {
  guests: number;
  startDate: Date | null;
  endDate: Date | null;
};

const TripReservation = ({
  tripId,
  tripStartDate,
  tripEndDate,
  maxGuests,
  pricePerDay,
}: TripReservationProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setError,
  } = useForm<TripReservationForm>();

  const onSubmit = async (data: TripReservationForm) => {
    const response = await fetch("/api/trips/check", {
      method: "POST",
      body: JSON.stringify({
        startDate: data.startDate,
        endDate: data.endDate,
        tripId,
      }),
    });

    const res = await response.json();

    if (res?.error?.code === "TRIP_ALREADY_RESERVED") {
      setError("startDate", {
        type: "manual",
        message: "Essa data ja está reservada.",
      });

      setError("endDate", {
        type: "manual",
        message: "Essa data ja está reservada.",
      });
    }
  };

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  return (
    <div className="flex flex-col px-5">
      <div className="flex gap-2">
        <Controller
          name="startDate"
          rules={{
            required: {
              value: true,
              message: "A data de início é obrigatória.",
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              className="w-full"
              placeholderText="Data de início"
              onChange={field.onChange}
              error={!!errors?.startDate}
              errorMessage={errors?.startDate?.message}
              selected={field.value}
              minDate={tripStartDate}
              maxDate={tripEndDate}
            />
          )}
        />
        <Controller
          name="endDate"
          rules={{
            required: {
              value: true,
              message: "A data final é obrigatória.",
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              className="w-full"
              placeholderText="Data final"
              onChange={field.onChange}
              error={!!errors?.endDate}
              errorMessage={errors?.endDate?.message}
              selected={field.value}
              minDate={startDate ?? tripStartDate}
              maxDate={tripEndDate}
            />
          )}
        />
      </div>
      <Input
        {...register("guests", {
          required: {
            value: true,
            message: "O número de hóspedes é obrigatório.",
          },
        })}
        className="mt-2"
        placeholder={`Número de hóspedes (máx: ${maxGuests})`}
        error={!!errors?.guests}
        errorMessage={errors.guests?.message}
      />

      <div className="flex justify-between mt-3">
        <p className="font-medium text-sm text-primaryDark">{`Total${
          startDate && endDate
            ? "(" + differenceInDays(endDate, startDate) + " dias)"
            : ""
        }: `}</p>
        <p className="font-medium text-sm text-primaryDark">{`${
          startDate && endDate
            ? differenceInDays(endDate, startDate) * pricePerDay
            : "R$0"
        }`}</p>
      </div>

      <div className="pb-10 border-b border-grayLight w-full">
        <Button
          className="mt-3 w-full"
          onClick={() => handleSubmit(onSubmit)()}
        >
          Reservar agora
        </Button>
      </div>
    </div>
  );
};

export default TripReservation;
