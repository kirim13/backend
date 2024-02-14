/*
  Warnings:

  - The values [DAY,WEEK,MONTH] on the enum `FrequencyUnit` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FrequencyUnit_new" AS ENUM ('DAILY', 'DAYS', 'WEEKLY', 'BIWEEKLY', 'WEEKS', 'MONTHLY', 'BIMONTHLY', 'MONTHS', 'QUARTERLY');
ALTER TABLE "Notification" ALTER COLUMN "frequencyUnit" TYPE "FrequencyUnit_new" USING ("frequencyUnit"::text::"FrequencyUnit_new");
ALTER TABLE "NotificationDetail" ALTER COLUMN "frequencyUnit" TYPE "FrequencyUnit_new" USING ("frequencyUnit"::text::"FrequencyUnit_new");
ALTER TYPE "FrequencyUnit" RENAME TO "FrequencyUnit_old";
ALTER TYPE "FrequencyUnit_new" RENAME TO "FrequencyUnit";
DROP TYPE "FrequencyUnit_old";
COMMIT;
