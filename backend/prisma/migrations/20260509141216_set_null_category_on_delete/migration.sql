-- DropForeignKey
ALTER TABLE `Item` DROP FOREIGN KEY `Item_categoryId_fkey`;

-- DropIndex
DROP INDEX `Item_categoryId_fkey` ON `Item`;

-- AlterTable
ALTER TABLE `Item` MODIFY `categoryId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
