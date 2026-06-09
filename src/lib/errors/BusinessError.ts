import { AppError } from './AppError';

export class BusinessError extends AppError {
  public readonly code = 'BUSINESS_ERROR';

  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, metadata);
  }
}
