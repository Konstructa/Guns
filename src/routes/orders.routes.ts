import { Router } from 'express';
import * as controller from '../controllers/orders.controller';

const router = Router();

router.route('/')
  .post(controller.createOrder)
  .delete(controller.deleteOneOrder);

export default router;
