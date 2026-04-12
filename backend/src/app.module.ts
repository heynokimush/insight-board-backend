import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'RDS엔드포인트',
  port: 3306,
  username: 'root',
  password: '123098',
  database: 'insight',
  autoLoadEntities: true,
  synchronize: true, // 개발용만
})

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
