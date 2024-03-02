/*
  Warnings:

  - Added the required column `fromUserId` to the `Relationship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Relationship" ADD COLUMN     "fromUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Relationship" ADD CONSTRAINT "Relationship_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
