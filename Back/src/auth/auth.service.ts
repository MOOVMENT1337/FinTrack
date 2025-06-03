import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /* ----------- register ----------- */
  async register(registerDto: RegisterDto) {
    const { username, email, password } = registerDto;

    const userExists = await this.usersRepository.findOne({
      where: [{ username }, { email }],
    });
    if (userExists) {
      throw new Error('Username or email already exists');
    }

    const user = this.usersRepository.create({ username, email, password });
    await this.usersRepository.save(user);

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
    };
  }

  /* ----------- login ----------- */
  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
    };
  }

  /* ----------- validateUser (для JwtGuard) ----------- */
  async validateUser(payload: any) {
    return await this.usersRepository.findOne({ where: { id: payload.sub } });
  }

  /* ----------- updateUser ----------- */
  async updateUser(userId: number, dto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    if (dto.username && dto.username !== user.username) {
      const exists = await this.usersRepository.findOne({
        where: { username: dto.username },
      });
      if (exists) throw new Error('Username already taken');
      user.username = dto.username;
    }

    if (dto.password) {
      user.password = await bcrypt.hash(dto.password, 10);
    }

    await this.usersRepository.save(user);

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
    };
  }

  /* ----------- ✅ новый метод getUser ----------- */
  async getUser(userId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
