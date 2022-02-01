import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { Customer } from '../../domain/Customer';
import ICustomer from '../../domain/customer.interface';

class CustomerService {
  static async insert({
    name, username, email, hashedPassword, gems,
  }: ICustomer) {
    const teste = getRepository(Customer).create({
      name,
      username,
      email,
      password: hashedPassword,
      gems,
    });
    const error = await validate(teste);

    if (error.length === 0) {
      await getRepository(Customer)
        .createQueryBuilder()
        .insert()
        .into(Customer)
        .values(
          {
            name,
            username,
            email,
            password: hashedPassword,
            gems,
          },
        )
        .execute();
    }

    return error;
  }

  static async update(id: string, {
    name, username, email, hashedPassword, gems,
  }: ICustomer) {
    const teste = getRepository(Customer).create({
      name,
      username,
      email,
      password: hashedPassword,
      gems,
    });
    const error = await validate(teste);
    console.log(error);

    if (error.length === 0) {
      const aswer = await getRepository(Customer)
        .createQueryBuilder()
        .update(Customer)
        .set({
          name, username, email, password: hashedPassword, gems,
        })
        .where('id = :id', { id })
        .execute();
      console.log(aswer);
    }

    return error;
  }

  static async updateGems(id: string, gems: number) {
    await getRepository(Customer)
      .createQueryBuilder()
      .update(Customer)
      .set({
        gems,
      })
      .where('id = :id', { id })
      .execute();
  }

  static async delete(id: string) {
    await getRepository(Customer)
      .createQueryBuilder()
      .delete()
      .from(Customer)
      .where('id = :id', { id })
      .execute();
  }

  static async find(username: string) {
    const search: Customer | undefined = await getRepository(Customer)
      .createQueryBuilder()
      .where('username = :username', { username })
      .getOne();

    return search;
  }
}

export { CustomerService };
