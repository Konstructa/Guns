import { Router } from 'express';

import { CustomerController } from '../../application/customer.controller';
import { TokenController } from '../../../auth/login.controller';
import { CustomerService } from '../persistence/customer.service';
import { CustomerRepository } from '../persistence/customer.provide';

const newRepository = new CustomerRepository();
const newAlguma = new CustomerService(newRepository);
const newController = new CustomerController(newAlguma);

const router = Router();

router.route('/')
  .post(newController.createCustomer);

router.route('/:id')
  /* .put(CustomerController.updateCustomer) */
  .delete(newController.deleteCustomer);

router.route('/login')
  .post(TokenController.store);

export default router;
