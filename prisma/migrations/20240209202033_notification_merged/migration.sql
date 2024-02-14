/*
  Warnings:

  - Added the required column `time` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "day" TEXT,
ADD COLUMN     "dosageQuantity" INTEGER,
ADD COLUMN     "dosageUnit" TEXT,
ADD COLUMN     "endDate" TEXT,
ADD COLUMN     "frequencyQuantity" INTEGER,
ADD COLUMN     "frequencyUnit" "FrequencyUnit",
ADD COLUMN     "petId" TEXT,
ADD COLUMN     "repeating" "Repeating",
ADD COLUMN     "time" TIMESTAMP(2) NOT NULL;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
