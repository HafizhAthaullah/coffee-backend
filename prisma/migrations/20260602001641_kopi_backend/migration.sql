/*
  Warnings:

  - The values [minuman_lain] on the enum `Menu_kategori` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `menu` MODIFY `kategori` ENUM('espresso', 'manual_brew', 'non_coffee', 'food') NOT NULL;
