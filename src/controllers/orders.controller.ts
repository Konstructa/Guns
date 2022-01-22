import { Request, Response } from 'express';

class OrderController {
  static async createOrder(req: Request, res: Response) {
    res.status(200).json('Rota para criar pedidos');
  }

  static async deleteOneOrder(req: Request, res: Response) {
    res.status(200).json('Rota para deletar pedidos');
  }

  static async getOneOrder(req: Request, res: Response) {
    res.status(200).json('Rota para pegar um pedidos');
  }
}

export { OrderController };
