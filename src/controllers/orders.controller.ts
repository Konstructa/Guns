import { Request, Response } from 'express';

export async function createOrder(req: Request, res: Response) {
  res.status(200).json('Rota para criar pedidos');
}

export async function deleteOneOrder(req: Request, res: Response) {
  res.status(200).json('Rota para deletar pedidos');
}

export async function getAllOrders(req: Request, res: Response) {
  res.status(200).json('Rota para pegar todos pedidos');
}

export async function getOneOrder(req: Request, res: Response) {
  res.status(200).json('Rota para pegar um pedidos');
}
