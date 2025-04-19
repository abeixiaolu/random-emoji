import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class EmojiValidationPipe implements PipeTransform {
  transform(value: any) {
    console.log('EmojiValidationPipe');
    if (!value) return;
    value = Number(value);
    if (Number.isNaN(value)) {
      throw new BadRequestException(`${value} is not a number`);
    }
    if (value < 0 || value > 11) {
      throw new BadRequestException(`${value} is out of range`);
    }
    return value as number;
  }
}
