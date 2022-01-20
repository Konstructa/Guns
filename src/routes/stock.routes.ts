import { Router } from 'express';
import { ProductController } from '../controllers/stock.controller';

const router = Router();

router.route('/')
  .post(ProductController.createProduct);

export default router;
