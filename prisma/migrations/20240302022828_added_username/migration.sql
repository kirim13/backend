/*
  Warnings:

  - You are about to drop the column `fromUserId` on the `Relationship` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Relationship" DROP CONSTRAINT "Relationship_fromUserId_fkey";

-- AlterTable
ALTER TABLE "Relationship" DROP COLUMN "fromUserId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
