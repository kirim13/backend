/*
  Warnings:

  - Added the required column `quantity` to the `Medicine` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `frequencyUnit` on the `MedicineDetail` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "FrequencyUnit" AS ENUM ('DAY', 'WEEK', 'BIWEEKLY', 'MONTH', 'BIMONTHLY', 'QUARTERLY');

-- CreateEnum
CREATE TYPE "Repeating" AS ENUM ('DAILY', 'WEEKLY', 'BIWEEKLY', 'MONTHLY', 'BIMONTHLY', 'QUARTERLY');

-- AlterTable
ALTER TABLE "Medicine" ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MedicineDetail" ADD COLUMN     "repeating" "Repeating",
ALTER COLUMN "dosageQuantity" DROP NOT NULL,
ALTER COLUMN "dosageUnit" DROP NOT NULL,
DROP COLUMN "frequencyUnit",
ADD COLUMN     "frequencyUnit" "FrequencyUnit" NOT NULL;

-- AlterTable
ALTER TABLE "MedicineNotification" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "day" TEXT,
ADD COLUMN     "endDate" TIMESTAMP(3);
