-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(2),
ALTER COLUMN "time" SET DATA TYPE TEXT;
