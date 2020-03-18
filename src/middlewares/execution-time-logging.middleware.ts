import { performance } from 'perf_hooks';
import { Request, Response, NextFunction } from 'express';

export function executionTimeLoging(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const start = performance.now();
  res.on('close', () => {
    const close = performance.now();
    const executionTime = close - start;
    console.log(
      `${req.method} ${req.originalUrl} execution time: ${executionTime}ms`
    );
  });
  next();
}
