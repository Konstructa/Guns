import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { Product } from '../../domain/Product';
import { IProduct } from '../../domain/product.interface';

class StockService {
  static async insert({
    name, description, price, quantity,
  }: IProduct) {
    const teste = getRepository(Product).create({
      name,
      description,
      price,
      quantity,
    });

    const error = await validate(teste);

    if (error.length === 0) {
      await getRepository(Product)
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values(
          {
            name,
            description,
            price,
            quantity,
          },
        )
        .execute();
    }
    return error;
  }

  static async update(id: string, updateQuantityProduct: number) {
    await getRepository(Product)
      .createQueryBuilder()
      .update(Product)
      .set({ quantity: updateQuantityProduct })
      .where('id = :id', { id })
      .execute();
  }

  static async getAll() {
    const allProducts = await getRepository(Product)
      .createQueryBuilder()
      .getMany();

    return allProducts;
  }
}

export { StockService };
