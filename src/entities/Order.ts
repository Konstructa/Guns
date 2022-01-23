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
    @PrimaryGeneratedColumn('increment')
      id: number;

    @Column()
      productsQuantity: number;

    @OneToOne(() => Product)
    @JoinColumn()
      product: Product;

    @OneToOne(() => Costumer)
    @JoinColumn()
      costumer: Costumer;

    @CreateDateColumn()
      created_at: Date;
}

export { Order };
