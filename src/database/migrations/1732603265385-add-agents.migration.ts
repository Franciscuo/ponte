import { MigrationInterface, QueryRunner } from 'typeorm';

import { AGENTS } from './data/agents.migration';

export class AddAgents1732603265385 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const agent of AGENTS) {
      await queryRunner.query(`
        INSERT INTO agents (id, name)
        VALUES ('${agent.id}', '${agent.name}');
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const agent of AGENTS) {
      await queryRunner.query(`
        DELETE FROM agents WHERE id = ${agent.id};
      `);
    }
  }
}
