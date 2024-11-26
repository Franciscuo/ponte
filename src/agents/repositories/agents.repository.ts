import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Agent } from '../entities/agent.entity';

@Injectable()
export class AgentsRepository extends Repository<Agent> {
  constructor(
    @InjectRepository(Agent)
    repository: Repository<Agent>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
