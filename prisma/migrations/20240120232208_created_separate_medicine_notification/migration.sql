/*
  Warnings:

  - You are about to drop the column `hour` on the `MedicineDetail` table. All the data in the column will be lost.
  - You are about to drop the column `minute` on the `MedicineDetail` table. All the data in the column will be lost.
  - You are about to drop the column `timeOfDay` on the `MedicineDetail` table. All the data in the column will be lost.
  - You are about to drop the column `medicineDetailsId` on the `RegisteredMedicine` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "RegisteredMedicine" DROP CONSTRAINT "RegisteredMedicine_medicineDetailsId_fkey";

-- AlterTable
ALTER TABLE "MedicineDetail" DROP COLUMN "hour",
DROP COLUMN "minute",
DROP COLUMN "timeOfDay";

-- AlterTable
ALTER TABLE "RegisteredMedicine" DROP COLUMN "medicineDetailsId",
ADD COLUMN     "medicineNotificationId" TEXT;

-- CreateTable
CREATE TABLE "MedicineNotification" (
    "id" TEXT NOT NULL,
    "hour" INTEGER NOT NULL,
    "minute" INTEGER NOT NULL,
    "timeOfDay" "TimeOfDay" NOT NULL,
    "medicineDetailId" TEXT,

    CONSTRAINT "MedicineNotification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MedicineNotification" ADD CONSTRAINT "MedicineNotification_medicineDetailId_fkey" FOREIGN KEY ("medicineDetailId") REFERENCES "MedicineDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisteredMedicine" ADD CONSTRAINT "RegisteredMedicine_medicineNotificationId_fkey" FOREIGN KEY ("medicineNotificationId") REFERENCES "MedicineNotification"("id") ON DELETE CASCADE ON UPDATE CASCADE;
