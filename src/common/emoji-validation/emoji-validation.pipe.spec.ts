import { BadRequestException } from '@nestjs/common';
import { EmojiValidationPipe } from './emoji-validation.pipe';

describe('EmojiValidationPipe', () => {
  const pipe = new EmojiValidationPipe();
  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it('should return undefined if no value is provided', () => {
    expect(pipe.transform(undefined)).toBeUndefined();
  });

  it('should throw a BadRequestException if the value is not a number', () => {
    expect(() => pipe.transform('hello')).toThrow(BadRequestException);
  });

  it('should throw a BadRequestException if the value is out of range', () => {
    expect(() => pipe.transform('133')).toThrow(BadRequestException);
  });

  it('should return a number if the value is a number', () => {
    expect(pipe.transform('1')).toBe(1);
  });
});
