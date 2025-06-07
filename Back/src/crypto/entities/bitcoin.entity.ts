import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity('bitcoin_wallets')
export class BitcoinWallet {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'balance_bitcoin', type: 'decimal', precision: 18, scale: 8, default: 0 })
  balance!: number;

  @ManyToOne(() => User, (user) => user.bitcoinWallets)
  user!: User;
}