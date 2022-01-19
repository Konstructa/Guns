import { Router } from 'express';
import * as controller from '../controllers/costumer.controller';

const router = Router();

router.route('/')
  .post(controller.createCostumer)
  .delete(controller.deleteCostumer)
  .put(controller.updateCostumer);

export default router;
