import { Router } from 'express';
import { StockController } from './stock.controller';

const router = Router();

router.route('/')
  .post(StockController.createProduct)
  .get(StockController.getAllProducts);

router.route('/:id')
  .patch(StockController.updateProduct);

export default router;
