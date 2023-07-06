/*
  Warnings:

  - Added the required column `mitraId` to the `Loker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `loker` ADD COLUMN `mitraId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Loker` ADD CONSTRAINT `Loker_mitraId_fkey` FOREIGN KEY (`mitraId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
