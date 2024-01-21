/*
  Warnings:

  - You are about to drop the `MedicineDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MedicineDetails" DROP CONSTRAINT "MedicineDetails_medicineId_fkey";

-- DropForeignKey
ALTER TABLE "RegisteredMedicine" DROP CONSTRAINT "RegisteredMedicine_medicineDetailsId_fkey";

-- DropTable
DROP TABLE "MedicineDetails";

-- CreateTable
CREATE TABLE "MedicineDetail" (
    "id" TEXT NOT NULL,
    "dosageQuantity" INTEGER NOT NULL,
    "dosageUnit" TEXT NOT NULL,
    "frequencyQuantity" INTEGER NOT NULL,
    "frequencyUnit" TEXT NOT NULL,
    "hour" INTEGER NOT NULL,
    "minute" INTEGER NOT NULL,
    "timeOfDay" "TimeOfDay" NOT NULL,
    "medicineId" TEXT,

    CONSTRAINT "MedicineDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MedicineDetail" ADD CONSTRAINT "MedicineDetail_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisteredMedicine" ADD CONSTRAINT "RegisteredMedicine_medicineDetailsId_fkey" FOREIGN KEY ("medicineDetailsId") REFERENCES "MedicineDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;
