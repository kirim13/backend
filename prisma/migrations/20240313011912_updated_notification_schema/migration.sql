/*
  Warnings:

  - Added the required column `day` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repeating` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `time` on the `Notification` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "day",
ADD COLUMN     "day" JSONB NOT NULL,
DROP COLUMN "endDate",
ADD COLUMN     "endDate" JSONB NOT NULL,
DROP COLUMN "repeating",
ADD COLUMN     "repeating" JSONB NOT NULL,
DROP COLUMN "time",
ADD COLUMN     "time" JSONB NOT NULL;
