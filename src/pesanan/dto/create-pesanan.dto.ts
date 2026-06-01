import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePesananDto {

  @ApiProperty({ example: 1 })
  @IsInt()
  menuId!: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  jumlah!: number;

  @ApiPropertyOptional({ example: 'Kurang gula' })
  @IsOptional()
  @IsString()
  catatan?: string;
}