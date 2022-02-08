import { getRepository, Repository } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { Customer } from '../../domain/Customer';
import { CreateCustomerInterface, CreateCustomerParams } from '../../application/dto/customer.interface';
import { ICustomerService } from './protocol/ICustomerService';
import { IService } from './protocol/IServiceProtocol';
import CustomerRepositoryCreate from '../../domain/customerRepository';

export class CustomerService implements IService {
  private customerRepository: ICustomerService;

  constructor(
    customerRepository: ICustomerService,
  ) {
    this.customerRepository = customerRepository;
  }

  public async insert(data: CreateCustomerInterface) {
    const oi = await this.customerRepository.insert(data);
    console.log(oi);
    return oi;
  }


  public async update(id: string, data: CreateCustomerParams): Promise<void> {
    /*     const teste = getRepository(Customer).create({
      name,
      username,
      email,
      password,
      gems,
    });
    const error = await validate(teste);
    console.log(error);
 */
    /* if (error.length === 0) { */
    const aswer = await getRepository(Customer)
      .createQueryBuilder()
      .update(Customer)
      .set(
        data,
      )
      .where('id = :id', { id })
      .execute();
    console.log(aswer);
    /* }

    return error; */
  }

  /* async updateGems(id: string, gems: number) {
    await getRepository(Customer)
      .createQueryBuilder()
      .update(Customer)
      .set({
        gems,
      })
      .where('id = :id', { id })
      .execute();
  } */

  async delete(id: string) {
    await getRepository(Customer)
      .createQueryBuilder()
      .delete()
      .from(Customer)
      .where('id = :id', { id })
      .execute();
  }

  /*  async find(username: string) {
    const search: Customer | undefined = await getRepository(Customer)
      .createQueryBuilder()
      .where('username = :username', { username })
      .getOne();

    return search;
  }  */
}
