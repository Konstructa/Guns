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

      const conRepository = getRepository(Order);
      const relation = await conRepository.findOne(
        id,
        { relations: ['product'] },
      );

      const productId = Number(relation?.product.id);

      const productIsAvailabe = (relation?.product.quantity);

      const addProductsOffDeletedOrder = Number(productIsAvailabe)
      + Number(existsOrder.productsQuantity);

      await OrderService.delete(id);
      await StockService.update(productId, addProductsOffDeletedOrder);

      res.status(200).json({ suscess: 'Pedido deletado' });
    } catch (error) {
      res.status(500).json({ error: 'Erro interno' });
    }
  }

  static async getOneOrder(req: Request, res: Response) {
    res.status(200).json('Rota para pegar um pedidos');
  }
}

export { OrderController };
