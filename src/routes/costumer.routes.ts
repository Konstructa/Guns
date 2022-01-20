import { Router } from 'express';
import { CostumerController } from '../controllers/costumer.controller';

const router = Router();

router.route('/')
  .get(CostumerController.getAllCostumers)
  .post(CostumerController.createCostumer)
  .delete(CostumerController.deleteCostumer)
  .put(CostumerController.updateCostumer);

export default router;
