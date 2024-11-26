import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsNotEmpty } from 'class-validator';

export class TaskDto {
  @ApiProperty({ name: 'id' })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @ApiProperty({ name: 'status_id' })
  @IsNotEmpty()
  @IsNumber()
  readonly statusId: number;

  @ApiProperty({ name: 'agent_id' })
  @IsNotEmpty()
  @IsNumber()
  readonly agentId: number;

  @ApiProperty({ name: 'ticket_id' })
  @IsNotEmpty()
  @IsNumber()
  readonly ticketId: number;

  @ApiProperty({ name: 'created_at' })
  @IsNotEmpty()
  @IsDate()
  readonly createdAt: Date;

  @ApiProperty({ name: 'updated_at' })
  @IsNotEmpty()
  @IsDate()
  readonly updatedAt: Date;

  @ApiProperty({ name: 'deleted_at' })
  @IsNotEmpty()
  @IsDate()
  readonly deletedAt: Date;
}
