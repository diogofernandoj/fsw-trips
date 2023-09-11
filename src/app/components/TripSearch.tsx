"use client";

import Button from "@/components/Button";
import CurrencyInput from "@/components/CurrencyInput";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeIn } from "@/animation/variants";
import { useState } from "react";

interface TripSearchForm {
  destination: string;
  startDate: Date | null;
  budget: string;
}

const TripSearch = () => {
  const router = useRouter();

  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<TripSearchForm>();

  const onSubmit = (data: TripSearchForm) => {
    setLoadingButton(true);
    router.push(
      `/trips/search?destination=${data.destination}${
        data.startDate ? `&startDate=${data.startDate?.toISOString()}` : ""
      }${data.budget ? `&budget=${data.budget}` : ""}`
    );
  };

  return (
    <div className="container mx-auto p-5 bg-search-background bg-cover bg-center bg-no-repeat lg:py-28">
      <motion.h1
        variants={fadeIn("up", 0)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="font-semibold text-2xl text-primaryDarker text-center lg:text-[2.5rem]"
      >
        Encontre sua próxima <span className="text-primary">viagem!</span>
      </motion.h1>

      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="flex flex-col gap-4 mt-5 lg:flex-row lg:max-w-[948px] lg:mx-auto lg:p-4 lg:bg-primary lg:mt-12 lg:bg-opacity-20 lg:rounded-lg"
      >
        <Input
          placeholder="Onde você quer ir?"
          error={!!errors.destination}
          errorMessage={errors.destination?.message}
          {...register("destination", {
            required: {
              value: true,
              message: "O destino é obrigatório.",
            },
          })}
        />

        <div className="flex gap-4 lg:w-full">
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                onChange={field.onChange}
                selected={field.value}
                placeholderText="Data Final"
                className="w-full"
                // minDate={new Date()}
              />
            )}
          />

          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                allowDecimals={false}
                placeholder="Orçamento"
                onValueChange={field.onChange as any}
                value={field.value}
                onBlur={field.onBlur}
                className="w-full"
              />
            )}
          />
        </div>

        <Button
          disabled={loadingButton}
          variant={!!loadingButton ? "loading" : "primary"}
          onClick={() => handleSubmit(onSubmit)()}
          className="w-full lg:w-1/2 lg:h-fit"
        >
          Buscar
        </Button>
      </motion.div>
    </div>
  );
};

export default TripSearch;
