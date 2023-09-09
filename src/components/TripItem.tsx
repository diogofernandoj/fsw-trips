"use client";

import { Trip } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";

type Props = {
  trip: Trip;
};

const TripItem = ({ trip }: Props) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Link href={`/trips/${trip.id}`}>
        <div className="flex flex-col">
          <div className="relative h-[280px] w-[280px]">
            <Image
              src={trip.coverImage}
              style={{
                objectFit: "cover",
              }}
              alt={trip.name}
              className="rounded-lg shadow-md"
              fill
            />
          </div>

          <h3 className="text-primaryDark font-medium text-sm mt-2">
            {trip.name}
          </h3>

          <div className="flex items-center gap-1">
            <ReactCountryFlag countryCode={trip.countryCode} svg />
            <p className="text-xs text-grayPrimary">{trip.location}</p>
          </div>

          <p className="text-xs text-grayPrimary">
            <span className="text-primary font-medium">
              R${trip.pricePerDay.toString()}
            </span>{" "}
            por dia
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default TripItem;
