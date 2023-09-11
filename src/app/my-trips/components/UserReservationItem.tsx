"use client";

import Image from "next/image";
import { format } from "date-fns";
import ReactCountryFlag from "react-country-flag";
import { Trip, TripReservation } from "@prisma/client";
import ptBR from "date-fns/locale/pt-BR";
import { TbAlertTriangle } from "react-icons/tb";

import Button from "@/components/Button";
import { toast } from "react-toastify";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/animation/variants";

type UserReservationProps = {
  reservation: TripReservation & { trip: Trip };
  reservations: (TripReservation & { trip: Trip })[];
  setReservations: (array: any) => void;
};

const UserReservationItem = ({
  reservation,
  reservations,
  setReservations,
}: UserReservationProps) => {
  const { trip } = reservation;

  const [modalOpen, setModal] = useState<boolean>(false);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const handleModalClick = (target: any) => {
    if (target.id === "modal") {
      setModal(false);
    }
  };

  const handleDeleteClick = async () => {
    setLoadingButton(true);

    const res = await fetch(`/api/trips/reservation/${reservation.id}`, {
      method: "DELETE",
    });

    setModal(false);
    setLoadingButton(false);

    if (!res.ok) {
      return toast.error("Ocorreu um erro ao cancelar a reserva!", {
        position: "bottom-center",
      });
    }

    const newList = reservations.filter((item) => item.id !== reservation.id);
    setReservations(newList);

    toast.success("Reserva cancelada com sucesso!", {
      position: "bottom-center",
    });
  };

  return (
    <div className="flex flex-col p-5 mt-5 border-grayLight border-solid border shadow-lg rounded-lg">
      {!!modalOpen && (
        <div
          id="modal"
          className="fixed inset-0 z-50 bg-[#bbb9] flex items-center justify-center"
          onClick={(e) => handleModalClick(e.target)}
        >
          <motion.div
            variants={fadeIn("down", 0)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="bg-white p-5 w-11/12 max-w-[500px] rounded-md shadow-lg flex flex-col gap-2"
          >
            <div className="flex gap-2 items-center">
              <div className="bg-red-500 bg-opacity-30 h-10 w-10 rounded-full text-red-500 flex justify-center items-center">
                <TbAlertTriangle size={24} />
              </div>
              <h2 className="text-xl font-semibold text-primaryDark">
                Cancelar reserva
              </h2>
            </div>
            <p className="text-grayPrimary text-base">
              Tem certeza que deseja cancelar sua reserva?
            </p>
            <div className="flex justify-end gap-2 mt-5 w-full">
              <Button
                variant="danger"
                className="w-1/2"
                onClick={() => setModal(false)}
              >
                Voltar
              </Button>
              <Button
                disabled={loadingButton}
                variant={!!loadingButton ? "loading" : "primary"}
                className="w-1/2"
                onClick={handleDeleteClick}
              >
                Sim, cancelar
              </Button>
            </div>
          </motion.div>
        </div>
      )}
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
            {format(new Date(reservation.startDate), "dd 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
          {" - "}
          <p className="text-sm">
            {format(new Date(reservation.endDate), "dd 'de' MMMM", {
              locale: ptBR,
            })}
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

        <Button
          variant="danger"
          className="mt-5"
          onClick={() => setModal(true)}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default UserReservationItem;
