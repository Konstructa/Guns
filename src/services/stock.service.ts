import { getRepository } from 'typeorm';
import { Product } from '../entities/Product';
import { IProduct } from '../interface/product';

class StockService {
  static async insert({ name, quantity }: IProduct) {
    const product = await getRepository(Product)
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values(
        {
          name,
          quantity,
        },
      )
      .execute();
    console.log(product);
  }

  static async update(id: number, updateQuantityProduct: number) {
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
