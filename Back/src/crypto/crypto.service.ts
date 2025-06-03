import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { BitcoinWallet } from '../crypto/entities/bitcoin.entity';
import { EthereumWallet } from '../crypto/entities/ethereum.entity';

@Injectable()
export class CryptoService {
  constructor(
    @InjectRepository(BitcoinWallet)
    private readonly bitcoinRepo: Repository<BitcoinWallet>,
    @InjectRepository(EthereumWallet)
    private readonly ethRepo: Repository<EthereumWallet>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getUserBitcoin(userId: number): Promise<BitcoinWallet> {
    const wallet = await this.bitcoinRepo.findOne({ 
      where: { user: { id: userId } },
      relations: ['user'] // Добавляем если нужно загрузить связанного пользователя
    });
    
    if (!wallet) {
      // Создаем новый кошелек, если не найден
      const user = await this.userRepo.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const newWallet = this.bitcoinRepo.create({ user, balance: 0 });
      return this.bitcoinRepo.save(newWallet);
    }
    
    return wallet;
  }

  async updateBitcoinBalance(userId: number, amount: number): Promise<BitcoinWallet> {
    let wallet = await this.bitcoinRepo.findOne({ 
      where: { user: { id: userId } },
      relations: ['user']
    });
    
    if (!wallet) {
      const user = await this.userRepo.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      wallet = this.bitcoinRepo.create({ user, balance: amount });
    } else {
      wallet.balance = amount;
    }
    
    return this.bitcoinRepo.save(wallet);
  }

  async getUserEthereum(userId: number): Promise<EthereumWallet> {
    const wallet = await this.ethRepo.findOne({ 
      where: { user: { id: userId } },
      relations: ['user']
    });
    
    if (!wallet) {
      const user = await this.userRepo.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const newWallet = this.ethRepo.create({ user, balance: 0 });
      return this.ethRepo.save(newWallet);
    }
    
    return wallet;
  }

  async updateEthereumBalance(userId: number, amount: number): Promise<EthereumWallet> {
    let wallet = await this.ethRepo.findOne({ 
      where: { user: { id: userId } },
      relations: ['user']
    });
    
    if (!wallet) {
      const user = await this.userRepo.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      wallet = this.ethRepo.create({ user, balance: amount });
    } else {
      wallet.balance = amount;
    }
    
    return this.ethRepo.save(wallet);
  }
}