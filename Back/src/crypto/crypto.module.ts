import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoService } from './crypto.service';
import { CryptoController } from './crypto.controller';
import { User } from '../auth/entities/user.entity';
import { BitcoinWallet } from '../crypto/entities/bitcoin.entity';
import { EthereumWallet } from '../crypto/entities/ethereum.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, BitcoinWallet, EthereumWallet]),
  ],
  providers: [CryptoService],
  controllers: [CryptoController],
})
export class CryptoModule {}