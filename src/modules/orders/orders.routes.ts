import { Router } from 'express';
import { OrderController } from './orders.controller';

const router = Router();

router.route('/')
  .post(OrderController.createOrder);

router.route('/:id')
  .delete(OrderController.deleteOneOrder);

router.route('/customerByOrderID/:id')
  .get(OrderController.getCustomerByOrderID);

router.route('/productDetailsByOrderID/:id')
  .get(OrderController.getProductDetailsByOrderID);

export default router;
