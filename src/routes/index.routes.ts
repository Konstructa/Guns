import { Router, Response as ExResponse } from 'express';

const router = Router();

router.use('/', (_req, res: ExResponse) => {
  res.status(200).json({
    message: 'Hello World!',
  });
});

export default router;
