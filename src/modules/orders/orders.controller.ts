import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { OrderService } from './order.service';
import { StockService } from '../stock/stock.service';
import { IOrder } from './order.interface';
import { Customer } from '../customers/Customer';
import { Product } from '../stock/Product';
import { Order } from './Order';

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
      // let newSale = 0;

      if (reciveOrder.products_quantity <= quantityInStock
        || quantityGems <= amount) {
        newQuantity = quantityInStock - reciveOrder.products_quantity;
        // newSale = existCustomer.gems - amount;
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

      return res.status(202).json({ suscess: 'Pedido deletado' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno' });
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
