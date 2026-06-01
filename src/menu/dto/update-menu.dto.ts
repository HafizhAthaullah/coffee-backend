import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateMenuDto {

  @ApiPropertyOptional({ example: 'Cappuccino' })
  @IsOptional()
  @IsString()
  nama?: string;

  @ApiPropertyOptional({ example: 25000 })
  @IsOptional()
  @IsInt()
  harga?: number;

  @ApiPropertyOptional({ example: 'Espresso dengan susu foam lembut' })
  @IsOptional()
  @IsString()
  deskripsi?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  tersedia?: boolean;
}