import Button from "@/components/Button";
import Image from "next/image";
import React from "react";

type TripLocationProps = {
  location: string;
  locationDescription: string;
};

const TripLocation = ({ location, locationDescription }: TripLocationProps) => {
  return (
    <div className="p-5 lg:p-0 lg:pb-20 lg:mt-12">
      <h2 className="font-semibold text-primaryDark mb-5 lg:text-xl">
        Localização
      </h2>
      <div className="relative h-[280px] w-full lg:hidden">
        <Image
          src="/map-mobile.png"
          alt={location}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg shadow-md"
        />
      </div>

      <div className="relative h-[480px] w-full hidden lg:block">
        <Image
          src="/map-desktop.png"
          alt={location}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg shadow-md"
        />
      </div>

      <h3 className="text-primaryDark text-sm font-semibold mt-4 lg:mt-6 lg:text-base">
        {location}
      </h3>
      <p className="text-xs text-primaryDark leading-5 lg:mt-4 lg:text-sm">
        {locationDescription}
      </p>
      <Button variant="outlined" className="w-full mt-5">
        Ver no Google Maps
      </Button>
    </div>
  );
};

export default TripLocation;
