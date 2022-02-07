import { getRepository, Repository } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { Customer } from '../../domain/Customer';
import { CreateCustomerParams } from '../../application/dto/customer.interface';
import { ICustomerService } from './protocol/ICustomerService';

export class CustomerService {
  constructor(
    private customerRepository: ICustomerService,
  ) {
  }

  async insert(data: CreateCustomerParams) {
    /*  const teste = this.customerRepository.create(
      data,
    );
    const error = await validate(teste);

    if (error.length === 0) { */
    this.customerRepository.insert(data);
  }

  // return error;

  async update(id: string, {
    name, username, email, password, gems,
  }: CreateCustomerParams): Promise<void> {
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
      .set({
        name, username, email, password, gems,
      })
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
