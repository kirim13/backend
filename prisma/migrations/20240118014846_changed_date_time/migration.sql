-- DropIndex
DROP INDEX "User_firstName_lastName_key";

-- AlterTable
ALTER TABLE "Pet" ALTER COLUMN "birthday" SET DATA TYPE DATE,
ALTER COLUMN "gotchaDate" SET DATA TYPE DATE;
