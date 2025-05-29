import { Controller, Post, Body, UseGuards, Req, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: any) {
    // В реальном приложении здесь можно добавить токен в blacklist
    return { message: 'Logged out successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  async updateUser(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    // Реализация обновления данных пользователя
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async deleteAccount(@Req() req: any) {
    // Реализация удаления аккаунта
  }
}