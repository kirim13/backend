-- CreateEnum
CREATE TYPE "Repeating" AS ENUM ('DAILY', 'WEEKLY', 'BIWEEKLY', 'MONTHLY', 'BIMONTHLY', 'QUARTERLY');

-- AlterTable
ALTER TABLE "MedicineDetail" ADD COLUMN     "repeating" "Repeating";

-- AlterTable
ALTER TABLE "MedicineNotification" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "day" TEXT,
ADD COLUMN     "endDate" TIMESTAMP(3);
