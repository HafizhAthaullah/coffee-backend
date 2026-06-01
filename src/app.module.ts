import { Module } from '@nestjs/common';

import { PrismaModule }
from './prisma/prisma.module';

import { AuthModule }
from './auth/auth.module';

import { MenuModule }
from './menu/menu.module';

import { PesananModule }
from './pesanan/pesanan.module';

import { UsersModule }
from './users/users.module';

import { TransaksiModule }
from './transaksi/transaksi.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    MenuModule,
    PesananModule,
    UsersModule,
    TransaksiModule,
  ],
})
export class AppModule {}
