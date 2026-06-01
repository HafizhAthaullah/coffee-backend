import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {

  @ApiProperty({ example: 'john' })
  @IsString()
  username!: string;

  @ApiProperty({ example: 'john@kopi.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  password!: string;
}