import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {

  @ApiPropertyOptional({ example: 'john' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({ example: 'john@kopi.com' })
  @IsOptional()
  @IsEmail()
  email?: string;
}