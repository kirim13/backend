/*
  Warnings:

  - You are about to drop the column `status` on the `Relationship` table. All the data in the column will be lost.
  - You are about to drop the column `toUserId` on the `Relationship` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Relationship` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Relationship` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Relationship" DROP CONSTRAINT "Relationship_toUserId_fkey";

-- AlterTable
ALTER TABLE "Relationship" DROP COLUMN "status",
DROP COLUMN "toUserId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ActiveRelationship" (
    "id" TEXT NOT NULL,
    "status" "RelationshipStatus" NOT NULL,
    "userId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,

    CONSTRAINT "ActiveRelationship_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActiveRelationship_userId_key" ON "ActiveRelationship"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Relationship_userId_key" ON "Relationship"("userId");

-- AddForeignKey
ALTER TABLE "Relationship" ADD CONSTRAINT "Relationship_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveRelationship" ADD CONSTRAINT "ActiveRelationship_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveRelationship" ADD CONSTRAINT "ActiveRelationship_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "Relationship"("id") ON DELETE CASCADE ON UPDATE CASCADE;
