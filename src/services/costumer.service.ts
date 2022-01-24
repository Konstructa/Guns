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
    return costumers.generatedMaps[0];
  }

  static async update(id: number, user: string, password: string) {
    await getRepository(Costumer)
      .createQueryBuilder()
      .update(Costumer)
      .set({ user, password })
      .where('id = :id', { id })
      .execute();
  }

  static async delete(id: number) {
    await getRepository(Costumer)
      .createQueryBuilder()
      .delete()
      .from(Costumer)
      .where('id = :id', { id })
      .execute();
  }
}

export { CostumerService };
