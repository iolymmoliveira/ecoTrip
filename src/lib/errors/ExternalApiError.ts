import { AppError } from './AppError';

export class ExternalApiError extends AppError {
  public readonly code = 'EXTERNAL_API_ERROR';
  public readonly service: string;
  public readonly statusCode?: number;

  constructor(
    message: string,
    service: string,
    statusCode?: number,
    metadata?: Record<string, unknown>,
  ) {
    super(message, metadata);
    this.service = service;
    this.statusCode = statusCode;
  }
}
