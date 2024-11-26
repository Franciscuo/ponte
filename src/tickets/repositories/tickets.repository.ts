import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Ticket } from '../entities/ticket.entity';

@Injectable()
export class TicketsRepository extends Repository<Ticket> {
  constructor(
    @InjectRepository(Ticket)
    repository: Repository<Ticket>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
