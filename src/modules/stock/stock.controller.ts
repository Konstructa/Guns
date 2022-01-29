import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Product } from './Product';
import { StockService } from './stock.service';

class StockController {
  static async createProduct(req: Request, res: Response) {
    try {
      const {
        name, description,
        price, quantity,
      } = req.body;

      if (quantity.length === 0
        || name.length === 0
      ) {
        return res.status(400)
          .send({
            error: 'Você não inseriu valores válidos cheque novamente!',
          });
      }
      await StockService.insert({
        name,
        description,
        price,
        quantity,
      });

      return res.status(201)
        .json({
          sucess: 'Produto registrado com sucesso!',
        });
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  static async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateQuantityProduct = Number(req.body.quantity);

      if (updateQuantityProduct < 0) {
        return res.status(400).json('Valor não pode ser negativo');
      }

      const existProduct = await getRepository(Product)
        .findOne(id);

      if (!existProduct) {
        return res.json('Produto não existe');
      }

      await StockService.update(id, updateQuantityProduct);

      return res.status(200).json('Produto atualizado com sucesso');
    } catch (error) {
      return res.status(500).json('Insira um valor valido');
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
