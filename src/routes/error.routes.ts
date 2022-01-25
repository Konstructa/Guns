import { Router, Response as ExResponse } from 'express';

const router = Router();

router.use('/', (_req, res: ExResponse) => {
  res.status(404).json({
    message: 'Rota não encontrada',
  });
});

export default router;
