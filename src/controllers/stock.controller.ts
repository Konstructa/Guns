import { Request, Response } from 'express';

export async function createProduct(req: Request, res: Response) {
  res.status(200).json('Rota para criar produto');
}
