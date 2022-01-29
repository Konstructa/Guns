import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { OrderService } from '../services/order.service';
import { StockService } from '../services/stock.service';
import { IOrder } from '../interface/order';
import { Customer } from '../entities/Customer';
import { Product } from '../entities/Product';
import { Order } from '../entities/Order';

class OrderController {
  static async createOrder(req: Request, res: Response) {
    try {
      const reciveOrder: IOrder = req.body;

      if (!reciveOrder.products_quantity || reciveOrder.products_quantity <= 0) {
        return res.status(400).json('Quantidade não pode ser 0');
      }

      const existsProduct = await getRepository(Product)
        .createQueryBuilder('navy.stock')
        .where('id = :id', { id: reciveOrder.product })
        .getOneOrFail();

      const existsCustomer = await getRepository(Customer)
        .createQueryBuilder('navy.customers')
        .where('id = :id', { id: reciveOrder.customer })
        .getOneOrFail();

      const quantityInStock = Number(existsProduct?.quantity);

      const quantityGems = existsCustomer.gems;

      const amount = existsProduct.price * reciveOrder.products_quantity;

      let newQuantity = 0;

      if (reciveOrder.products_quantity <= quantityInStock
        || quantityGems <= amount) {
        newQuantity = quantityInStock - reciveOrder.products_quantity;
      } else {
        return res.status(400).json(
          {
            error: 'Quantidade de produtos é superior ao que temos no estoque, ou vc n',
          },
        );
      }

      await OrderService.insert(
        reciveOrder.products_quantity,
        amount,
        existsProduct,
        existsCustomer,
      );

      await StockService.update(reciveOrder.product, newQuantity);

      return res.status(201).json(
        {
          sucess: 'Pedido registrado com sucesso',
        },
      );
    } catch (error) {
      res.status(400).json(error);
    }

    return res.status(201);
  }

  static async deleteOneOrder(req: Request, res: Response) {
    try {
      const orderID = req.params.id;

      const existsOrder = await getRepository(Order)
        .createQueryBuilder('orders')
        .where('id = :id', { orderID })
        .getOneOrFail();

      const getProductId = await getRepository(Order)
        .createQueryBuilder('orders')
        .leftJoinAndSelect('orders.product', 'product')
        .getMany();

      const productId = getProductId[0].product.id;

      const productIsAvailabe = (getProductId[0].product.quantity);

      const addProductsOffDeletedOrder = Number(productIsAvailabe)
      + Number(existsOrder.products_quantity);

      await OrderService.delete(orderID);
      await StockService.update(productId, addProductsOffDeletedOrder);

      res.status(202).json({ suscess: 'Pedido deletado' });
    } catch (error) {
      res.status(500).json({ error: 'Erro interno' });
    }
  }

  static async getProductDetailsByOrderID(req: Request, res: Response) {
    try {
      const orderID = req.params.id;

      console.log(orderID);

      await getRepository(Order)
        .createQueryBuilder('orders')
        .where('id = :id', { orderID })
        .getOneOrFail();

      const result = await OrderService.findProduct(orderID);

      res.status(302).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async getCustomerByOrderID(req: Request, res: Response) {
    try {
      const orderID = req.params.id;

      await getRepository(Order)
        .createQueryBuilder('orders')
        .where('id = :id', { orderID })
        .getOneOrFail();

      const result = await OrderService.findCustomer(orderID);

      res.status(302).json(result);
    } catch (error) {
      res.status(400).json({ error: 'Insira um ID existente!' });
    }
  }
}

export { OrderController };
