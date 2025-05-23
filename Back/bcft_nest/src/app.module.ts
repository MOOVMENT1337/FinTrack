import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/user.entity';
import { FinanceModule } from './finance/finance.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'test_db',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    FinanceModule,
  ],
})
export class AppModule {}