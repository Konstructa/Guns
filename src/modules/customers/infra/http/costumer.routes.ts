import { Router } from 'express';
import { CustomerController } from '../../application/customer.controller';
import { TokenController } from '../../application/token.controller';

const router = Router();

router.route('/')
  .post(CustomerController.createCustomer);

router.route('/token')
  .post(TokenController.store);

router.route('/:id')
  .put(CustomerController.updateCustomer)
  .delete(CustomerController.deleteCustomer);

export default router;
