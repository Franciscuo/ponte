import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class HealthDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly version: string;
}
