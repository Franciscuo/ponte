import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Ticket } from './entities';
import { TicketsRepository } from './repositories/tickets.repository';

@Module({
  providers: [TicketsRepository],
  imports: [TypeOrmModule.forFeature([Ticket])],
  exports: [TicketsRepository],
})
export class TicketsModule {}
