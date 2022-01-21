import { Request, Response } from 'express';

class StockController {
  static async createProduct(req: Request, res: Response) {
    res.status(200).json('Rota para criar produto');
  }
}

export { StockController };
