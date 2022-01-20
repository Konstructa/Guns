import { Request, Response } from 'express';

class ProductController {
  static async createProduct(req: Request, res: Response) {
    res.status(200).json('Rota para criar produto');
  }
}

export { ProductController };
