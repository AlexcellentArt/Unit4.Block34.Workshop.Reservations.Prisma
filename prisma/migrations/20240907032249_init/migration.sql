/*
  Warnings:

  - You are about to drop the column `restrauntId` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `restaurantId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_restrauntId_fkey";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "restrauntId",
ADD COLUMN     "restaurantId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
