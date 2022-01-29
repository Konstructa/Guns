import { Router } from 'express';
import CostumerRoutes from '../../../modules/customers/costumer.routes';
import OrderRoutes from '../../../modules/orders/orders.routes';
import StockRoutes from '../../../modules/stock/stock.routes';
import ErrorRoutes from './error.routes';

const router = Router();

router.use('/costumer', CostumerRoutes);
router.use('/order', OrderRoutes);
router.use('/stock', StockRoutes);
router.use(ErrorRoutes);

export default router;
