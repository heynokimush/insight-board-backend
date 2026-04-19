import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { User } from '../user/user.entity';
import { UserProject } from '../user-project/user-project.entity';

@Module({
  imports: [
    // 이 엔티티들을 여기서 사용할 수 있게 등록
    TypeOrmModule.forFeature([User, UserProject]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}