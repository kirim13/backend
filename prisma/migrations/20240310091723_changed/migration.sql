/*
  Warnings:

  - The primary key for the `Relationship` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Relationship` table. All the data in the column will be lost.
  - You are about to drop the `ActiveRelationship` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[friendId]` on the table `Relationship` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `friendId` to the `Relationship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Relationship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Relationship` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ActiveRelationship" DROP CONSTRAINT "ActiveRelationship_toUserId_fkey";

-- DropForeignKey
ALTER TABLE "ActiveRelationship" DROP CONSTRAINT "ActiveRelationship_userId_fkey";

-- AlterTable
ALTER TABLE "Relationship" DROP CONSTRAINT "Relationship_pkey",
DROP COLUMN "id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "friendId" TEXT NOT NULL,
ADD COLUMN     "status" "RelationshipStatus" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Relationship_pkey" PRIMARY KEY ("userId", "friendId");

-- DropTable
DROP TABLE "ActiveRelationship";

-- CreateIndex
CREATE UNIQUE INDEX "Relationship_friendId_key" ON "Relationship"("friendId");

-- AddForeignKey
ALTER TABLE "Relationship" ADD CONSTRAINT "Relationship_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
