import { getRepository } from 'typeorm';
import { Order } from '../entities/Order';

class OrderService {
  static async insert(productsQuantity: number, existsProduct: any, existsCostumer: any) {
    const createOrder = new Order();
    createOrder.costumer = existsCostumer;
    createOrder.product = existsProduct;
    createOrder.productsQuantity = productsQuantity;

    await getRepository(Order)
      .createQueryBuilder()
      .insert()
      .into(Order)
      .values(createOrder)
      .execute();
  }

  static async delete(id: number) {
    await getRepository(Order)
      .createQueryBuilder()
      .delete()
      .from(Order)
      .where('id = :id', { id })
      .execute();
  }
}

export { OrderService };
