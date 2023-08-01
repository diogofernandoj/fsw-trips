import { prisma } from "@/lib/prisma";

const getTrips = async () => {
  const trips = await prisma.user.findMany({});
  return trips;
};

export default async function Home() {
  const data = await getTrips();
  console.log(data);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}
