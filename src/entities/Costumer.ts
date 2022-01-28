import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

import {
  IsEmail, IsString, IsInt, Min,
} from 'class-validator';

@Entity('Costumers')
class Costumer {
  @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsString({ message: 'O nome precisa ser uma string' })
      name: string;

    @Column()
    @IsString({ message: 'O username precisa ser uma string' })
      username: string;

    @Column()
    @IsEmail({ message: 'Seu email não é valido' })
      email: string;

    @Column()
    @IsString({ message: 'Sua senha deve conter carecteres, não só números!' })
      password: string;

    @Column()
    @IsInt({ message: 'As gemas são números inteiros!' })
    @Min(0, { message: 'O valor não pode ser menor que 0' })
      gems: number;

    @CreateDateColumn()
      created_at: Date;

    @UpdateDateColumn({ onUpdate: 'CURRENT_TIMESTAMP(6)' })
      update_at: Date;
}

export { Costumer };
