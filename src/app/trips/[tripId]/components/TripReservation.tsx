"use client";

import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Trip } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";

type TripReservationProps = {
  trip: Trip;
};

type TripReservationForm = {
  guests: number;
  startDate: Date | null;
  endDate: Date | null;
};

const TripReservation = ({ trip }: TripReservationProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TripReservationForm>();

  const onSubmit = (data: any) => {
    console.log(data);
  };

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
        placeholder={`Número de hóspedes (máx: ${trip.maxGuests})`}
        error={!!errors?.guests}
        errorMessage={errors.guests?.message}
      />

      <div className="flex justify-between mt-3">
        <p className="font-medium text-sm text-primaryDark">Total: </p>
        <p className="font-medium text-sm text-primaryDark">R$2.660</p>
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
