-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "photos" DROP NOT NULL,
ALTER COLUMN "photos" DROP DEFAULT,
ALTER COLUMN "photos" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Record" ALTER COLUMN "photos" DROP DEFAULT,
ALTER COLUMN "photos" SET DATA TYPE TEXT;
