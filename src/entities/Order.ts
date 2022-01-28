import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { IsInt } from 'class-validator';
import { Costumer } from './Costumer';
import { Product } from './Product';

@Entity('Orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsInt({ message: 'A quantidade é em némeros inteiros!' })
      products_quantity: number;

    @Column()
      amount: number;

    @OneToOne(() => Product)
    @JoinColumn()
      product: Product;

    @OneToOne(() => Costumer, { onDelete: 'CASCADE' })
    @JoinColumn()
      costumer: Costumer;

    @CreateDateColumn()
      created_at: Date;
}

export { Order };
