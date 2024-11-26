import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tickets', schema: 'public' })
export class Ticket {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'priority', type: 'integer' })
  priority: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date;

  @BeforeInsert()
  setCreateDate(): void {
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  setUpdateDate(): void {
    this.updatedAt = new Date();
  }

  constructor(ticket: Partial<Ticket>) {
    Object.assign(this, ticket);
  }
}
