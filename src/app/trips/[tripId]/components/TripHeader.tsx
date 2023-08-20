import { Trip } from "@prisma/client";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";

type TripHeaderProps = {
  trip: Trip;
};

const TripHeader = ({ trip }: TripHeaderProps) => {
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full">
        <Image
          src={trip.coverImage}
          alt={trip.name}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="flex flex-col p-5">
        <h1 className="font-semibold text-xl text-primaryDark">{trip.name}</h1>

        <div className="flex items-center gap-1">
          <ReactCountryFlag countryCode={trip.countryCode} svg />
          <p className="text-xs text-grayPrimary underline">{trip.location}</p>
        </div>

        <p className="text-xs text-grayPrimary">
          <span className="text-primary font-medium">
            R${trip.pricePerDay.toString()}
          </span>{" "}
          por noite
        </p>
      </div>
    </div>
  );
};

export default TripHeader;
