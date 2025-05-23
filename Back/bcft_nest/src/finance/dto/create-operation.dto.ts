import { IsNumber, IsString, IsIn, IsDateString, IsOptional } from 'class-validator';

export class CreateOperationDto {
  @IsNumber()
  amount!: number;

  @IsString()
  @IsIn(['income', 'expense'])
  type!: 'income' | 'expense';

  @IsString()
  category!: string;

  @IsDateString()
  date!: string;

  @IsString()
  @IsOptional()
  description?: string;
}