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

  @Column()
  @IsString({ message: 'O nome precisa ser uma string' })
    name: string;

  @Column()
    description:string;

  @Column()
  @IsInt({ message: 'O valor é dado em numeros inteiros!' })
    price: number;

  @Column()
  @IsInt({ message: 'O valor é dado em numeros inteiros!' })
    quantity: number;
}

export { Product };
