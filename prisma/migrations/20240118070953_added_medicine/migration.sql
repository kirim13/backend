-- CreateEnum
CREATE TYPE "TimeOfDay" AS ENUM ('AM', 'PM');

-- CreateTable
CREATE TABLE "Medicine" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "notes" BOOLEAN NOT NULL DEFAULT false,
    "photos" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "petId" TEXT NOT NULL,

    CONSTRAINT "Medicine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicineDosage" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "medicineId" TEXT NOT NULL,

    CONSTRAINT "MedicineDosage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicineFrequency" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "dosageId" TEXT NOT NULL,

    CONSTRAINT "MedicineFrequency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicineSchedule" (
    "id" TEXT NOT NULL,
    "hour" INTEGER NOT NULL,
    "minute" INTEGER NOT NULL,
    "timeOfDay" "TimeOfDay" NOT NULL,
    "frequencyId" TEXT NOT NULL,

    CONSTRAINT "MedicineSchedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicineDosage" ADD CONSTRAINT "MedicineDosage_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicineFrequency" ADD CONSTRAINT "MedicineFrequency_dosageId_fkey" FOREIGN KEY ("dosageId") REFERENCES "MedicineDosage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicineSchedule" ADD CONSTRAINT "MedicineSchedule_frequencyId_fkey" FOREIGN KEY ("frequencyId") REFERENCES "MedicineFrequency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
