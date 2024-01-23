/*
  Warnings:

  - You are about to drop the `Medicine` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MedicineDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MedicineNotification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RegisteredMedicine` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `type` on the `Pet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PetType" AS ENUM ('CAT', 'DOG');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('MEDICINE', 'FOOD', 'WATER');

-- CreateEnum
CREATE TYPE "RecordType" AS ENUM ('VACCINATION', 'VET_VISIT', 'CERTIFICATION');

-- CreateEnum
CREATE TYPE "InventoryType" AS ENUM ('HEADWEAR', 'ACCESSORY', 'OUTERWEAR');

-- CreateEnum
CREATE TYPE "FinanceType" AS ENUM ('FOOD_AND_TREATS', 'TOYS_AND_CLOTHING', 'SUPPLIES', 'GROOMING', 'PET_SITTER', 'VET', 'DENTAL', 'SHORT_TERM_MEDICATION', 'LONG_TERM_MEDICATION', 'EMERGENCY', 'INSURANCE', 'MISC');

-- DropForeignKey
ALTER TABLE "MedicineDetail" DROP CONSTRAINT "MedicineDetail_medicineId_fkey";

-- DropForeignKey
ALTER TABLE "MedicineNotification" DROP CONSTRAINT "MedicineNotification_medicineDetailId_fkey";

-- DropForeignKey
ALTER TABLE "RegisteredMedicine" DROP CONSTRAINT "RegisteredMedicine_medicineNotificationId_fkey";

-- DropForeignKey
ALTER TABLE "RegisteredMedicine" DROP CONSTRAINT "RegisteredMedicine_petId_fkey";

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "type",
ADD COLUMN     "type" "PetType" NOT NULL;

-- DropTable
DROP TABLE "Medicine";

-- DropTable
DROP TABLE "MedicineDetail";

-- DropTable
DROP TABLE "MedicineNotification";

-- DropTable
DROP TABLE "RegisteredMedicine";

-- DropEnum
DROP TYPE "Type";

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "notes" BOOLEAN NOT NULL DEFAULT false,
    "photos" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationDetail" (
    "id" TEXT NOT NULL,
    "dosageQuantity" INTEGER,
    "dosageUnit" TEXT,
    "frequencyQuantity" INTEGER NOT NULL,
    "frequencyUnit" "FrequencyUnit" NOT NULL,
    "notificationId" TEXT,

    CONSTRAINT "NotificationDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationSchedule" (
    "id" TEXT NOT NULL,
    "day" TEXT,
    "hour" INTEGER NOT NULL,
    "minute" INTEGER NOT NULL,
    "timeOfDay" "TimeOfDay" NOT NULL,
    "endDate" TEXT,
    "repeating" "Repeating",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notificationDetailId" TEXT,

    CONSTRAINT "NotificationSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegisteredNotification" (
    "id" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "notificationScheduleId" TEXT NOT NULL,

    CONSTRAINT "RegisteredNotification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Record" (
    "id" TEXT NOT NULL,
    "type" "RecordType",
    "notes" TEXT,
    "photos" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegisteredRecord" (
    "id" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,

    CONSTRAINT "RegisteredRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "type" "InventoryType" NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "itemId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegisteredInventory" (
    "id" TEXT NOT NULL,
    "type" "InventoryType" NOT NULL,
    "inventoryId" TEXT NOT NULL,
    "petId" TEXT NOT NULL,

    CONSTRAINT "RegisteredInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Finance" (
    "id" TEXT NOT NULL,
    "type" "FinanceType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Finance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegisteredFinance" (
    "id" TEXT NOT NULL,
    "financeId" TEXT NOT NULL,
    "petId" TEXT NOT NULL,

    CONSTRAINT "RegisteredFinance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationDetail" ADD CONSTRAINT "NotificationDetail_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationSchedule" ADD CONSTRAINT "NotificationSchedule_notificationDetailId_fkey" FOREIGN KEY ("notificationDetailId") REFERENCES "NotificationDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisteredNotification" ADD CONSTRAINT "RegisteredNotification_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisteredNotification" ADD CONSTRAINT "RegisteredNotification_notificationScheduleId_fkey" FOREIGN KEY ("notificationScheduleId") REFERENCES "NotificationSchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisteredRecord" ADD CONSTRAINT "RegisteredRecord_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisteredRecord" ADD CONSTRAINT "RegisteredRecord_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisteredInventory" ADD CONSTRAINT "RegisteredInventory_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisteredInventory" ADD CONSTRAINT "RegisteredInventory_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Finance" ADD CONSTRAINT "Finance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisteredFinance" ADD CONSTRAINT "RegisteredFinance_financeId_fkey" FOREIGN KEY ("financeId") REFERENCES "Finance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisteredFinance" ADD CONSTRAINT "RegisteredFinance_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
