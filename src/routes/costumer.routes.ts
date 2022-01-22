import { Router } from 'express';
import { CostumerController } from '../controllers/costumer.controller';

const router = Router();

router.route('/')
  .post(CostumerController.createCostumer)
  .delete(CostumerController.deleteCostumer)
  .put(CostumerController.updateCostumer);

export default router;
