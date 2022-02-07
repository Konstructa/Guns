import { ValidationError } from 'class-validator';
import { CreateCustomerParams } from '../../../application/dto/customer.interface';
import { Customer } from '../../../domain/Customer';

export interface ICustomerService {
    insert(data: CreateCustomerParams): void ;
    update(id: string, { name, username, email, password, gems, 
    }: CreateCustomerParams): void;
    delete(id: string): void;

}

/*
update(id: string, {
    name, username, email, hashedPassword, gems,
  }: CreateCustomerParams) */
