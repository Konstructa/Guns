import { Router } from 'express';
import { OrderController } from '../../application/orders.controller';
import verifyToken from '../../../../shared/auth/middleware';

const router = Router();

router.route('/')
  .post(verifyToken, OrderController.createOrder);

router.route('/:id')
  .delete(verifyToken, OrderController.deleteOneOrder);

router.route('/customerByOrderID/:id')
  .get(verifyToken, OrderController.getCustomerByOrderID);

router.route('/productDetailsByOrderID/:id')
  .get(verifyToken, OrderController.getProductDetailsByOrderID);

export default router;
