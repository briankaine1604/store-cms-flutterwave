/*
  Warnings:

  - You are about to drop the column `Brand` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `Description` on the `product` table. All the data in the column will be lost.
  - Added the required column `brand` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `Brand`,
    DROP COLUMN `Description`,
    ADD COLUMN `brand` VARCHAR(191) NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NOT NULL;
