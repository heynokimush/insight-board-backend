import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, OneToMany, CreateDateColumn
} from 'typeorm';
import { Company } from '../company/company.entity';
import { UserProject } from '../user-project/user-project.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  user_code!: string; // 랜덤 ID

  @Column({ unique: true })
  email!: string;

  @Column()
  name!: string;

  @Column()
  password!: string; // bcrypt

  @CreateDateColumn()
  created_at!: Date;

  @ManyToOne(() => Company, (company) => company.users)
  company!: Company;

  @OneToMany(() => UserProject, (up) => up.user)
  userProjects!: UserProject[];
}