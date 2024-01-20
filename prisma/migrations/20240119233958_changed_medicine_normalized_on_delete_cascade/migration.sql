/*
  Warnings:

  - You are about to drop the column `petId` on the `Medicine` table. All the data in the column will be lost.
  - You are about to drop the `MedicineDosage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MedicineFrequency` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MedicineSchedule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Medicine" DROP CONSTRAINT "Medicine_petId_fkey";

-- DropForeignKey
ALTER TABLE "MedicineDosage" DROP CONSTRAINT "MedicineDosage_medicineId_fkey";

-- DropForeignKey
ALTER TABLE "MedicineFrequency" DROP CONSTRAINT "MedicineFrequency_dosageId_fkey";

-- DropForeignKey
ALTER TABLE "MedicineSchedule" DROP CONSTRAINT "MedicineSchedule_frequencyId_fkey";

-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_primaryOwnerId_fkey";

-- AlterTable
ALTER TABLE "Medicine" DROP COLUMN "petId";

-- DropTable
DROP TABLE "MedicineDosage";

-- DropTable
DROP TABLE "MedicineFrequency";

-- DropTable
DROP TABLE "MedicineSchedule";

-- CreateTable
CREATE TABLE "MedicineDetails" (
    "id" TEXT NOT NULL,
    "dosageQuantity" INTEGER NOT NULL,
    "dosageUnit" TEXT NOT NULL,
    "frequencyQuantity" INTEGER NOT NULL,
    "frequencyUnit" TEXT NOT NULL,
    "hour" INTEGER NOT NULL,
    "minute" INTEGER NOT NULL,
    "timeOfDay" "TimeOfDay" NOT NULL,
    "medicineId" TEXT,

    CONSTRAINT "MedicineDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegisteredMedicine" (
    "id" TEXT NOT NULL,
    "petId" TEXT,
    "medicineDetailsId" TEXT,

    CONSTRAINT "RegisteredMedicine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_primaryOwnerId_fkey" FOREIGN KEY ("primaryOwnerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicineDetails" ADD CONSTRAINT "MedicineDetails_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisteredMedicine" ADD CONSTRAINT "RegisteredMedicine_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisteredMedicine" ADD CONSTRAINT "RegisteredMedicine_medicineDetailsId_fkey" FOREIGN KEY ("medicineDetailsId") REFERENCES "MedicineDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;
