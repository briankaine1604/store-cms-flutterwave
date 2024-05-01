/*
  Warnings:

  - Added the required column `Brand` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Description` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `Brand` VARCHAR(191) NOT NULL,
    ADD COLUMN `Description` VARCHAR(191) NOT NULL;
