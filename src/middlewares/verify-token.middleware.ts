import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export function verifyJWTToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers['authorization'] || '';
  if (!token) {
    res.status(401).send('Token is not provided');
  }
  const tokenHash = token.split(' ')[1];
  return verify(tokenHash, req.app.get('jwtPrivateKey'), (err: Error) => {
    if (err) {
      res.status(403).send('Invalid token');
    }
    return next();
  });
}
