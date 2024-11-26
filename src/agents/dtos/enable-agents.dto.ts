import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class EnableAgentsDto {
  @ApiProperty({ name: 'count' })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  count: number;
}
