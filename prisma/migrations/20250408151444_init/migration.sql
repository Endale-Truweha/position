/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[TTinformationId]` on the table `location` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `TTinformationId` to the `location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "location" ADD COLUMN     "TTinformationId" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ttInfomation" (
    "id" TEXT NOT NULL,
    "tt" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ttInfomation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ttInfomation_tt_key" ON "ttInfomation"("tt");

-- CreateIndex
CREATE UNIQUE INDEX "location_TTinformationId_key" ON "location"("TTinformationId");

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_TTinformationId_fkey" FOREIGN KEY ("TTinformationId") REFERENCES "ttInfomation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
