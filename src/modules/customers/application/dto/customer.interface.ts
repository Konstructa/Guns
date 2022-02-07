import { Customer } from '../../domain/Customer';

export type CreateCustomerParams = Omit<Customer, 'id' | 'created_at' | 'update_at'>;
