import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

class CostumerController {
  static async createCostumer(req: Request, res: Response) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      return res.status(200).json({ user: req.body.user, senha: hashedPassword });
    } catch (e) {
      return res.status(400).json('Erro');
    }
  }

  static async deleteCostumer(req: Request, res: Response) {
    res.status(200).json('Rota para deletar usuário');
  }

  static async updateCostumer(req: Request, res: Response) {
    res.status(200).json('Rota para atualizar usuário');
  }

  static async getAllCostumers(req: Request, res: Response) {
    res.status(200).json('Aqui está todos seus usuários');
  }

  static async getCustomerByOrderID(req: Request, res: Response) {
    res.status(200).json('Aqui está seu usuário especifico');
  }
}

export { CostumerController };
