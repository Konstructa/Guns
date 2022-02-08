import { Repository, EntityRepository } from 'typeorm';
import { Customer } from './Customer';

@EntityRepository(Customer)
class CustomerRepositoryCreate extends Repository<Customer> {}

export default CustomerRepositoryCreate;
