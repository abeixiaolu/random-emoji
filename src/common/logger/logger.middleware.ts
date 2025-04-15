import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log(
      `Request from ${req.ip} to url: '${req.url}', method: '${req.method}'`,
    );
    next();
  }
}
