import { Router } from 'express';
import { StockController } from '../controllers/stock.controller';

const router = Router();

router.route('/')
  .post(StockController.createProduct);

router.route('/:id')
  .patch(StockController.updateProduct);

export default router;
