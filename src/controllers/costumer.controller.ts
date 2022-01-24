import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import { Costumer } from '../entities/Costumer';
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

      await CostumerService.insert({ user, hashedPassword });

      return res.status(201)
        .json({
          sucess: 'Dados registrados com sucesso!',
        });
    } catch (e) {
      return res.status(500).json('Erro interno');
    }
  }

  static async deleteCostumer(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      await getRepository(Costumer)
        .createQueryBuilder('navy.costumers')
        .where('id = :id', { id })
        .getOneOrFail();

      await CostumerService.delete(id);

      res.status(202).json({ suscess: 'Usuário deletado com sucesso!' });
    } catch (error) {
      res.status(404).json('ID não encontrado');
    }
  }

  static async updateCostumer(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id, 10);
      const { user, password } = req.body;

      await getRepository(Costumer)
        .createQueryBuilder('navy.costumers')
        .where('id = :id', { id })
        .getOneOrFail();

      if (user.length === 0
        || password.length === 0
      ) {
        return res.status(400).json({ error: 'Insira os dados necessários!' });
      }

      const newPassword = await bcrypt.hash(password, 10);

      await CostumerService.update(id, user, newPassword);

      return res.status(200).json({ sucess: 'Dados atualizados com sucesso' });
    } catch (error) {
      return res.status(406).json('Verifique seus dados');
    }
  }
}

export { CostumerController };
