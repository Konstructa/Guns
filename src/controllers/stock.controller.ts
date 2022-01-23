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
      await StockService.execute({ name, quantity });

      return res.status(201)
        .json({
          sucess: 'Produto registrado com sucesso!',
        });
    } catch (e) {
      return res.status(500).json('Erro interno');
    }
  }

  static async GetProductDetailsByOrderID(req: Request, res: Response) {
    res.status(200).json('Aqui está os detalhes do seu produto por OrderID');
  }
}

export { StockController };
