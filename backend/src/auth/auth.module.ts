import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { User } from '../user/user.entity';
import { UserProject } from '../user-project/user-project.entity';

import { JwtModule } from '@nestjs/jwt';
import { RedisService } from '../common/redis/redis.service';

@Module({
  imports: [
    // 이 엔티티들을 여기서 사용할 수 있게 등록
    TypeOrmModule.forFeature([User, UserProject]),

    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' }, // 기본 access
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, RedisService],
})
export class AuthModule {}