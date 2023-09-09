import TripItem from "@/components/TripItem";
import { prisma } from "@/lib/prisma";

const getTrips = async () => {
  const trips = await prisma.trip.findMany({});

  return trips;
};

const RecommendedTrips = async () => {
  const trips = await getTrips();

  return (
    <div className="w-full max-w-6xl mx-auto p-5 pt-0">
      <div className="flex items-center">
        <div className="w-full h-[1px] bg-grayLight"></div>
        <h2 className="font-medium text-grayPrimary px-5 whitespace-nowrap lg:text-base">
          Destinos recomendados
        </h2>
        <div className="w-full h-[1px] bg-grayLight"></div>
      </div>

      <div className="flex flex-col items-center mt-5 gap-8 lg:flex-row lg:flex-wrap lg:justify-center lg:mt-10">
        {trips.map((trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedTrips;
