/*
  Warnings:

  - You are about to drop the `NotificationDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NotificationSchedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RegisteredNotification` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "NotificationDetail" DROP CONSTRAINT "NotificationDetail_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "NotificationSchedule" DROP CONSTRAINT "NotificationSchedule_notificationDetailId_fkey";

-- DropForeignKey
ALTER TABLE "RegisteredNotification" DROP CONSTRAINT "RegisteredNotification_notificationScheduleId_fkey";

-- DropForeignKey
ALTER TABLE "RegisteredNotification" DROP CONSTRAINT "RegisteredNotification_petId_fkey";

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "date" TEXT NOT NULL;

-- DropTable
DROP TABLE "NotificationDetail";

-- DropTable
DROP TABLE "NotificationSchedule";

-- DropTable
DROP TABLE "RegisteredNotification";
