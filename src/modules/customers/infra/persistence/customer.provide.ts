import { ValidationError } from 'class-validator';
import { CreateCustomerParams } from '../../application/dto/customer.interface';
import { Customer } from '../../domain/Customer';
import { ICustomerService } from './protocol/ICustomerService';

export class CustomerRepository implements ICustomerService {
  private customer: Customer[] = [];

  async insert(data: CreateCustomerParams): Promise<void> {
    this.customer.push(data);
  }

  update(
    id: string,
    data
  : CreateCustomerParams,
  ) {
    this.customer.push(data);
  }

  delete(id: string) {
    this.customer.shift();
  }
}
