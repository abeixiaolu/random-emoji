import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  info(message: string, context?: string) {
    console.log(`[INFO] ${message}`, context);
  }
}
