import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Costumers')
class Costumer {
    @PrimaryGeneratedColumn('increment')
      id: number;

    @Column()
      user: string;

    @Column()
      password: string;
}

export { Costumer };
