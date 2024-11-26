import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Agent } from './entities';
import { AgentsRepository } from './repositories/agents.repository';

@Module({
  providers: [AgentsRepository],
  imports: [TypeOrmModule.forFeature([Agent])],
  exports: [AgentsRepository],
})
export class AgentsModule {}
