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
ALTER TABLE "Medicine" ALTER COLUMN "petId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MedicineDosage" ALTER COLUMN "medicineId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MedicineFrequency" ALTER COLUMN "dosageId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MedicineSchedule" ALTER COLUMN "frequencyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_primaryOwnerId_fkey" FOREIGN KEY ("primaryOwnerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicineDosage" ADD CONSTRAINT "MedicineDosage_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicineFrequency" ADD CONSTRAINT "MedicineFrequency_dosageId_fkey" FOREIGN KEY ("dosageId") REFERENCES "MedicineDosage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicineSchedule" ADD CONSTRAINT "MedicineSchedule_frequencyId_fkey" FOREIGN KEY ("frequencyId") REFERENCES "MedicineFrequency"("id") ON DELETE SET NULL ON UPDATE CASCADE;
