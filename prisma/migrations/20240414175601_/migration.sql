/*
  Warnings:

  - You are about to drop the `producttosize` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `producttosize`;

-- CreateTable
CREATE TABLE `_ProductToSize` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ProductToSize_AB_unique`(`A`, `B`),
    INDEX `_ProductToSize_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
