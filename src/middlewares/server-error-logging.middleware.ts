import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export function serverErrorLoging(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error(err.stack || '');
  res.status(500).send('Something broke!');
}
