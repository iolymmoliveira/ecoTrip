import { captureException, captureMessage } from './sentry';

export type LoggerContext = Record<string, unknown>;

export const logger = {
  error: (message: string, error?: unknown, context: LoggerContext = {}) => {
    if (error instanceof Error) {
      captureException(error, {
        level: 'error',
        extras: { ...context, message },
      });
      console.error(`[logger] ${message}`, error, context);
      return;
    }

    captureMessage(`${message} ${String(error ?? '')}`.trim(), 'error', {
      extras: { ...context },
    });
    console.error(`[logger] ${message}`, error, context);
  },

  warn: (message: string, context: LoggerContext = {}) => {
    captureMessage(message, 'warning', { extras: context });
    console.warn(`[logger] ${message}`, context);
  },

  info: (message: string, context: LoggerContext = {}) => {
    captureMessage(message, 'info', { extras: context });
    console.info(`[logger] ${message}`, context);
  },

  debug: (message: string, context: LoggerContext = {}) => {
    captureMessage(message, 'debug', { extras: context });
    console.debug(`[logger] ${message}`, context);
  },
};
