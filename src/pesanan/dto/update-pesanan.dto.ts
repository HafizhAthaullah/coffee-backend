import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdatePesananDto {

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  menuId?: number;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsInt()
  jumlah?: number;

  @ApiPropertyOptional({ example: 'Kurang gula' })
  @IsOptional()
  @IsString()
  catatan?: string;
}