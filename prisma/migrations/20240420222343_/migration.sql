/*
  Warnings:

  - You are about to drop the column `orderId` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `orderId`,
    ADD COLUMN `paystackReference` VARCHAR(191) NOT NULL DEFAULT '';
