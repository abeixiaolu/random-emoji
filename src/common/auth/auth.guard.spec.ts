import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { createMock } from '@golevelup/ts-jest';

describe('AuthGuard', () => {
  const authGuard = new AuthGuard();

  function createMockContext(apiKey?: string) {
    const context = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          header: () => apiKey ?? 'SECRET',
          headers: {
            'x-api-key': apiKey ?? 'SECRET',
          },
        }),
      }),
    });
    return context;
  }

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  it('should return true if the api key is correct', () => {
    const result = authGuard.canActivate(createMockContext());
    expect(result).toBe(true);
  });

  it('should return false if the api key is incorrect', () => {
    const result = authGuard.canActivate(createMockContext('WRONG'));
    expect(result).toBe(false);
  });
});
