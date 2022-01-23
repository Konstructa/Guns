import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { OrderService } from '../services/order.service';
/* import { Order } from '../entities/Order'; */
import { IOrder } from '../interface/order';
import { Costumer } from '../entities/Costumer';
import { Product } from '../entities/Product';

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

      const productIsAvailabe = await getRepository(Product)
        .createQueryBuilder('navy.stock')
        .select('quantity')
        .where('id = :id', { id: reciveOrder.product })
        .getRawOne();

      const quantityInStock = Number(productIsAvailabe.quantity);

      console.log(quantityInStock, reciveOrder.productsQuantity);

      let newQuantity = 0;

      if (reciveOrder.productsQuantity <= quantityInStock) {
        newQuantity = quantityInStock - reciveOrder.productsQuantity;
      } else {
        return res.status(400)
          .json({
            error: 'Quantidade de produtos é superior ao que temos no estoque',
          });
      }

      await OrderService.execute(reciveOrder.productsQuantity, existsProduct, existsCostumer);

      console.log(newQuantity);

      return res.status(201).json({ sucess: 'Deu certo' });
    } catch (error) {
      res.status(400).json(error);
    }

    return res.status(201);
  }

  static async deleteOneOrder(req: Request, res: Response) {
    res.status(200).json('Rota para deletar pedidos');
  }

  static async getOneOrder(req: Request, res: Response) {
    res.status(200).json('Rota para pegar um pedidos');
  }
}

export { OrderController };
