import { Request, Response } from 'express';
import bcryptjs from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CustomerService } from '../../modules/customers/infra/persistence/customer.service';

class TokenController {
  static async store(req: Request, res: Response) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Insira dados válidos' });
    }

    const customer = await CustomerService.find(username);

    if (!customer) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const verifyPassword = await bcryptjs.compare(password, customer.password);

    if (!verifyPassword) {
      return res.status(404).json({ error: 'Senha incorreta' });
    }

    const { id } = customer;

    const token = jwt.sign({ id, username }, process.env.TOKEN_SECRET as string, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json(token);
  }
}

export { TokenController };
