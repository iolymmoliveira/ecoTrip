import { AppError } from './AppError';

export class InfrastructureError extends AppError {
  public readonly code = 'INFRASTRUCTURE_ERROR';
  public readonly operation?: string;

  constructor(
    message: string,
    operation?: string,
    metadata?: Record<string, unknown>,
  ) {
    super(message, metadata);
    this.operation = operation;
  }
}
