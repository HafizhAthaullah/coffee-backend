import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService }
from 'src/prisma/prisma.service';

@Injectable()
export class TransaksiService {

  constructor(
    private prisma: PrismaService,
  ) {}

  async create(data: any) {

    const pesananId = Number(data.pesananId);

    const pesanan =
      await this.prisma.pesanan.findUnique({
        where: { id: pesananId },
        include: { menu: true },
      });

    if (!pesanan) {
      throw new NotFoundException(
        'Pesanan tidak ditemukan',
      );
    }

    const total = data.total
      ? Number(data.total)
      : pesanan.menu.harga * pesanan.jumlah;

    await this.prisma.pesanan.update({
      where: { id: pesananId },
      data: { status: 'waiting_payment' },
    });

    return this.prisma.transaksi.create({
      data: {
        pesananId,
        total,
        metode_bayar: data.metode_bayar,
        bukti:        data.bukti,
      },
    });
  }

  async updateBukti(
    pesananId: number,
    bukti: string,
  ) {

    const transaksi =
      await this.prisma.transaksi.findUnique({
        where: { pesananId: Number(pesananId) },
      });

    if (!transaksi) {
      throw new NotFoundException(
        'Transaksi tidak ditemukan, buat transaksi dulu',
      );
    }

    return this.prisma.transaksi.update({
      where: { pesananId: Number(pesananId) },
      data: { bukti },
    });
  }

  async updateMetodeBayar(
    id: number,
    metode_bayar: string,
  ) {

    const transaksi =
      await this.prisma.transaksi.findUnique({
        where: { id: Number(id) },
      });

    if (!transaksi) {
      throw new NotFoundException(
        'Transaksi tidak ditemukan',
      );
    }

    return this.prisma.transaksi.update({
      where: { id: Number(id) },
      data: { metode_bayar },
    });
  }

  async updateStatus(id: number, status: any) {

    const transaksi =
      await this.prisma.transaksi.findUnique({
        where: { id: Number(id) },
      });

    if (!transaksi) {
      throw new NotFoundException(
        'Transaksi tidak ditemukan',
      );
    }

    return this.prisma.pesanan.update({
      where: { id: transaksi.pesananId },
      data: { status },
    });
  }

  findAll() {

    return this.prisma.transaksi.findMany({
      include: {
        pesanan: {
          include: {
            user: {
              select: {
                id:       true,
                username: true,
                email:    true,
              },
            },
            menu: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: number) {

    return this.prisma.transaksi.findUnique({
      where: { id: Number(id) },
      include: {
        pesanan: {
          include: {
            menu: true,
            user: true,
          },
        },
      },
    });
  }
}