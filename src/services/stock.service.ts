import { getRepository } from 'typeorm';
import { Product } from '../entities/Product';
import { IProduct } from '../interface/product';

class StockService {
  static async execute({ name, quantity }: IProduct) {
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
}

export { StockService };
