import { prisma } from "@/lib/prisma";
import TripHeader from "./components/TripHeader";
import TripReservation from "./components/TripReservation";
import TripDescription from "./components/TripDescription";
import TripHighlights from "./components/TripHighlights";
import TripLocation from "./components/TripLocation";

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
    <div className="w-full max-w-6xl mx-auto lg:px-20 lg:pt-10">
      <TripHeader trip={trip} />
      <div className="lg:flex lg:gap-10 lg:mt-12">
        <div className="lg:order-2">
          <TripReservation
            tripId={trip.id}
            tripStartDate={trip.startDate}
            tripEndDate={trip.endDate}
            maxGuests={trip.maxGuests}
            pricePerDay={Number(trip.pricePerDay)}
          />
        </div>
        <TripDescription description={trip.description} />
      </div>
      <TripHighlights highlights={trip.highlights} />
      <TripLocation
        location={trip.location}
        locationDescription={trip.locationDescription}
      />
    </div>
  );
};

export default TripDetails;
