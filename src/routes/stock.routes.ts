import { Router } from 'express';
import * as controller from '../controllers/stock.controller';

const router = Router();

router.route('/')
  .post(controller.createProduct);

export default router;
