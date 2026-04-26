import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth') // /auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login') // POST /auth/login
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
) {
    const result = await this.authService.login(dto);

    // 🍪 refreshToken 쿠키 저장
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: true, // https면 true로 변경
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return {
      status: 200,
      data: {
        ...result,
        refreshToken: undefined, // 👉 body에서 제거
      },
    };
  }
}