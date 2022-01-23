import { getRepository } from 'typeorm';
import { Costumer } from '../entities/Costumer';
import ICostumer from '../interface/custumer';

class CostumerService {
  static async insert({ user, hashedPassword }:ICostumer) {
    const costumers = await getRepository(Costumer)
      .createQueryBuilder()
      .insert()
      .into(Costumer)
      .values(
        {
          user,
          password: hashedPassword,
        },
      )
      .execute();
    console.log(costumers);
    return costumers;
  }
}

export { CostumerService };
