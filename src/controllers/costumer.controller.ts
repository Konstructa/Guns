import { Request, Response } from 'express';

export async function getAllCostumers(req: Request, res: Response) {
  res.status(200).json('Aqui todos usuarios');
}

export async function getCustomerByOrderID(req: Request, res: Response) {
  res.status(200).json('Aqui está seu usuário especifico');
}

export async function createCostumer(req: Request, res: Response) {
  res.status(200).json('Rota para criar usuário');
}

export async function deleteCostumer(req: Request, res: Response) {
  res.status(200).json('Rota para deletar usuário');
}

export async function updateCostumer(req: Request, res: Response) {
  res.status(200).json('Rota para atualizar usuário');
}
