import { IsDate, IsNumber, IsNotEmpty } from 'class-validator';

export class WriteTicketDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsDate()
  fecha_creacion: Date;

  @IsNotEmpty()
  @IsNumber()
  prioridad: number;

  @IsNotEmpty()
  @IsNumber()
  agente: number;

  @IsNotEmpty()
  @IsDate()
  fecha_asignacion: Date;

  @IsNotEmpty()
  @IsDate()
  fecha_resolucion: Date;
}
