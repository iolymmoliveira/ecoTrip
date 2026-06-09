export abstract class AppError extends Error {
  public readonly metadata?: Record<string, unknown>;
  public abstract readonly code: string;

  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message);
    this.metadata = metadata;
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
