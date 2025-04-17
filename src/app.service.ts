import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getEmoji(index?: number): string {
    const emojis = this.getEmojis();
    const idx = index || Math.floor(Math.random() * emojis.length);
    const randomEmoji = emojis[idx];
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
