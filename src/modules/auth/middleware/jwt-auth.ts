import jwt, { JwtPayload } from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';

export default (req:Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Login é necessário' });
  }

  const [, token] = authorization.split(' ');

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET || '') as JwtPayload;
    const { username } = data;
    // req.userUserName = username;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token expirado ou invalido' });
  }
};
