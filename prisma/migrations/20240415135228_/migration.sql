/*
  Warnings:

  - You are about to drop the `_producttosize` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `_producttosize`;

-- CreateTable
CREATE TABLE `ProductSizes` (
    `productId` VARCHAR(191) NOT NULL,
    `sizeId` VARCHAR(191) NOT NULL,

    INDEX `ProductSizes_productId_idx`(`productId`),
    INDEX `ProductSizes_sizeId_idx`(`sizeId`),
    PRIMARY KEY (`sizeId`, `productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
