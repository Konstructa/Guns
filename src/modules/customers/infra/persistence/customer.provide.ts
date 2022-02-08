import { ValidationError } from 'class-validator';
import { getRepository } from 'typeorm';
import { CreateCustomerInterface, CreateCustomerParams } from '../../application/dto/customer.interface';
import { Customer } from '../../domain/Customer';
import CustomerRepositoryCreate from '../../domain/customerRepository';
import { ICustomerService } from './protocol/ICustomerService';

export class CustomerRepository implements ICustomerService {
  private customer: Customer;

  private customerRepository: CustomerRepositoryCreate;

  public async insert(data: CreateCustomerInterface) {
    const newCustomer = this.customerRepository.create(data);
    const result = await getRepository(Customer)
      .createQueryBuilder()
      .insert()
      .into(Customer)
      .values(newCustomer)
      .execute();
    console.log(newCustomer, result);
    return result;
  }

  public update(
    id: string,
    data
  : CreateCustomerParams,
  ) {
    this.customerRepository.create(data);
  }

  public delete(id: string) {
    this.customerRepository.delete(id);
  }
}
