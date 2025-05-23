import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'), // Гарантируем, что secretOrKey не undefined
      passReqToCallback: false // Явно указываем, что не используем Request
    });
  }

  async validate(payload: any) {
    return { 
      userId: payload.sub, 
      username: payload.username 
    };
  }
}