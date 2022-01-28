import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';

import { Costumer } from '../entities/Costumer';
import { CostumerService } from '../services/costumer.service';

class CostumerController {
  static async createCostumer(req: Request, res: Response) {
    try {
      const {
        name, username, email, password, gems,
      } = req.body;

      if (!name || !username || !email || !password || !gems) {
        return res.status(400)
          .send({
            error: 'Você não inseriu valores válidos cheque novamente!',
          });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const create = await CostumerService.insert({
        name, username, email, hashedPassword, gems,
      });

      if (create.length === 0) {
        return res.status(201)
          .json({
            sucess: 'Dados registrados com sucesso!',
          });
      }

      const result = create.map((e) => e.constraints);

      return res.status(406).json({ error: result });
    } catch (e) {
      return res.status(406).json('E-mail ou Usuário já existe!');
    }
  }

  static async deleteCostumer(req: Request, res: Response) {
    try {
      const { id } = req.params;

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
      const { id } = req.params;
      const {
        name, username, email, password, gems,
      } = req.body;
      console.log(name, username, email, password, gems);

      const nedd = await getRepository(Costumer)
        .createQueryBuilder('navy.costumers')
        .where('id = :id', { id })
        .getOneOrFail();
      console.log(nedd);

      const hashedPassword = await bcrypt.hash(password, 10);

      await CostumerService.update(id, {
        name, username, email, hashedPassword, gems,
      });

      return res.status(200).json({ sucess: 'Dados atualizados com sucesso' });
    } catch (error) {
      return res.status(406).json(error);
    }
  }
}

export { CostumerController };
