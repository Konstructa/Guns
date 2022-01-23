import { Router } from 'express';
import { OrderController } from '../controllers/orders.controller';

const router = Router();

router.route('/')
  .post(OrderController.createOrder);

router.route('/:id')
  .delete(OrderController.deleteOneOrder);

export default router;
