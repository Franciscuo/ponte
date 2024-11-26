import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parser';
import { Injectable } from '@nestjs/common';

import { ReadTicketDto } from '../dtos';

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
}
