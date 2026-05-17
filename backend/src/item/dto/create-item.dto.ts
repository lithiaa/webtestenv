import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  item_name!: string;

  @Type(() => Number)
  @IsInt()
  categoryId!: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  stock_amount!: number;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  minimum_stock?: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(0)
  selling_price?: number;

  
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(0)
  purchase_price?: number;

  @IsOptional()
  @IsString()
  weight_size?: string;

  @IsString()
  @IsNotEmpty()
  unit!: string;

  @IsOptional()
  @IsString()
  save_location?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
