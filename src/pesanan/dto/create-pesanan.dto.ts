import {
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreatePesananDto {

  @IsInt()
    menuId!: number;

  @IsInt()
  @Min(1)
    jumlah!: number;

  @IsOptional()
  @IsString()
    catatan?: string;
}
