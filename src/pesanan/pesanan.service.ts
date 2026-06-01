import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService }
from 'src/prisma/prisma.service';

@Injectable()
export class PesananService {

  constructor(
    private prisma: PrismaService,
  ) {}

  // BUAT PESANAN BARU
  async create(
    data: any,
    user: any,
  ) {

    // Cek menu tersedia
    const menu =
      await this.prisma.menu.findUnique({
        where: {
          id: Number(data.menuId),
        },
      });

    if (!menu) {
      throw new NotFoundException(
        'Menu tidak ditemukan',
      );
    }

    if (!menu.tersedia) {
      throw new BadRequestException(
        'Menu sedang tidak tersedia',
      );
    }

    return this.prisma.pesanan.create({
      data: {
        userId:  Number(user.id),
        menuId:  Number(data.menuId),
        jumlah:  Number(data.jumlah) || 1,
        catatan: data.catatan,
        status:  'pending',
      },

      include: {
        menu: true,
        user: {
          select: {
            id:       true,
            username: true,
            email:    true,
          },
        },
      },
    });
  }

  // GET SEMUA PESANAN (Admin)
  findAll() {

    return this.prisma.pesanan.findMany({
      include: {
        user: {
          select: {
            id:       true,
            username: true,
            email:    true,
          },
        },
        menu:      true,
        transaksi: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // GET PESANAN MILIK USER
  findByUser(userId: number) {

    return this.prisma.pesanan.findMany({
      where: {
        userId: Number(userId),
      },
      include: {
        menu:      true,
        transaksi: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // GET DETAIL PESANAN
  async findOne(id: number) {

    const pesanan =
      await this.prisma.pesanan.findUnique({
        where: { id },
        include: {
          user: true,
          menu: true,
          transaksi: true,
        },
      });

    if (!pesanan) {
      throw new NotFoundException(
        'Pesanan tidak ditemukan',
      );
    }

    return pesanan;
  }

  // UPDATE STATUS PESANAN
  async updateStatus(
    id: number,
    status: any,
  ) {

    await this.findOne(id);

    return this.prisma.pesanan.update({
      where: { id },
      data: { status },
    });
  }
}
