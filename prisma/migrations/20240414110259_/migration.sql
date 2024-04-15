/*
  Warnings:

  - You are about to drop the column `sizeId` on the `product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Product_sizeId_idx` ON `product`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `sizeId`;
