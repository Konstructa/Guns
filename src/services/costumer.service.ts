import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { Costumer } from '../entities/Costumer';
import ICostumer from '../interface/custumer';

class CostumerService {
  static async insert({
    name, username, email, hashedPassword, gems,
  }: ICostumer) {
    const teste = getRepository(Costumer).create({
      name,
      username,
      email,
      password: hashedPassword,
      gems,
    });
    const error = await validate(teste);

    if (error.length === 0) {
      await getRepository(Costumer)
        .createQueryBuilder()
        .insert()
        .into(Costumer)
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
  }: ICostumer) {
    const aswer = await getRepository(Costumer)
      .createQueryBuilder()
      .update(Costumer)
      .set({
        name, username, email, password: hashedPassword, gems,
      })
      .where('id = :id', { id })
      .execute();
    console.log(aswer);
  }

  static async delete(id: string) {
    await getRepository(Costumer)
      .createQueryBuilder()
      .delete()
      .from(Costumer)
      .where('id = :id', { id })
      .execute();
  }
}

export { CostumerService };
