import { Router } from 'express';
import { CostumerController } from '../controllers/costumer.controller';

const router = Router();

router.route('/')
  .post(CostumerController.createCostumer);

router.route('/:id')
  .put(CostumerController.updateCostumer)
  .delete(CostumerController.deleteCostumer);

export default router;
