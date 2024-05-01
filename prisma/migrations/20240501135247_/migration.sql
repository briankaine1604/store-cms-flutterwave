/*
  Warnings:

  - You are about to drop the column `sizeId` on the `orderitem` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `OrderItem_sizeId_idx` ON `orderitem`;

-- AlterTable
ALTER TABLE `orderitem` DROP COLUMN `sizeId`,
    ADD COLUMN `size` VARCHAR(191) NULL;
