import {
  Body, Controller, Get, Param,
  Patch, Post, Req, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PesananService } from './pesanan.service';
import { CreatePesananDto } from './dto/create-pesanan.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { JwtAuthGuard } from 'src/helper/jwt-auth.guard';
import { Roles } from 'src/helper/roles.decorator';
import { RolesGuard } from 'src/helper/roles-guard';

@ApiTags('Pesanan')
@ApiBearerAuth()
@Controller('pesanan')
export class PesananController {

  constructor(private pesananService: PesananService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: CreatePesananDto, @Req() req: any) {
    return this.pesananService.create(body, req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Get()
  findAll() {
    return this.pesananService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  findMy(@Req() req: any) {
    return this.pesananService.findByUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pesananService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: UpdateStatusDto,
  ) {
    return this.pesananService.updateStatus(+id, body.status);
  }
}