import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsNotEmpty } from 'class-validator';

export class ReadTicketDto {
  @ApiProperty({ name: 'id' })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @ApiProperty({ name: 'created_at' })
  @IsNotEmpty()
  @IsDate()
  readonly createdAt: Date;

  @ApiProperty({ name: 'priority' })
  @IsNotEmpty()
  @IsNumber()
  readonly priority: number;
}
