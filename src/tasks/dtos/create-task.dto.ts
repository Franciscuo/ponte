import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ name: 'agent_id' })
  @IsNotEmpty()
  @IsNumber()
  agentId: number;

  @ApiProperty({ name: 'ticket_id' })
  @IsNotEmpty()
  @IsNumber()
  ticketId: number;
}
