/*
  Warnings:

  - The `day` column on the `Notification` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `endDate` column on the `Notification` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `repeating` column on the `Notification` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `time` column on the `Notification` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "day",
ADD COLUMN     "day" TEXT[],
DROP COLUMN "endDate",
ADD COLUMN     "endDate" TEXT[],
DROP COLUMN "repeating",
ADD COLUMN     "repeating" TEXT[],
DROP COLUMN "time",
ADD COLUMN     "time" TEXT[];
