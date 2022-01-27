import { getRepository } from 'typeorm';
import { Product } from '../entities/Product';
import { IProduct } from '../interface/product';

class StockService {
  static async insert({
    name, description, price, quantity,
  }: IProduct) {
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
