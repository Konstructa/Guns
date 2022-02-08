import { Router } from 'express';
import { CustomerController } from '../../application/customer.controller';
import { TokenController } from '../../../auth/login.controller';

const router = Router();

router.route('/')
  .post(CustomerController.createCustomer);

router.route('/:id')
  .put(CustomerController.updateCustomer)
  .delete(CustomerController.deleteCustomer);

router.route('/login')
  .post(TokenController.store);

export default router;
