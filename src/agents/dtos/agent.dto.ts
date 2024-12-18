import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class AgentDto {
  @ApiProperty({ name: 'id' })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @ApiProperty({ name: 'name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

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
