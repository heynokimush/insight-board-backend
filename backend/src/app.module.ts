import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user/user.entity';
import { Company } from './company/company.entity';
import { Project } from './project/project.entity';
import { UserProject } from './user-project/user-project.entity';
import { Dashboard } from './dashboard/dashboard.entity';

TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'insight-board.cdyy6uq0m3zz.ap-southeast-2.rds.amazonaws.com',
  port: 3306,
  username: 'root',
  password: '123098',
  database: 'insight',
  autoLoadEntities: true,
  synchronize: true, // 개발용만
  entities: [User, Company, Project, UserProject, Dashboard],
})

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
