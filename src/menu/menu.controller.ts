import {
  Body, Controller, Delete, Get, Param,
  Patch, Post, Query, UploadedFile,
  UseGuards, UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags, ApiBearerAuth,
  ApiConsumes, ApiBody,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { JwtAuthGuard } from 'src/helper/jwt-auth.guard';
import { Roles } from 'src/helper/roles.decorator';
import { RolesGuard } from 'src/helper/roles-guard';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {

  constructor(private menuService: MenuService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateMenuDto })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/menu',
        filename: (req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, unique + extname(file.originalname));
        },
      }),
    }),
  )
  create(
    @Body() body: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (body.harga) body.harga = +body.harga;
    if (body.tersedia !== undefined)
      body.tersedia = body.tersedia === 'true';
    return this.menuService.create(body, file);
  }

  @Get()
  findAll(@Query('kategori') kategori?: string) {
    if (kategori) return this.menuService.findByKategori(kategori);
    return this.menuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/menu',
        filename: (req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, unique + extname(file.originalname));
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (body.harga) body.harga = +body.harga;
    if (body.tersedia !== undefined)
      body.tersedia = body.tersedia === 'true';
    return this.menuService.update(+id, body, file);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
}
  }