/*
  Warnings:

  - You are about to drop the column `author` on the `blog` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `blog` table. All the data in the column will be lost.
  - You are about to drop the `_amenitiestoproduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_halltoproduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_producttoproductimage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_producttorules` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phone_number]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorId` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone_number` on table `venue` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `_amenitiestoproduct` DROP FOREIGN KEY `_AmenitiesToProduct_A_fkey`;

-- DropForeignKey
ALTER TABLE `_amenitiestoproduct` DROP FOREIGN KEY `_AmenitiesToProduct_B_fkey`;

-- DropForeignKey
ALTER TABLE `_halltoproduct` DROP FOREIGN KEY `_HallToProduct_A_fkey`;

-- DropForeignKey
ALTER TABLE `_halltoproduct` DROP FOREIGN KEY `_HallToProduct_B_fkey`;

-- DropForeignKey
ALTER TABLE `_producttoproductimage` DROP FOREIGN KEY `_ProductToProductImage_A_fkey`;

-- DropForeignKey
ALTER TABLE `_producttoproductimage` DROP FOREIGN KEY `_ProductToProductImage_B_fkey`;

-- DropForeignKey
ALTER TABLE `_producttorules` DROP FOREIGN KEY `_ProductToRules_A_fkey`;

-- DropForeignKey
ALTER TABLE `_producttorules` DROP FOREIGN KEY `_ProductToRules_B_fkey`;

-- DropForeignKey
ALTER TABLE `blog` DROP FOREIGN KEY `Blog_userId_fkey`;

-- AlterTable
ALTER TABLE `amenities` ADD COLUMN `productId` INTEGER NULL;

-- AlterTable
ALTER TABLE `blog` DROP COLUMN `author`,
    DROP COLUMN `userId`,
    ADD COLUMN `approved_by_id` INTEGER NULL,
    ADD COLUMN `authorId` INTEGER NOT NULL,
    ADD COLUMN `is_approved` BOOLEAN NULL,
    MODIFY `short_description` VARCHAR(191) NULL,
    ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `hall` ADD COLUMN `eventId` INTEGER NULL,
    ADD COLUMN `is_booked` BOOLEAN NULL,
    ADD COLUMN `productId` INTEGER NULL;

-- AlterTable
ALTER TABLE `productimage` ADD COLUMN `productId` INTEGER NULL;

-- AlterTable
ALTER TABLE `rules` ADD COLUMN `productId` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `phone_number` VARCHAR(191) NOT NULL,
    ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `venue` MODIFY `phone_number` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_amenitiestoproduct`;

-- DropTable
DROP TABLE `_halltoproduct`;

-- DropTable
DROP TABLE `_producttoproductimage`;

-- DropTable
DROP TABLE `_producttorules`;

-- CreateTable
CREATE TABLE `Event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `start_time` DATETIME(3) NOT NULL,
    `end_time` DATETIME(3) NOT NULL,
    `product_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_approved` BOOLEAN NOT NULL,
    `approved_by_id` INTEGER NULL,
    `userId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `eventId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_phone_number_key` ON `User`(`phone_number`);

-- AddForeignKey
ALTER TABLE `Amenities` ADD CONSTRAINT `Amenities_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hall` ADD CONSTRAINT `Hall_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hall` ADD CONSTRAINT `Hall_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rules` ADD CONSTRAINT `Rules_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductImage` ADD CONSTRAINT `ProductImage_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Blog` ADD CONSTRAINT `Blog_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Blog` ADD CONSTRAINT `Blog_approved_by_id_fkey` FOREIGN KEY (`approved_by_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_approved_by_id_fkey` FOREIGN KEY (`approved_by_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventType` ADD CONSTRAINT `EventType_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
