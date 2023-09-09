"use client";

import { fadeIn } from "@/animation/variants";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const QuickSearch = () => {
  return (
    <motion.div
      variants={fadeIn("right", 0.2)}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="w-full max-w-6xl mx-auto p-5"
    >
      <div className="flex items-center">
        <div className="w-full h-[1px] bg-grayLight"></div>
        <h2 className="font-medium text-grayPrimary px-5 whitespace-nowrap lg:text-base">
          Tente pesquisar por
        </h2>
        <div className="w-full h-[1px] bg-grayLight"></div>
      </div>

      <div className="flex w-full justify-center gap-10 lg:gap-20 mt-6">
        <Link
          href={`/trips/search?destination=hotel`}
          className="flex flex-col items-center gap-1"
        >
          <Image width={35} height={35} src="/hotel-icon.png" alt="Hotel" />
          <p className="text-sm text-grayPrimary lg:text-lg">Hotel</p>
        </Link>

        <Link
          href={`/trips/search?destination=fazenda`}
          className="flex flex-col items-center gap-1"
        >
          <Image width={35} height={35} src="/farm-icon.png" alt="Fazenda" />
          <p className="text-sm text-grayPrimary lg:text-lg">Fazenda</p>
        </Link>

        <Link
          href={`/trips/search?destination=chalé`}
          className="flex flex-col items-center gap-1"
        >
          <Image width={35} height={35} src="/cottage-icon.png" alt="Chalé" />
          <p className="text-sm text-grayPrimary lg:text-lg">Chalé</p>
        </Link>

        <Link
          href={`/trips/search?destination=pousada`}
          className="flex flex-col items-center gap-1"
        >
          <Image width={35} height={35} src="/inn-icon.png" alt="Pousada" />
          <p className="text-sm text-grayPrimary lg:text-lg">Pousada</p>
        </Link>
      </div>
    </motion.div>
  );
};

export default QuickSearch;
