import { User } from '../entities/user.entity';
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: User; // Добавляем поле user к стандартному Request
}