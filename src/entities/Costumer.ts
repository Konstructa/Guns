import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

import { IsEmail } from 'class-validator';

@Entity('Costumers')
class Costumer {
  @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
      name: string;

    @Column()
      username: string;

    @Column()
    @IsEmail()
      email: string;

    @Column()
      password: string;

    @Column()
      gems: number;

    @CreateDateColumn()
      created_at: Date;

    @UpdateDateColumn({ onUpdate: 'CURRENT_TIMESTAMP(6)' })
      update_at: Date;
}

export { Costumer };
