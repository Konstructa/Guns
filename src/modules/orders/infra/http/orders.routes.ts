import { Router } from 'express';
import { OrderController } from '../../application/orders.controller';
import middleware from '../../../../shared/http/utils/middleware';

const router = Router();

router.route('/')
  .post(OrderController.createOrder);

router.route('/:id')
  .delete(OrderController.deleteOneOrder);

router.route('/customerByOrderID/:id')
  .get(middleware, OrderController.getCustomerByOrderID);

router.route('/productDetailsByOrderID/:id')
  .get(OrderController.getProductDetailsByOrderID);

export default router;
