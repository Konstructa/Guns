import { Request, Response } from 'express';

class StockController {
  static async createProduct(req: Request, res: Response) {
    res.status(200).json('Rota para criar produto');
  }

  static async GetProductDetailsByOrderID(req: Request, res: Response) {
    res.status(200).json('Aqui está os detalhes do seu produto por OrderID');
  }
}

export { StockController };
