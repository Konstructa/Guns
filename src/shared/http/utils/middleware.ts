import jwt, { JwtPayload } from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';

export default (req:Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Login é necessário' });
  }

  const [, token] = authorization.split(' ');

  try {
    jwt.verify(token, process.env.TOKEN_SECRET || '') as JwtPayload;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token expirado ou invalido' });
  }
};
