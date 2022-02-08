import { ValidationError } from 'class-validator';
import { InsertResult, ObjectLiteral } from 'typeorm';
import { CreateCustomerInterface, CreateCustomerParams } from '../../../application/dto/customer.interface';
import { Customer } from '../../../domain/Customer';

export interface IService {
    insert(data: CreateCustomerInterface): Promise<ObjectLiteral> ;
    update(id: string, data: CreateCustomerInterface): void;
    delete(id: string): void;

}
