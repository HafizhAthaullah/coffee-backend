import {
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTransaksiDto {

  @IsInt()
    pesananId!: number;

  @IsInt()
    total!: number;

  @IsOptional()
  @IsString()
    metode_bayar?: string;

  @IsOptional()
  @IsString()
    bukti?: string;
}
