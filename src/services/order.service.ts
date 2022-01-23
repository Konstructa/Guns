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

  static async findCostumer(id: number) {
    const getCostumerDetailsById = await getRepository(Order)
      .createQueryBuilder('orders')
      .relation(Order, 'costumer')
      .of(id)
      .loadOne();

    return getCostumerDetailsById;
  }

  static async findProduct(id: number) {
    const getProductDetailsById = await getRepository(Order)
      .createQueryBuilder('orders')
      .relation(Order, 'product')
      .of(id)
      .loadOne();

    return getProductDetailsById;
  }
}

export { OrderService };
