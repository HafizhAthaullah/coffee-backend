import {
  Body, Controller, Get, Param,
  Patch, Post, UploadedFile,
  UseGuards, UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags, ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { TransaksiService } from './transaksi.service';
import { UpdateStatusDto } from './dto/update-status.dto';
import { CreateTransaksiDto } from './dto/create-transaksi.dto';
import { JwtAuthGuard } from 'src/helper/jwt-auth.guard';
import { Roles } from 'src/helper/roles.decorator';
import { RolesGuard } from 'src/helper/roles-guard';

@ApiTags('Transaksi')
@ApiBearerAuth()
@Controller('transaksi')
export class TransaksiController {

  constructor(private transaksiService: TransaksiService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Get()
  findAll() {
    return this.transaksiService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transaksiService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: CreateTransaksiDto) {
    return this.transaksiService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('upload-bukti/:pesananId')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/bukti',
        filename: (req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, unique + extname(file.originalname));
        },
      }),
    }),
  )
  uploadBukti(
    @Param('pesananId') pesananId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.transaksiService.updateBukti(
      Number(pesananId),
      `/uploads/bukti/${file.filename}`,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/metode-bayar')
  updateMetodeBayar(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.transaksiService.updateMetodeBayar(+id, body.metode_bayar);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: UpdateStatusDto,
  ) {
    return this.transaksiService.updateStatus(+id, body.status);
  }
}