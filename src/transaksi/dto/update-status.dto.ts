import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export enum OrderStatus {
  pending         = 'pending',
  waiting_payment = 'waiting_payment',
  paid            = 'paid',
  on_process      = 'on_process',
  ready           = 'ready',
  completed       = 'completed',
  cancelled       = 'cancelled',
}

export class UpdateStatusDto {

  @ApiProperty({ enum: OrderStatus, example: OrderStatus.on_process })
  @IsEnum(OrderStatus)
  status!: OrderStatus;
}