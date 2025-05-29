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

    const savedOperation = await this.operationRepository.save(operation);

    // Обновляем баланс
    const amount = createOperationDto.amount;
    if (createOperationDto.type === 'income') {
      user.balance += amount;
    } else {
      user.balance -= amount;
    }

    await this.operationRepository.manager.getRepository(User).save(user);

    
    return savedOperation;
    

  }
  
  async getUserOperations(userId: number): Promise<Operation[]> {
    return this.operationRepository.find({
      where: { user: { id: userId } },
      order: { date: 'DESC' },
    });
  }
}