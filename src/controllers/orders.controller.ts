import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { OrderService } from '../services/order.service';
import { StockService } from '../services/stock.service';
import { IOrder } from '../interface/order';
import { Costumer } from '../entities/Costumer';
import { Product } from '../entities/Product';
import { Order } from '../entities/Order';

class OrderController {
  static async createOrder(req: Request, res: Response) {
    try {
      const reciveOrder: IOrder = req.body;

      if (!reciveOrder.productsQuantity || reciveOrder.productsQuantity <= 0) {
        return res.status(400).json('Quantidade não pode ser 0');
      }

      const existsProduct = await getRepository(Product)
        .createQueryBuilder('navy.stock')
        .where('id = :id', { id: reciveOrder.product })
        .getOne();

      const existsCostumer = await getRepository(Costumer)
        .createQueryBuilder('navy.costumers')
        .where('id = :id', { id: reciveOrder.costumer })
        .getOne();

      const quantityInStock = Number(existsProduct?.quantity);

      let newQuantity = 0;

      if (reciveOrder.productsQuantity <= quantityInStock) {
        newQuantity = quantityInStock - reciveOrder.productsQuantity;
      } else {
        return res.status(400).json(
          {
            error: 'Quantidade de produtos é superior ao que temos no estoque',
          },
        );
      }

      await OrderService.insert(reciveOrder.productsQuantity, existsProduct, existsCostumer);

      await StockService.update(reciveOrder.product, newQuantity);

      return res.status(201).json(
        {
          sucess: 'Pedido registrado com sucesso',
        },
      );
    } catch (error) {
      res.status(500).json('Problemas de resposta no servidor');
    }

    return res.status(201);
  }

  static async deleteOneOrder(req: Request, res: Response) {
    try {
      const orderID = req.params.id;

      const id = Number.parseInt(orderID, 10);

      const existsOrder = await getRepository(Order)
        .createQueryBuilder('orders')
        .where('id = :id', { id })
        .getOneOrFail();

      const getProductId = await getRepository(Order)
        .createQueryBuilder('orders')
        .leftJoinAndSelect('orders.product', 'product')
        .getMany();

      const productId = getProductId[0].product.id;

      const productIsAvailabe = (getProductId[0].product.quantity);

      const addProductsOffDeletedOrder = Number(productIsAvailabe)
      + Number(existsOrder.productsQuantity);

      await OrderService.delete(id);
      await StockService.update(productId, addProductsOffDeletedOrder);

      res.status(200).json({ suscess: 'Pedido deletado' });
    } catch (error) {
      res.status(500).json({ error: 'Erro interno' });
    }
  }

  static async getProductDetailsByOrderID(req: Request, res: Response) {
    try {
      const orderID = req.params.id;

      const id = Number.parseInt(orderID, 10);

      await getRepository(Order)
        .createQueryBuilder('orders')
        .where('id = :id', { id })
        .getOneOrFail();

      const getProductDetailsById = await getRepository(Order)
        .createQueryBuilder('orders')
        .leftJoinAndSelect('orders.product', 'product')
        .getMany();

      res.status(200).json(getProductDetailsById[0]);
    } catch (error) {
      res.status(400).json({ error: 'Insira um ID válido!' });
    }
  }

  static async getCustomerByOrderID(req: Request, res: Response) {
    try {
      const orderID = req.params.id;

      const id = Number.parseInt(orderID, 10);

      await getRepository(Order)
        .createQueryBuilder('orders')
        .where('id = :id', { id })
        .getOneOrFail();

      const getCostumerDetailsById = await getRepository(Order)
        .createQueryBuilder('orders')
        .leftJoinAndSelect('orders.costumer', 'costumer')
        .getMany();

      res.status(200).json(getCostumerDetailsById[0]);
    } catch (error) {
      res.status(400).json({ error: 'Insira um ID válido!' });
    }
  }
}

export { OrderController };
