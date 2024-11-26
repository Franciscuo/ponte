import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parser';
import { stringify } from 'csv-stringify';
import { Injectable } from '@nestjs/common';

import { ReadTicketDto, WriteTicketDto } from '../dtos';

@Injectable()
export class ReportsService {
  public readCSV(filePath: string): Promise<ReadTicketDto[]> {
    return new Promise((resolve, reject) => {
      const tickets: ReadTicketDto[] = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          const user: ReadTicketDto = {
            id: Number(row.id),
            createdAt: new Date(row.fecha_creacion),
            priority: Number(row.prioridad),
          };
          tickets.push(user);
        })
        .on('end', () => {
          resolve(tickets);
        })
        .on('error', (error) => {
          console.error('Error reading CSV file:', error);
          reject(error);
        });
    });
  }

  public async read(): Promise<ReadTicketDto[]> {
    const csvFilePath = path.join(__dirname, '../../../../tickets_dataset.csv');

    return await this.readCSV(csvFilePath);
  }

  public writeCSV(data: WriteTicketDto[]): Promise<void> {
    const csvFilePath = path.join(__dirname, '../../../../response.csv');

    return new Promise((resolve, reject) => {
      const writableStream = fs.createWriteStream(csvFilePath);
      const csvStringifier = stringify({
        header: true,
        columns: {
          id: 'id',
          fecha_creacion: 'fecha_creacion',
          prioridad: 'prioridad',
          agente: 'agente',
          fecha_asignacion: 'fecha_asignacion',
          fecha_resolucion: 'fecha_resolucion',
        },
      });

      csvStringifier.pipe(writableStream);
      data.forEach((row) => {
        csvStringifier.write({
          id: row.id,
          fecha_creacion: row.fecha_creacion.toISOString(),
          prioridad: row.prioridad,
          agente: row.agente,
          fecha_asignacion: row.fecha_asignacion.toISOString(),
          fecha_resolucion: row.fecha_resolucion.toISOString(),
        });
      });
      csvStringifier.end();

      writableStream.on('finish', () => {
        resolve();
      });
      writableStream.on('error', (error) => {
        console.error('Error writing CSV file:', error);
        reject(error);
      });
    });
  }
}
