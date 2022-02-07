import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import { ValidationError } from 'class-validator';
import { Customer } from '../domain/Customer';
import { CustomerService } from '../infra/persistence/customer.service';
import { ICustomerService } from '../infra/persistence/protocol/ICustomerService';

export class CustomerController {
  constructor(private readonly customerService: ICustomerService) {}

  async createCustomer(req: Request, res: Response) {
    try {
      const {
        name, username, email, apassword, gems,
      } = req.body;

      if (!name || !username || !email || !apassword || !gems) {
        return res.status(400)
          .send({
            error: 'Você não inseriu valores válidos cheque novamente!',
          });
      }

      const password = await bcrypt.hash(apassword, 10);

      const create = await this.customerService.insert({
        name, username, email, password, gems,
      });

      
        return res.status(201)
          .json({
            sucess: 'Dados registrados com sucesso!',
          });
      

      // const result = create.map((e) => e.constraints);

      //return res.status(406).json({ error: 'dsds' });
    } catch (e) {
      return res.status(406).json('E-mail ou Usuário já existe!');
    }
  }

  async deleteCustomer(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const existCostumer: Customer | undefined = await getRepository(Customer)
        .findOne(id);

      console.log(id);
      if (!existCostumer) {
        return res.status(400).json('Error, Usuário não existe');
      }
      await this.customerService.delete(id);

      return res.status(202).json({ suscess: 'Usuário deletado com sucesso!' });
    } catch (error) {
      return res.status(404).json(error);
    }
  }

  async updateCustomer(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        name, username, email, apassword, gems,
      } = req.body;

      const existCostumer: Customer | undefined = await getRepository(Customer)
        .findOne(id);

      if (!existCostumer) {
        return res.json('Error, Usuário não existe');
      }

      const password = await bcrypt.hash(apassword, 10);

      const update = await this.customerService.update(id, {
        name, username, email, password, gems,
      });

      /* if (1 === 1) {
        return res.status(200).json({ sucess: 'Dados atualizados com sucesso' });
      }
 */
      // const result = update.map((e) => e.constraints);

      return res.status(406).json({ error: 'ferr' });
    } catch (error) {
      return res.status(406).json(error);
    }
  }
}

/* const newcal = new CustomerService();

export default new CustomerController(newcal); */
