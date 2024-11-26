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

  public async disableAllAgents(): Promise<void> {
    await this.update({}, { enabled: false });
  }

  public async enableAgents(count: number): Promise<void> {
    await this.createQueryBuilder()
      .update(Agent)
      .set({ enabled: true })
      .limit(count)
      .execute();
  }

  public async getEnabledAgents(): Promise<Agent[]> {
    return this.find({ where: { enabled: true } });
  }
}
