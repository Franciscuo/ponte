import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Agent } from 'src/agents/entities';
import { Ticket } from 'src/tickets/entities';
import { TaskState } from './task-state.entity';

@Entity({ name: 'tasks', schema: 'public' })
export class Task {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'status_id', type: 'integer' })
  statusId: number;

  @ManyToOne(() => TaskState, (taskState) => taskState.id)
  @JoinColumn({ name: 'status_id' })
  status?: TaskState;

  @Column({ name: 'agent_id', type: 'integer' })
  agentId: number;

  @ManyToOne(() => Agent, (agent) => agent.id)
  @JoinColumn({ name: 'agent_id' })
  agent?: Agent;

  @Column({ name: 'ticket_id', type: 'integer' })
  ticketId: number;

  @ManyToOne(() => Ticket, (ticket) => ticket.id)
  @JoinColumn({ name: 'ticket_id' })
  ticket?: Ticket;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date;

  @BeforeInsert()
  setCreateDate(): void {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  setUpdateDate(): void {
    this.updatedAt = new Date();
  }

  constructor(task: Partial<Task>) {
    Object.assign(this, task);
  }
}
