import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsInt, IsString } from 'class-validator';

@Entity('Stock')
class Product {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @IsString({ message: 'O nome precisa ser uma string' })
    name: string;

  @Column()
    description:string;

  @IsInt({ message: 'O valor é dado em numeros inteiros!' })
    price: number;

  @IsInt()
    quantity: number;
}

export { Product };
