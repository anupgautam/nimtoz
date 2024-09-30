/*
  Warnings:

  - You are about to drop the column `hall_capacity` on the `product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hall_id]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `hall_capacity`,
    ADD COLUMN `hall_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` ALTER COLUMN `updated_at` DROP DEFAULT;

-- CreateTable
CREATE TABLE `Hall` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hall_name` VARCHAR(191) NOT NULL,
    `hall_capacity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Product_hall_id_key` ON `Product`(`hall_id`);

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_hall_id_fkey` FOREIGN KEY (`hall_id`) REFERENCES `Hall`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
