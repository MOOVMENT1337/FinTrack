import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operation } from './entities/operation.entity';
import { CreateOperationDto } from './dto/create-operation.dto';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class FinanceService {
  constructor(
    @InjectRepository(Operation)
    private operationRepository: Repository<Operation>,
  ) {}

  async createOperation(createOperationDto: CreateOperationDto, user: User): Promise<Operation> {
    const operation = this.operationRepository.create({
      ...createOperationDto,
      date: new Date(createOperationDto.date),
      user,
    });
    return this.operationRepository.save(operation);
  }

  async getUserOperations(userId: number): Promise<Operation[]> {
    return this.operationRepository.find({
      where: { user: { id: userId } },
      order: { date: 'DESC' },
    });
  }
}