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

  public async createTicket(data: {
    id: number;
    priority: number;
    setCreateDate: Date;
  }): Promise<Ticket> {
    const actualTicket = await this.findOne({ where: { id: data.id } });
    if (actualTicket) {
      return actualTicket;
    }

    const newTicket = this.create({
      id: data.id,
      priority: data.priority,
      createdAt: data.setCreateDate,
    });

    return await this.save(newTicket);
  }
}
