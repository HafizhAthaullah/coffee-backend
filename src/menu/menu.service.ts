import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService }
from 'src/prisma/prisma.service';

@Injectable()
export class MenuService {

  constructor(
    private prisma: PrismaService,
  ) {}

  async create(data: any, file?: Express.Multer.File) {

    if (file) {
      data.image = `/uploads/menu/${file.filename}`;
    }

    return this.prisma.menu.create({ data });
  }

  findAll() {

    return this.prisma.menu.findMany({
      orderBy: {
        kategori: 'asc',
      },
    });
  }

  findByKategori(kategori: string) {

    return this.prisma.menu.findMany({
      where: {
        kategori: kategori as any,
        tersedia: true,
      },
    });
  }

  async findOne(id: number) {

    const menu =
      await this.prisma.menu.findUnique({
        where: { id },
      });

    if (!menu) {
      throw new NotFoundException(
        'Menu tidak ditemukan',
      );
    }

    return menu;
  }

  async update(
    id: number,
    data: any,
    file?: Express.Multer.File,
  ) {

    await this.findOne(id);

    if (file) {
      data.image = `/uploads/menu/${file.filename}`;
    }

    return this.prisma.menu.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {

    await this.findOne(id);

    return this.prisma.menu.delete({
      where: { id },
    });
  }
}