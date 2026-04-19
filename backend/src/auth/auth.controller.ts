import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth') // /auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login') // POST /auth/login
  async login(@Body() dto: LoginDto) {
    const data = await this.authService.login(dto);

    return {
      status: 200,
      data,
    };
  }
}