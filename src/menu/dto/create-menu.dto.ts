import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export enum Kategori {
  coffee     = 'coffee',
  non_coffee = 'non_coffee',
  food       = 'food',
  snack      = 'snack',
}

export class CreateMenuDto {

  @ApiProperty({ example: 'Cappuccino' })
  @IsString()
  nama!: string;

  @ApiProperty({ example: 25000 })
  @IsInt()
  harga!: number;

  @ApiProperty({ example: 'Espresso dengan susu foam lembut' })
  @IsString()
  deskripsi!: string;

  @ApiProperty({ enum: Kategori, example: Kategori.coffee })
  @IsEnum(Kategori)
  kategori!: Kategori;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  tersedia?: boolean;
}