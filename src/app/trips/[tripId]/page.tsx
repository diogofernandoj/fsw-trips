import { prisma } from "@/lib/prisma";
import TripHeader from "./components/TripHeader";

const getTrip = async (tripId: string) => {
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  });

  return trip;
};

const TripDetails = async ({ params }: { params: { tripId: string } }) => {
  const trip = await getTrip(params.tripId);

  if (!trip) return null;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <TripHeader trip={trip} />
    </div>
  );
};

export default TripDetails;
