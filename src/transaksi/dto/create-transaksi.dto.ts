import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTransaksiDto {

  @ApiProperty({ example: 1 })
  @IsInt()
  pesananId!: number;

  @ApiPropertyOptional({ example: 'transfer' })
  @IsOptional()
  @IsString()
  metode_bayar?: string;
}