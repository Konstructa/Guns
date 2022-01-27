import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Costumer } from './Costumer';
import { Product } from './Product';

@Entity('Orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
      productsQuantity: number;

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
