/*
  Warnings:

  - You are about to drop the column `productId` on the `hall` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `productimage` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `rules` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `hall` DROP FOREIGN KEY `Hall_productId_fkey`;

-- DropForeignKey
ALTER TABLE `productimage` DROP FOREIGN KEY `ProductImage_productId_fkey`;

-- DropForeignKey
ALTER TABLE `rules` DROP FOREIGN KEY `Rules_productId_fkey`;

-- AlterTable
ALTER TABLE `blog` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `hall` DROP COLUMN `productId`;

-- AlterTable
ALTER TABLE `productimage` DROP COLUMN `productId`;

-- AlterTable
ALTER TABLE `rules` DROP COLUMN `productId`;

-- AlterTable
ALTER TABLE `user` ALTER COLUMN `updated_at` DROP DEFAULT;

-- CreateTable
CREATE TABLE `_ProductToProductImage` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProductToProductImage_AB_unique`(`A`, `B`),
    INDEX `_ProductToProductImage_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProductToRules` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProductToRules_AB_unique`(`A`, `B`),
    INDEX `_ProductToRules_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_HallToProduct` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_HallToProduct_AB_unique`(`A`, `B`),
    INDEX `_HallToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ProductToProductImage` ADD CONSTRAINT `_ProductToProductImage_A_fkey` FOREIGN KEY (`A`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToProductImage` ADD CONSTRAINT `_ProductToProductImage_B_fkey` FOREIGN KEY (`B`) REFERENCES `ProductImage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToRules` ADD CONSTRAINT `_ProductToRules_A_fkey` FOREIGN KEY (`A`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToRules` ADD CONSTRAINT `_ProductToRules_B_fkey` FOREIGN KEY (`B`) REFERENCES `Rules`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_HallToProduct` ADD CONSTRAINT `_HallToProduct_A_fkey` FOREIGN KEY (`A`) REFERENCES `Hall`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_HallToProduct` ADD CONSTRAINT `_HallToProduct_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
