import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, CreateDateColumn
} from 'typeorm';
import { Project } from '../project/project.entity';

@Entity()
export class Dashboard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  dashboard_code!: string;

  @Column()
  name!: string;

  @Column({ type: 'json' })
  config: any;

  @CreateDateColumn()
  created_at!: Date;

  @ManyToOne(() => Project, (project) => project.dashboards)
  project!: Project;
}