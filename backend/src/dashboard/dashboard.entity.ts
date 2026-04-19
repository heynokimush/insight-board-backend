import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from '../project/project.entity';

@Entity()
export class Dashboard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  dashboardCode!: string;

  @Column()
  name!: string;

  @Column({ type: 'json' })
  config: any;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project!: Project;
}