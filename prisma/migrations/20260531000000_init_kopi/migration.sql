-- CreateTable: kopi-backend schema

CREATE TABLE `User` (
    `id`        INT          NOT NULL AUTO_INCREMENT,
    `username`  VARCHAR(191) NOT NULL,
    `email`     VARCHAR(191) NOT NULL,
    `password`  VARCHAR(191) NOT NULL,
    `role`      ENUM('SUPER_ADMIN', 'CUSTOMER') NOT NULL DEFAULT 'CUSTOMER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Menu` (
    `id`          INT          NOT NULL AUTO_INCREMENT,
    `nama`        VARCHAR(191) NOT NULL,
    `harga`       INT          NOT NULL,
    `deskripsi`   TEXT         NOT NULL,
    `kategori`    ENUM('espresso', 'manual_brew', 'non_coffee', 'food', 'minuman_lain') NOT NULL,
    `image`       VARCHAR(191),
    `tersedia`    BOOLEAN      NOT NULL DEFAULT true,
    `createdAt`   DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt`   DATETIME(3)  NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Pesanan` (
    `id`        INT          NOT NULL AUTO_INCREMENT,
    `userId`    INT          NOT NULL,
    `menuId`    INT          NOT NULL,
    `jumlah`    INT          NOT NULL DEFAULT 1,
    `catatan`   VARCHAR(191),
    `status`    ENUM('pending', 'waiting_payment', 'paid', 'on_process', 'ready', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
    `createdAt` DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3)  NOT NULL,

    PRIMARY KEY (`id`),
    CONSTRAINT `Pesanan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`),
    CONSTRAINT `Pesanan_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Transaksi` (
    `id`           INT          NOT NULL AUTO_INCREMENT,
    `pesananId`    INT          NOT NULL,
    `total`        INT          NOT NULL,
    `metode_bayar` VARCHAR(191),
    `bukti`        VARCHAR(191),
    `createdAt`    DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Transaksi_pesananId_key`(`pesananId`),
    PRIMARY KEY (`id`),
    CONSTRAINT `Transaksi_pesananId_fkey` FOREIGN KEY (`pesananId`) REFERENCES `Pesanan`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
