import { getRepository } from 'typeorm';
import { Order } from '../entities/Order';

class OrderService {
  static async execute(productsQuantity: number, existsProduct: any, existsCostumer: any) {
    const createOrder = new Order();
    createOrder.costumer = existsCostumer;
    createOrder.product = existsProduct;
    createOrder.productsQuantity = productsQuantity;

    const product1 = await getRepository(Order)
      .createQueryBuilder()
      .insert()
      .into(Order)
      .values(createOrder)
      .execute();
    console.log(product1);
  }
}

export { OrderService };
