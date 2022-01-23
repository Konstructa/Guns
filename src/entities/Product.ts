import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Stock')
class Product {
    @PrimaryGeneratedColumn('increment')
      id: number;

    @Column()
      name: string;

    @Column()
      quantity:number;
}

export { Product };
