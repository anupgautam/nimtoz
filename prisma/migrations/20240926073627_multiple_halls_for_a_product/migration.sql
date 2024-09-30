/*
  Warnings:

  - You are about to drop the column `hall_id` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_hall_id_fkey`;

-- AlterTable
ALTER TABLE `hall` ADD COLUMN `productId` INTEGER NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `hall_id`;

-- AlterTable
ALTER TABLE `user` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `Hall` ADD CONSTRAINT `Hall_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
