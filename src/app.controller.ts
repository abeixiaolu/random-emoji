import { Controller, Get, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { EmojiValidationPipe } from './common/emoji-validation/emoji-validation.pipe';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(
    @Req() req: Request,
    @Query('index', EmojiValidationPipe) index?: number,
  ) {
    console.log('AppController');
    return {
      emoji: this.appService.getEmoji(index),
      browser: req.browser,
    };
  }
}
