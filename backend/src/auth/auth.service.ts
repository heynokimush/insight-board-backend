import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../common/redis/redis.service';

import { User } from '../user/user.entity';
import { UserProject } from '../user-project/user-project.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private redisService: RedisService,
    
    // User 테이블 접근
    @InjectRepository(User)
    private userRepo: Repository<User>,

    // UserProject 테이블 접근 (role + project 가져오기용)
    @InjectRepository(UserProject)
    private userProjectRepo: Repository<UserProject>,
  ) {}

  async login(dto: LoginDto) {
    const { email, password } = dto;

    // 1️⃣ 이메일로 유저 조회
    const user = await this.userRepo.findOne({
      where: { email },
      relations: ['company'],
    });

    if (!user) {
      throw new UnauthorizedException('유저 없음');
    }

    // 2️⃣ 비밀번호 비교 (해시 vs 입력값)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('비밀번호 틀림');
    }

    // 3️⃣ 유저가 속한 프로젝트 + role 조회
    const userProjects = await this.userProjectRepo.find({
      where: { user: { id: user.id } },
      relations: ['project'], // project까지 같이 가져옴
    });

    // 4️⃣ JWT 토큰 생성
    const accessToken = this.jwtService.sign(
        { sub: user.id },
        { expiresIn: '1h' },
    );

    // ✅ Refresh Token
    const refreshToken = this.jwtService.sign(
        { sub: user.id },
        { expiresIn: '7d' },
    );

    // ✅ Redis 저장
    await this.redisService.set(
        `refresh:${user.id}`,
        refreshToken,
        60 * 60 * 24 * 7,
    );

    // 만료 시간 (프론트에서 쓰기 좋게)
    const expiresAt = Date.now() + 3600 * 1000;

    // 5️⃣ 응답 형태 맞춰주기
    return {
      accessToken,
      refreshToken, // 👉 컨트롤러에서 쿠키로 처리
      accessTokenExpiresAt: String(expiresAt),
      email: user.email,
      name: user.name,
      companyName: user.company?.name,
      projectList: userProjects.map((up) => ({
        id: up.project.projectCode,
        name: up.project.name,
        description: up.project.description,
        role: up.role,
      })),
    };
  }
}