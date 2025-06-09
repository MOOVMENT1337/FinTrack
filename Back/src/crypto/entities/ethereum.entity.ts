import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity('ethereum_wallets')
export class EthereumWallet {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'balance_ethereum', type: 'decimal', precision: 18, scale: 8, default: 0 })
  balance!: number;

  @ManyToOne(() => User, (user) => user.ethereumWallets)
  user!: User;
}