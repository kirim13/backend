/*
  Warnings:

  - The values [DAILY,DAYS,WEEKLY,BIWEEKLY,WEEKS,MONTHLY,BIMONTHLY,MONTHS,QUARTERLY] on the enum `FrequencyUnit` will be removed. If these variants are still used in the database, this will fail.
  - The values [MEDICINE,FOOD,WATER] on the enum `NotificationType` will be removed. If these variants are still used in the database, this will fail.
  - The values [DAILY,WEEKLY,BIWEEKLY,MONTHLY,BIMONTHLY,QUARTERLY] on the enum `Repeating` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FrequencyUnit_new" AS ENUM ('Daily', 'Days', 'Weekly', 'Biweekly', 'Weeks', 'Monthly', 'Bimonthly', 'Months', 'Quarterly');
ALTER TABLE "Notification" ALTER COLUMN "frequencyUnit" TYPE "FrequencyUnit_new" USING ("frequencyUnit"::text::"FrequencyUnit_new");
ALTER TABLE "NotificationDetail" ALTER COLUMN "frequencyUnit" TYPE "FrequencyUnit_new" USING ("frequencyUnit"::text::"FrequencyUnit_new");
ALTER TYPE "FrequencyUnit" RENAME TO "FrequencyUnit_old";
ALTER TYPE "FrequencyUnit_new" RENAME TO "FrequencyUnit";
DROP TYPE "FrequencyUnit_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "NotificationType_new" AS ENUM ('Medicine', 'Food', 'Water');
ALTER TYPE "NotificationType" RENAME TO "NotificationType_old";
ALTER TYPE "NotificationType_new" RENAME TO "NotificationType";
DROP TYPE "NotificationType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Repeating_new" AS ENUM ('Daily', 'Weekly', 'Biweekly', 'Monthly', 'Quarterly');
ALTER TABLE "Notification" ALTER COLUMN "repeating" TYPE "Repeating_new" USING ("repeating"::text::"Repeating_new");
ALTER TABLE "NotificationSchedule" ALTER COLUMN "repeating" TYPE "Repeating_new" USING ("repeating"::text::"Repeating_new");
ALTER TABLE "Finance" ALTER COLUMN "repeating" TYPE "Repeating_new" USING ("repeating"::text::"Repeating_new");
ALTER TYPE "Repeating" RENAME TO "Repeating_old";
ALTER TYPE "Repeating_new" RENAME TO "Repeating";
DROP TYPE "Repeating_old";
COMMIT;
