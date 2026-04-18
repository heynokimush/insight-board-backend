import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne
} from 'typeorm';
import { User } from '../user/user.entity';
import { Project } from '../project/project.entity';

@Entity()
export class UserProject {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  role!: string; // admin, viewer

  @ManyToOne(() => User, (user) => user.userProjects)
  user!: User;

  @ManyToOne(() => Project, (project) => project.userProjects)
  project!: Project;
}