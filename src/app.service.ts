import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getEmoji(): string {
    const emojis = this.getEmojis();
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    return randomEmoji;
  }
  getEmojis(): string[] {
    return [
      '👋',
      '👍',
      '👎',
      '👊',
      '👏',
      '👐',
      '👑',
      '👒',
      '👓',
      '👔',
      '👕',
      '👖',
    ];
  }
}
