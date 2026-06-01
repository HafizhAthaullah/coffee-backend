import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { PesananService }
from './pesanan.service';

import { JwtAuthGuard }
from 'src/helper/jwt-auth.guard';

import { Roles }
from 'src/helper/roles.decorator';

import { RolesGuard }
from 'src/helper/roles-guard';

import { UpdateStatusDto }
from './dto/update-status.dto';

@Controller('pesanan')
export class PesananController {

  constructor(
    private pesananService: PesananService,
  ) {}

  // BUAT PESANAN (Customer)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() body: any,
    @Req() req: any,
  ) {
    return this.pesananService.create(
      body,
      req.user,
    );
  }

  // GET SEMUA PESANAN (Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Get()
  findAll() {
    return this.pesananService.findAll();
  }

  // GET PESANAN SAYA (Customer)
  @UseGuards(JwtAuthGuard)
  @Get('my')
  findMy(@Req() req: any) {
    return this.pesananService.findByUser(
      req.user.id,
    );
  }

  // GET DETAIL PESANAN
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pesananService.findOne(+id);
  }

  // UPDATE STATUS PESANAN (Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: UpdateStatusDto,
  ) {
    return this.pesananService.updateStatus(
      +id,
      body.status,
    );
  }
}
