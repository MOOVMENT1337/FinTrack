import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, OneToMany } from 'typeorm';
import { Operation } from '../../finance/entities/operation.entity';
import * as bcrypt from 'bcryptjs';

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  
  @OneToMany(() => Operation, (operation) => operation.user)
  operations!: Operation[];

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}