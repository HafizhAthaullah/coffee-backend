import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { PrismaService }
from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: any) {

    const userExist =
      await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

    if (userExist) {
      throw new BadRequestException(
        'Email sudah terdaftar',
      );
    }

    const hashed =
      await bcrypt.hash(
        data.password,
        10,
      );

    const user =
      await this.prisma.user.create({
        data: {
          username: data.username,
          email:    data.email,
          password: hashed,
        },
      });

    const { password: _, ...result } = user;
    return result;
  }

  async login(data: any) {

    const user =
      await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

    if (!user) {
      throw new BadRequestException(
        'Email tidak ditemukan',
      );
    }

    const valid =
      await bcrypt.compare(
        data.password,
        user.password,
      );

    if (!valid) {
      throw new BadRequestException(
        'Password salah',
      );
    }

    const token =
      this.jwtService.sign({
        id:    user.id,
        role:  user.role,
        email: user.email,
      });

    const { password: _, ...userResult } = user;

    return {
      token,
      user: userResult,
    };
  }
}
