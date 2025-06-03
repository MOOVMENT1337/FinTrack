import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CryptoService } from './crypto.service';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    // другие поля пользователя, если есть
  };
}

@Controller('crypto')
@UseGuards(AuthGuard('jwt')) // Используем JWT guard
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Get('bitcoin')
  async getBitcoin(@Req() req: AuthenticatedRequest) {
    return this.cryptoService.getUserBitcoin(req.user.id);
  }

  @Post('bitcoin')
  async updateBitcoin(
    @Req() req: AuthenticatedRequest,
    @Body('amount') amount: number,
  ) {
    return this.cryptoService.updateBitcoinBalance(req.user.id, amount);
  }

  @Get('ethereum')
  async getEthereum(@Req() req: AuthenticatedRequest) {
    return this.cryptoService.getUserEthereum(req.user.id);
  }

  @Post('ethereum')
  async updateEthereum(
    @Req() req: AuthenticatedRequest,
    @Body('amount') amount: number,
  ) {
    return this.cryptoService.updateEthereumBalance(req.user.id, amount);
  }
}