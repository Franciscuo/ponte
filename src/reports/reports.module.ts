import { Module } from '@nestjs/common';

import { ReportsService } from './services/reports.service';

@Module({
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
