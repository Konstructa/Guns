import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Stock')
class Product {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column()
    name: string;

  @Column()
    description:string;

  @Column()
    price: number;

  @Column()
    quantity: number;
}

export { Product };
