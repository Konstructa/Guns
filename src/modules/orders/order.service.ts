import { getRepository } from 'typeorm';
import { Customer } from '../customers/Customer';
import { Order } from './Order';
import { Product } from '../stock/Product';

class OrderService {
  static async insert(
    productsQuantity: number,
    value: number,
    existsProduct: Product,
    existsCustomer: Customer,
  ) {
    const createOrder = getRepository(Order).create({
      products_quantity: productsQuantity,
      value,
      product: existsProduct,
      customer: existsCustomer,
    });

    await getRepository(Order)
      .createQueryBuilder()
      .insert()
      .into(Order)
      .values(createOrder)
      .execute();
  }

  static async delete(id: string) {
    await getRepository(Order)
      .createQueryBuilder()
      .delete()
      .from(Order)
      .where('id = :id', { id })
      .execute();
  }

  static async findCustomer(id: string) {
    const getCostumerDetailsById = await getRepository(Order)
      .createQueryBuilder('orders')
      .relation(Order, 'customer')
      .of(id)
      .loadOne();

    return getCostumerDetailsById;
  }

  static async findProduct(id: string) {
    const getProductDetailsById = await getRepository(Order)
      .createQueryBuilder('orders')
      .relation(Order, 'product')
      .of(id)
      .loadMany();

    return getProductDetailsById;
  }
}

export { OrderService };
