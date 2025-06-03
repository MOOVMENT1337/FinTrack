import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, OneToMany } from 'typeorm';
import { Operation } from '../../finance/entities/operation.entity';
import { BitcoinWallet } from '../../crypto/entities/bitcoin.entity';
import { EthereumWallet } from '../../crypto/entities/ethereum.entity';

import * as bcrypt from 'bcryptjs';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username: string = "";

  @Column({ unique: true })
  email: string = "";

  @Column()
  password: string = "";

  @CreateDateColumn()
  createdAt: Date = new Date(); // Автоматически инициализируется TypeORM

   @Column({ default: 0 })
  balance!: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole = UserRole.USER;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  
  @OneToMany(() => Operation, (operation) => operation.user)
  operations!: Operation[];

  @OneToMany(() => BitcoinWallet, (bitcoinWallet) => bitcoinWallet.user)
  bitcoinWallets!: BitcoinWallet[];

  @OneToMany(() => EthereumWallet, (ethereumWallet) => ethereumWallet.user)
  ethereumWallets!: EthereumWallet[];

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }
}
