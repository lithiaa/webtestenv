/*
  Warnings:

  - Added the required column `unit` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Item` ADD COLUMN `unit` VARCHAR(191) NOT NULL,
    MODIFY `selling_price` DOUBLE NULL,
    MODIFY `purchase_price` DOUBLE NULL;
