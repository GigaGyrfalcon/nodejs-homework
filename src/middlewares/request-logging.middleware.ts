import { Request, Response, NextFunction } from 'express';

export function requestLoging(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  console.log({
    path: req.path,
    method: req.method,
    arguments: { ...req.params, ...req.query, ...req.body }
  });
  next();
}
