-- AlterTable
ALTER TABLE `orderitem` ADD COLUMN `sizeId` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `OrderItem_sizeId_idx` ON `OrderItem`(`sizeId`);
