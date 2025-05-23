import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RequestWithUser } from '../auth/interfaces/request-with-user.interface';

@Controller('finance')
@UseGuards(JwtAuthGuard)
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Post('operation')
  async createOperation(
    @Body() createOperationDto: CreateOperationDto,
    @Req() req: RequestWithUser,
  ) {
    return this.financeService.createOperation(createOperationDto, req.user);
  }

  @Get('operations')
  async getUserOperations(@Req() req: RequestWithUser) {
    return this.financeService.getUserOperations(req.user.id);
  }
}
