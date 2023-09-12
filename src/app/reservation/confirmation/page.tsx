"use client";

import { fadeIn } from "@/animation/variants";
import Button from "@/components/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsCheckCircleFill } from "react-icons/bs";

const ReservationConfirmation = () => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-12 p-3 flex flex-col items-center justify-center gap-3">
      <motion.div
        variants={fadeIn("down", 0.4)}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <BsCheckCircleFill className="text-primary h-16 w-16 lg:h-24 lg:w-24" />
      </motion.div>
      <motion.div
        variants={fadeIn("up", 0.4)}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <h1 className="text-primaryDark text-2xl text-center font-medium lg:text-4xl">
          Sua reserva foi efetuada com sucesso!
        </h1>
        <p className="text-grayPrimary text-sm text-center lg:text-base">
          Para conferir sua viagens, acesse Minhas viagens na barra de
          navegação.
        </p>
      </motion.div>
      <motion.span
        variants={fadeIn("up", 0.4)}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <Link href="/">
          <Button variant="outlined" className="mt-4">
            Ir para o início
          </Button>
        </Link>
      </motion.span>
    </div>
  );
};

export default ReservationConfirmation;
