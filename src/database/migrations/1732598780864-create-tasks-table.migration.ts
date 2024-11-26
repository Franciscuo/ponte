import {
  Table,
  QueryRunner,
  TableForeignKey,
  MigrationInterface,
} from 'typeorm';

export class CreateTasksTable1732598780864 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'status_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'agent_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'ticket_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'asignation_date',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'resolution_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
            default: null,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'tasks',
      new TableForeignKey({
        name: 'tasks_task_states_FK',
        columnNames: ['status_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'task_states',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'tasks',
      new TableForeignKey({
        name: 'tasks_agents_FK',
        columnNames: ['agent_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'agents',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'tasks',
      new TableForeignKey({
        name: 'tasks_tickets_FK',
        columnNames: ['ticket_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tickets',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('task', 'tasks_task_states_FK');
    await queryRunner.dropForeignKey('task', 'tasks_agents_FK');
    await queryRunner.dropForeignKey('task', 'tasks_tickets_FK');
    await queryRunner.dropTable('tasks');
  }
}
