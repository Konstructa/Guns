import { Request, Response } from 'express';
import { StockService } from '../services/stock.service';

class StockController {
  static async createProduct(req: Request, res: Response) {
    try {
      const { name, quantity } = req.body;

      if (quantity.length === 0
        || name.length === 0
      ) {
        return res.status(400)
          .send({
            error: 'Você não inseriu valores válidos cheque novamente!',
          });
      }
      await StockService.insert({ name, quantity });

      return res.status(201)
        .json({
          sucess: 'Produto registrado com sucesso!',
        });
    } catch (e) {
      return res.status(500).json('Erro interno');
    }
  }

  static async updateProduct(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { updateQuantityProduct } = req.body;

      if (updateQuantityProduct.quantity < 0) {
        return res.status(400).json('Valor não pode ser negativo');
      }

      await StockService.update(id, updateQuantityProduct.quantity);

      return res.status(200).json('Produto atualizado com sucesso');
    } catch (error) {
      return res.status(500).json({ error: 'Problemas com o servidor' });
    }
  }

  static async getAllProducts(req: Request, res: Response) {
    try {
      const AllProducts = await StockService.getAll();
      res.status(302).json(AllProducts);
    } catch (error) {
      res.status(500).json({ error: 'Servidor não está funcionando' });
    }
  }
}

export { StockController };
