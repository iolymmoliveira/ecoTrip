import { captureException, captureMessage } from './sentry';

export type LoggerContext = Record<string, unknown>;
const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
  error: (message: string, error?: unknown, context: LoggerContext = {}) => {
    if (error instanceof Error) {
      captureException(error, {
        level: 'error',
        extras: { ...context, message },
      });
      if (isDevelopment) console.error(`[logger] ${message}`, error, context);

      return;
    }

    captureMessage(`${message} ${String(error ?? '')}`.trim(), 'error', {
      extras: context,
    });
    if (isDevelopment) console.error(`[logger] ${message}`, error, context);
  },

  warn: (message: string, context: LoggerContext = {}) => {
    captureMessage(message, 'warning', {
      extras: context,
    });
    if (isDevelopment) console.warn(`[logger] ${message}`, context);
  },

  info: (message: string, context: LoggerContext = {}) => {
    captureMessage(message, 'info', {
      extras: context,
    });
    if (isDevelopment) console.info(`[logger] ${message}`, context);
  },

  debug: (message: string, context: LoggerContext = {}) => {
    captureMessage(message, 'debug', {
      extras: context,
    });
    if (isDevelopment) console.debug(`[logger] ${message}`, context);
  },
};
