import { Request, Response, NextFunction } from 'express';

export default (req:Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
};
