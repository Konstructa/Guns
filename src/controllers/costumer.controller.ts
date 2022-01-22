import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { CostumerService } from '../services/costumer.service';

class CostumerController {
  static async createCostumer(req: Request, res: Response) {
    try {
      const { user, password } = req.body;

      if (password.length === 0
        || user.length === 0
      ) {
        return res.status(400)
          .send({
            error: 'Você não inseriu valores válidos cheque novamente!',
          });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await CostumerService.execute({ user, hashedPassword });

      return res.status(200)
        .json({
          sucess: 'Dados registrados com sucesso!',
        });
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  static async deleteCostumer(req: Request, res: Response) {
    res.status(200).json('Rota para deletar usuário');
  }

  static async updateCostumer(req: Request, res: Response) {
    res.status(200).json('Rota para atualizar usuário');
  }

  static async getCustomerByOrderID(req: Request, res: Response) {
    res.status(200).json('Aqui está seu usuário especifico');
  }
}

export { CostumerController };
