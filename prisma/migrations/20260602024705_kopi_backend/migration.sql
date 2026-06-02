/*
  Warnings:

  - The values [espresso,manual_brew] on the enum `Menu_kategori` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `menu` MODIFY `kategori` ENUM('coffee', 'non_coffee', 'food', 'snack') NOT NULL;
