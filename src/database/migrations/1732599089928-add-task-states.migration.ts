import { MigrationInterface, QueryRunner } from 'typeorm';

import { TASK_STATES } from './data/task_states.migration';

export class AddTaskStates1732599089928 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO task_states (name, created_at, updated_at)
        VALUES
          ('${TASK_STATES.UNNASIGNED}', NOW(), NOW()),
          ('${TASK_STATES.IN_PROGRESS}', NOW(), NOW()),
          ('${TASK_STATES.FINISHED}', NOW(), NOW())
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM task_states
        WHERE name IN ('${TASK_STATES.UNNASIGNED}', '${TASK_STATES.IN_PROGRESS}', '${TASK_STATES.FINISHED}')
      `);
  }
}
