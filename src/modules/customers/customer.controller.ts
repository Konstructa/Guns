import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import { Customer } from './Customer';
import { CustomerService } from './customer.service';

class CustomerController {
  static async createCustomer(req: Request, res: Response) {
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

      const create = await CustomerService.insert({
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

  static async deleteCustomer(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const existCostumer = await getRepository(Customer)
        .findOne(id);

      if (!existCostumer) {
        return res.status(400).json('Error, Usuário não existe');
      }
      await CustomerService.delete(id);

      return res.status(202).json({ suscess: 'Usuário deletado com sucesso!' });
    } catch (error) {
      return res.status(404).json('ID não encontrado');
    }
  }

  static async updateCustomer(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        name, username, email, password, gems,
      } = req.body;
      console.log(name, username, email, password, gems);

      const existCostumer = await getRepository(Customer)
        .findOne(id);

      if (!existCostumer) {
        return res.json('Error, Usuário não existe');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const update = await CustomerService.update(id, {
        name, username, email, hashedPassword, gems,
      });

      if (update.length === 0) {
        return res.status(200).json({ sucess: 'Dados atualizados com sucesso' });
      }

      const result = update.map((e) => e.constraints);

      return res.status(406).json({ error: result });
    } catch (error) {
      return res.status(406).json(error);
    }
  }
}

export { CustomerController };
