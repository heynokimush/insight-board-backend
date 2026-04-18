import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, OneToMany, CreateDateColumn
} from 'typeorm';
import { Company } from '../company/company.entity';
import { UserProject } from '../user-project/user-project.entity';
import { Dashboard } from '../dashboard/dashboard.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  project_code!: string;

  @Column()
  name!: string;

  @CreateDateColumn()
  created_at!: Date;

  @ManyToOne(() => Company, (company) => company.projects)
  company!: Company;

  @OneToMany(() => UserProject, (up) => up.project)
  userProjects!: UserProject[];

  @OneToMany(() => Dashboard, (dashboard) => dashboard.project)
  dashboards!: Dashboard[];
}