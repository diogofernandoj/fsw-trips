/*
  Warnings:

  - Added the required column `endDate` to the `TripReservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guests` to the `TripReservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `TripReservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TripReservation" ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "guests" INTEGER NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;
