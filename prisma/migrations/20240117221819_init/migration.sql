-- CreateEnum
CREATE TYPE "AppearanceMode" AS ENUM ('LIGHT', 'DARK');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('CAT', 'DOG');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "passwordMatch" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "appearanceMode" "AppearanceMode" NOT NULL DEFAULT 'LIGHT',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "gotchaDate" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "primaryOwnerId" TEXT NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_firstName_lastName_key" ON "User"("firstName", "lastName");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_primaryOwnerId_fkey" FOREIGN KEY ("primaryOwnerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
