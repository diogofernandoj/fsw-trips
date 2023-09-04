import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const destination = searchParams.get("destination");
  const startDate = searchParams.get("startDate");
  const budget = searchParams.get("budget");

  if (!destination) {
    return new NextResponse(JSON.stringify("Destination is missing!"), {
      status: 400,
    });
  }

  const generateSearchQuery = () => {
    let searchQuery: any = {
      OR: [
        {
          name: {
            search: destination,
          },
        },
        {
          description: {
            search: destination,
          },
        },
        {
          location: {
            search: destination,
          },
        },
        {
          locationDescription: {
            search: destination,
          },
        },
      ],
      AND: [],
    };

    if (startDate) {
      searchQuery = {
        ...searchQuery,
        AND: [
          {
            endDate: {
              gte: new Date(startDate),
            },
          },
          {
            startDate: {
              lte: new Date(startDate),
            },
          },
        ],
      };
    }

    if (budget) {
      searchQuery = {
        ...searchQuery,
        AND: [
          ...searchQuery.AND,
          {
            pricePerDay: {
              lte: Number(budget),
            },
          },
        ],
      };
    }

    return searchQuery;
  };

  const trips = await prisma.trip.findMany({
    where: generateSearchQuery(),
  });

  return new NextResponse(JSON.stringify(trips), { status: 200 });
}
