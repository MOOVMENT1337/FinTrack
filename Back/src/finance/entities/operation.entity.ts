import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Operation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  amount!: number;

  @Column()
  type!: 'income' | 'expense'; // Тип операции: доход или расход

  @Column()
  category!: string; // Категория операции

  @Column()
  date!: Date;

  @Column({ nullable: true })
  description!: string;

  @ManyToOne(() => User, (user) => user.operations)
  user!: User;
}