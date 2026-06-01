-- DropForeignKey
ALTER TABLE `pesanan` DROP FOREIGN KEY `Pesanan_menuId_fkey`;

-- DropForeignKey
ALTER TABLE `pesanan` DROP FOREIGN KEY `Pesanan_userId_fkey`;

-- DropForeignKey
ALTER TABLE `transaksi` DROP FOREIGN KEY `Transaksi_pesananId_fkey`;

-- AlterTable
ALTER TABLE `menu` MODIFY `deskripsi` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Pesanan` ADD CONSTRAINT `Pesanan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pesanan` ADD CONSTRAINT `Pesanan_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaksi` ADD CONSTRAINT `Transaksi_pesananId_fkey` FOREIGN KEY (`pesananId`) REFERENCES `Pesanan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
