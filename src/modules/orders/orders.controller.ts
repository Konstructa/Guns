import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { OrderService } from './order.service';
import { StockService } from '../stock/stock.service';
import { IOrder } from './order.interface';
import { Customer } from '../customers/domain/Customer';
import { Product } from '../stock/Product';
import { Order } from './Order';
import { CustomerService } from '../customers/infra/persistence/customer.service';

class OrderController {
  static async createOrder(req: Request, res: Response) {
    try {
      const reciveOrder: IOrder = req.body;

      if (!reciveOrder.products_quantity || reciveOrder.products_quantity <= 0) {
        return res.status(400).json('Quantidade não pode ser 0');
      }

      const existProduct = await getRepository(Product)
        .findOne(reciveOrder.product);

      if (!existProduct) {
        return res.json('Produto não existe');
      }

      const existCustomer = await getRepository(Customer)
        .findOne(reciveOrder.customer);

      if (!existCustomer) {
        return res.json('Error, Usuário não existe');
      }

      const quantityInStock = Number(existProduct?.quantity);

      const quantityGems = existCustomer.gems;

      const amount = existProduct.price * reciveOrder.products_quantity;

      let newQuantity = 0;
      let newSale = 0;

      if (reciveOrder.products_quantity <= quantityInStock
        || quantityGems <= amount) {
        newQuantity = quantityInStock - reciveOrder.products_quantity;
        newSale = existCustomer.gems - amount;
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
        existProduct,
        existCustomer,
      );

      await StockService.update(reciveOrder.product, newQuantity);

      await CustomerService.updateGems(existCustomer.id, newSale);

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
        .findOne(orderID);

      if (!existsOrder) {
        return res.json('Error, pedido não existe');
      }

      const existsCustomer = await getRepository(Customer)
        .createQueryBuilder('navy.stock')
        .relation(Order, 'customer')
        .of(orderID)
        .loadOne();

      const existsProduct = await getRepository(Product)
        .createQueryBuilder('navy.stock')
        .relation(Order, 'product')
        .of(orderID)
        .loadOne();

      const productId = existsProduct.id;

      const productIsAvailabe = (existsProduct.quantity);

      const addProductsOffDeletedOrder = Number(productIsAvailabe)
      + Number(existsOrder.products_quantity);

      const customerId = existsCustomer.id;

      const refundGems = existsCustomer.gems + existsOrder.value;

      await OrderService.delete(orderID);
      await StockService.update(productId, addProductsOffDeletedOrder);
      await CustomerService.updateGems(customerId, refundGems);

      return res.status(202).json({ suscess: 'Pedido deletado' });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async getProductDetailsByOrderID(req: Request, res: Response) {
    try {
      const orderID = req.params.id;

      console.log(orderID);

      const existsOrder = await getRepository(Order)
        .findOne(orderID);

      if (!existsOrder) {
        return res.json('Error, pedido não existe');
      }

      const result = await OrderService.findProduct(orderID);

      return res.status(302).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  static async getCustomerByOrderID(req: Request, res: Response) {
    try {
      const orderID = req.params.id;

      const existsOrder = await getRepository(Order)
        .findOne(orderID);

      if (!existsOrder) {
        return res.json('Error, pedido não existe');
      }

      const result = await OrderService.findCustomer(orderID);

      return res.status(302).json(result);
    } catch (error) {
      return res.status(400).json({ error: 'Insira um ID existente!' });
    }
  }
}

export { OrderController };
