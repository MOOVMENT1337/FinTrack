import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/user.entity';
import { FinanceModule } from './finance/finance.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { Operation } from './finance/entities/operation.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'postgres',
      entities: [User, Operation],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    FinanceModule,
    AuthModule,
  ],
})
export class AppModule {}