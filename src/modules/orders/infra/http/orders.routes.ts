import { Router } from 'express';
import { OrderController } from '../../application/orders.controller';
import middleware from '../../../../shared/http/utils/middleware';

const router = Router();

router.route('/')
  .post(middleware, OrderController.createOrder);

router.route('/:id')
  .delete(middleware, OrderController.deleteOneOrder);

router.route('/customerByOrderID/:id')
  .get(middleware, OrderController.getCustomerByOrderID);

router.route('/productDetailsByOrderID/:id')
  .get(middleware, OrderController.getProductDetailsByOrderID);

export default router;
