import { AppError } from './AppError';

export class ValidationError extends AppError {
  public readonly code = 'VALIDATION_ERROR';
  public readonly issues?: unknown;

  constructor(
    message: string,
    issues?: unknown,
    metadata?: Record<string, unknown>,
  ) {
    super(message, metadata);
    this.issues = issues;
  }
}
