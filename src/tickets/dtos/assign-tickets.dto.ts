import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class AssignTicketsDto {
  @ApiProperty({ name: 'agent_count' })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  agent_count: number;
}
