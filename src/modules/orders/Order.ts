import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { IsInt } from 'class-validator';
import { Customer } from '../customers/domain/Customer';
import { Product } from '../stock/Product';

@Entity('Orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsInt({ message: 'A quantidade é em némeros inteiros!' })
      products_quantity: number;

    @Column()
      value: number;

    @OneToOne(() => Product)
    @JoinColumn()
      product: Product;

    @OneToOne(() => Customer, { onDelete: 'CASCADE' })
    @JoinColumn()
      customer: Customer;

    @CreateDateColumn()
      created_at: Date;
}

export { Order };
