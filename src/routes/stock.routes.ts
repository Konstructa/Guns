import { Router } from 'express';
import { StockController } from '../controllers/stock.controller';

const router = Router();

router.route('/')
  .post(StockController.createProduct);

export default router;
