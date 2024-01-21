/*
  Warnings:

  - You are about to drop the column `repeating` on the `MedicineDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MedicineDetail" DROP COLUMN "repeating";

-- AlterTable
ALTER TABLE "MedicineNotification" ADD COLUMN     "repeating" "Repeating";
