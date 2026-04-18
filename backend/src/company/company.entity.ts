import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Project } from '../project/project.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  code!: string; // cp0001

  @Column()
  name!: string;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => User, (user) => user.company)
  users!: User[];

  @OneToMany(() => Project, (project) => project.company)
  projects!: Project[];
}