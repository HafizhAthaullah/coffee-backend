import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export enum Kategori {
  espresso     = 'espresso',
  manual_brew  = 'manual_brew',
  non_coffee   = 'non_coffee',
  food         = 'food',
  minuman_lain = 'minuman_lain',
}

export class CreateMenuDto {

  @IsString()
    nama!: string;

  @IsInt()
    harga!: number;

  @IsString()
    deskripsi!: string;

  @IsEnum(Kategori)
    kategori!: Kategori;

  @IsOptional()
  @IsString()
    image?: string;

  @IsOptional()
  @IsBoolean()
    tersedia?: boolean;
}
